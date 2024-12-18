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
   providers: [
      PatreonProvider({
         clientId: process.env.PATREON_CLIENT_ID,
         clientSecret: process.env.PATREON_CLIENT_SECRET,
         authorization: {
            params: {
               scope: "identity identity[email] identity.memberships",
            },
         },
         allowDangerousEmailAccountLinking: true,
      }),
   ],
   callbacks: {
      async jwt({ token, profile }) {
         const pledge = profile?.included?.find((item) => {
            return (
               item.type === "pledge" &&
               item.relationships.creator.data.id === process.env.CREATOR_ID
            );
         });

         let isProducer = false;
         if (pledge) {
            isProducer =
               pledge.relationships.reward.data.id ===
               process.env.PRODUCER_TIER_ID;
         }

         if (profile) {
            token.id = profile.data.id;
            token.firstName = profile.data.attributes.first_name;
            token.isProducer = isProducer;
         }
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
      async signIn({ user, account, profile }) {
         const { id } = profile.data;
         if (id === process.env.CREATOR_ID) {
            return true;
         }

         const response = await fetch(process.env.PATREON_PROFILE_URL, {
            headers: {
               Authorization: `Bearer ${account.access_token}`,
            },
         });
         const userResponse = await response.json();
         const pledge = userResponse?.included?.find((item) => {
            return (
               item.type === "pledge" &&
               item.relationships.creator.data.id === process.env.CREATOR_ID
            );
         });
         if (id === process.env.ALLOW_PATRON_IDS) {
            user.pledge = pledge;
            return true;
         }

         let isProducer = false;
         if (pledge) {
            isProducer =
               pledge.relationships.reward.data.id ===
               process.env.PRODUCER_TIER_ID;

            user.reward = pledge.relationships.reward.data.id;
            user.isProducer = isProducer;
         }

         let isUserPledged = false;
         if (pledge) {
            const {
               attributes: { status },
            } = pledge;
            isUserPledged = status === "valid";
            user.pledge = pledge;
            user.isUserPledged = isUserPledged;
         }

         if (isUserPledged) {
            return true;
         } else {
            return "/unauthorized";
         }
      },
      async redirect({ baseUrl }) {
         return baseUrl;
      },
   },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
