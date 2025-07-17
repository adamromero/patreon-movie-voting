import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import PatreonProvider from "next-auth/providers/patreon";
import clientPromise from "@/lib/mongodb";

export const nextAuthOptions = {
   adapter: MongoDBAdapter(clientPromise),
   secret: process.env.NEXTAUTH_SECRET,
   jwt: {
      secret: process.env.JWT_SECRET,
   },
   session: {
      strategy: "jwt",
   },
   pages: {
      signIn: "/",
   },
   providers: [
      PatreonProvider({
         clientId: process.env.PATREON_CLIENT_ID,
         clientSecret: process.env.PATREON_CLIENT_SECRET,
         authorization: {
            params: {
               scope: "identity identity[email]",
            },
         },
         allowDangerousEmailAccountLinking: true,
      }),
   ],
   callbacks: {
      async signIn({ account, user, profile }) {
         const id = profile?.data?.id;
         if (id === process.env.CREATOR_ID) {
            return true;
         }

         const response = await fetch(process.env.PATREON_PROFILE_URL, {
            headers: {
               Authorization: `Bearer ${account.access_token}`,
            },
         });

         const userResponse = await response.json();
         const pledge = userResponse?.included?.find(
            (item) =>
               item.type === "member" &&
               item.attributes.patron_status === "active_patron" &&
               item.relationships.campaign?.data?.id === process.env.CAMPAIGN_ID
         );

         if (!pledge) {
            return "/unauthorized";
         }

         const tier =
            pledge.relationships?.currently_entitled_tiers?.data?.find(
               (item) => item.type === "tier"
            )?.id;

         user.patreonId = id;
         user.tier = tier;
         account.isProducer = tier === process.env.PRODUCER_TIER_ID;

         return true;
      },

      async redirect({ baseUrl }) {
         return baseUrl;
      },
      async jwt({ token, profile, account }) {
         if (!profile) return token;

         token.id = profile.data.id;
         token.firstName = profile.data.attributes.first_name;
         token.isProducer = account.isProducer;

         return token;
      },
      async session({ token, session }) {
         if (token) {
            session.user.id = token.id;
            session.user.firstName = token.firstName;
            session.user.isCreator = token.id === process.env.CREATOR_ID; //|| token.id === process.env.DEV_ID;
            session.user.isProducer =
               token.isProducer || token.id === process.env.DEV_ID;
         }

         return session;
      },
   },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
