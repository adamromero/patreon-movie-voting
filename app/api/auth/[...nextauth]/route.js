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
               scope: "identity",
            },
         },
         allowDangerousEmailAccountLinking: true,
      }),
   ],
   callbacks: {
      async signIn({ account, profile }) {
         const { id } = profile.data;

         if (id === process.env.CREATOR_ID) {
            return true;
         }

         try {
            const response = await fetch(process.env.PATREON_PROFILE_URL, {
               headers: {
                  Authorization: `Bearer ${account.access_token}`,
               },
            });

            if (!response.ok) {
               console.error(
                  `Failed to fetch Patreon profile: ${response.statusText}`
               );
               return "/unauthorized";
            }

            const userResponse = await response.json();
            const pledge = userResponse?.included?.filter(
               (item) =>
                  item.type === "member" &&
                  item.attributes.patron_status === "active_patron" &&
                  item.relationships.campaign.data.id ===
                     process.env.CAMPAIGN_ID
            );

            if (!pledge || pledge.length === 0) {
               return "/unauthorized";
            }

            return true;
         } catch (error) {
            console.error(`Error during sign-in: ${error.message}`);
            return "/unauthorized";
         }
      },
      async redirect({ baseUrl }) {
         return baseUrl;
      },
      async jwt({ token, user, profile }) {
         if (!user || !profile) return token;

         const { isUserPledged, pledge } = user;

         const isProducer =
            isUserPledged &&
            pledge?.relationships?.reward?.data?.id ===
               process.env.PRODUCER_TIER_ID;

         token.id = profile.data.id;
         token.firstName = profile.data.attributes.first_name;
         token.isProducer = isProducer;

         return token;
      },
      async session({ token, session }) {
         if (token) {
            session.user.id = token.id;
            session.user.firstName = token.firstName;
            session.user.isCreator = token.id === process.env.CREATOR_ID;
            session.user.isProducer =
               token.isProducer || token.id === process.env.DEV_ID;
         }

         return session;
      },
   },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
