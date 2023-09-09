import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import PatreonProvider from "next-auth/providers/patreon";
import clientPromise from "@/lib/mongodb";

export const nextAuthOptions = {
   adapter: MongoDBAdapter(clientPromise),
   jwt: {
      secret: process.env.JWT_SECRET,
   },
   secret: process.env.NEXTAUTH_SECRET,
   session: {
      strategy: "jwt",
   },
   providers: [
      PatreonProvider({
         clientId: process.env.PATREON_CLIENT_ID,
         clientSecret: process.env.PATREON_CLIENT_SECRET,
         authorization: {
            params: {
               scope: "identity identity[email]	identity.memberships",
            },
         },
      }),
   ],
   pages: {
      signIn: "/unauthorized",
   },
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
            isProducer = pledge.attributes.amount_cents === 1900;
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
            session.user.isCreator =
               token.id === process.env.CREATOR_ID ||
               token.id === process.env.DEV_ID;
            session.user.isProducer = token.isProducer;
         }
         return session;
      },
      async signIn({ account, profile }) {
         const { id } = profile.data;
         if (id === process.env.CREATOR_ID || id === process.env.DEV_ID) {
            return true;
         }

         return "/maintenance";

         // const response = await fetch(process.env.PATREON_PROFILE_URL, {
         //    headers: {
         //       Authorization: `Bearer ${account.access_token}`,
         //    },
         // });
         // const user = await response.json();

         // const pledge = user?.included?.find((item) => {
         //    return (
         //       item.type === "pledge" &&
         //       item.relationships.creator.data.id === process.env.CREATOR_ID
         //    );
         // });

         // let isUserPledged = false;
         // if (pledge) {
         //    const {
         //       attributes: { status },
         //    } = pledge;
         //    isUserPledged = status === "valid";
         // }

         // if (isUserPledged) {
         //    return true;
         // } else {
         //    return "/unauthorized";
         // }
      },
      async redirect({ baseUrl }) {
         return baseUrl;
      },
   },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
