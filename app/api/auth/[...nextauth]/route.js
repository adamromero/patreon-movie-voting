import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import PatreonProvider from "next-auth/providers/patreon";
import clientPromise from "@/lib/mongodb";
//import User from "@/models/userModel";
import axios from "axios";

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
      async jwt({ token, account }) {
         if (account) {
            token.accessToken = account.access_token;
         }
         return token;
      },
      async session({ token, session }) {
         const response = await axios.get(process.env.PATREON_PROFILE_URL, {
            headers: {
               Authorization: `Bearer ${token.accessToken}`,
            },
         });

         const user = response.data;
         const { id } = user.data;
         const { first_name } = user.data.attributes;
         const isCreator = id === process.env.CREATOR_ID;

         if (user) {
            session.user.id = id;
            session.user.firstName = first_name;
            session.user.isCreator = isCreator;
         }

         return session;
      },
      async signIn({ account, profile }) {
         const response = await axios.get(
            process.env.PATREON_PROFILE_URL_FIELDS,
            {
               headers: {
                  Authorization: `Bearer ${account.access_token}`,
               },
            }
         );

         let isPledged = false;
         const pledge = response?.included?.find(
            (item) =>
               item.type === "pledge" &&
               item.relationships.creator.data.id === process.env.CREATOR_ID
         );

         if (pledge) {
            const {
               attributes: { status },
            } = pledge;
            isPledged = status === "valid";
         }

         const { id } = profile.data;
         const isCreator = id === process.env.CREATOR_ID;
         const isDev = id === process.env.DEV_ID;
         const isAllowedToSignIn = isPledged || isCreator || isDev;

         if (isAllowedToSignIn) {
            return true;
         } else {
            return "/unauthorized";
         }
      },
      async redirect({ url, baseUrl }) {
         return baseUrl;
      },
   },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
