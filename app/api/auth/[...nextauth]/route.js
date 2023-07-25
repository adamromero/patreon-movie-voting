import NextAuth from "next-auth/next";
import PatreonProvider from "next-auth/providers/patreon";
import axios from "axios";

export const nextAuthOptions = {
   providers: [
      PatreonProvider({
         clientId: process.env.PATREON_CLIENT_ID,
         clientSecret: process.env.PATREON_CLIENT_SECRET,
         authorization: {
            params: {
               scope: "identity identity.memberships",
            },
         },
      }),
   ],
   secret: process.env.NEXTAUTH_SECRET,
   callbacks: {
      async jwt({ token, account, profile }) {
         if (account) {
            token.accessToken = account.access_token;
            token.id = profile.id;
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
         const { full_name, image_url } = user.data.attributes;
         const creator_id = user.included[0].relationships.creator.data.id;
         const findPledge = user.data.relationships.pledges.data.find(
            (pledge) => pledge.id === "129412053"
         );
         const isPledged = JSON.stringify(findPledge) !== "{}";

         if (token) {
            session.user.id = id;
            session.user.name = full_name;
            session.user.image = image_url;
            session.user.creatorId = creator_id;
            session.user.isPledged = isPledged;
         }

         return session;
      },
      async redirect({ url, baseUrl }) {
         return baseUrl;
      },
   },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
