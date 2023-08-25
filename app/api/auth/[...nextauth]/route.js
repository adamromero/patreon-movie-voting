import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import PatreonProvider from "next-auth/providers/patreon";
import clientPromise from "@/lib/mongodb";
//import User from "@/models/userModel";

export const nextAuthOptions = {
   providers: [
      PatreonProvider({
         clientId: process.env.PATREON_CLIENT_ID,
         clientSecret: process.env.PATREON_CLIENT_SECRET,
         authorization: {
            params: {
               scope: "identity identity[email] identity.memberships",
            },
         },
      }),
   ],
   adapter: MongoDBAdapter(clientPromise),
   session: {
      strategy: "jwt",
   },
   jwt: {
      secret: process.env.JWT_SECRET,
   },
   secret: process.env.NEXTAUTH_SECRET,
   pages: {
      signIn: "/unauthorized",
   },
   callbacks: {
      async jwt({ token, profile }) {
         if (profile) {
            token.id = profile.data.id;
            token.firstName = profile.data.attributes.first_name;
         }
         return token;
      },
      async session({ token, session }) {
         if (token) {
            session.user.id = token.id;
            session.user.firstName = token.firstName;
            session.user.isCreator = token.id === process.env.CREATOR_ID;
         }
         return session;
      },
      async signIn({ account, profile }) {
         // const { id } = profile.data;
         // if (id === process.env.CREATOR_ID) {
         //    return true;
         // }

         const response = await fetch(process.env.PATREON_PROFILE_URL, {
            headers: {
               Authorization: `Bearer ${account.access_token}`,
            },
         });
         const user = await response.json();

         console.log(user);

         const pledge = user?.included?.find(
            (item) =>
               item.type === "pledge" &&
               item.relationships.creator.data.id === process.env.CREATOR_ID
         );

         let isUserPledged = false;
         if (pledge) {
            const {
               attributes: { status },
            } = pledge;
            isUserPledged = status === "valid";
         }

         const { id } = profile.data;
         const isCreator = id === process.env.CREATOR_ID;

         if (isUserPledged || isCreator) {
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
