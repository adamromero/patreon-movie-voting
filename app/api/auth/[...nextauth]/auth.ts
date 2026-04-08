import { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import PatreonProvider from "next-auth/providers/patreon";
import clientPromise from "@/lib/mongodb";

declare module "next-auth" {
   interface Session {
      user: {
         id?: string;
         name: string;
         isCreator: boolean;
         isProducer: boolean;
         accessEndsAt?: Date;
         pledgeCanceledAt?: Date;
      };
   }

   interface User {
      patreonId?: string;
      tier?: string;
      isGifted?: boolean;
      accessEndsAt?: Date;
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      id: string;
      firstName: string;
      isProducer: boolean;
   }
}

export const authOptions: AuthOptions = {
   adapter: MongoDBAdapter(clientPromise),
   secret: process.env.NEXTAUTH_SECRET,
   session: {
      strategy: "database",
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 12 * 60 * 60,
   },
   pages: {
      signIn: "/",
   },
   providers: [
      PatreonProvider({
         clientId: process.env.PATREON_CLIENT_ID!,
         clientSecret: process.env.PATREON_CLIENT_SECRET!,
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
         const id = (profile as any)?.data?.id;
         if (id === process.env.CREATOR_ID) {
            return true;
         }

         const response = await fetch(process.env.PATREON_PROFILE_URL!, {
            headers: {
               Authorization: `Bearer ${account?.access_token}`,
            },
         });

         const userResponse = await response.json();
         const pledge = userResponse?.included?.find(
            (item: any) =>
               item.type === "member" &&
               item.attributes.patron_status === "active_patron" &&
               item.relationships.campaign?.data?.id ===
                  process.env.CAMPAIGN_ID,
         );

         if (!pledge) {
            return "/unauthorized";
         }

         const tier =
            pledge.relationships?.currently_entitled_tiers?.data?.find(
               (item: any) => item.type === "tier",
            )?.id;

         user.patreonId = id;
         user.tier = tier;
         (account as any).isProducer = tier === process.env.PRODUCER_TIER_ID;

         return true;
      },

      async redirect({ baseUrl }) {
         return baseUrl;
      },

      async session({ session, user }) {
         session.user.id = user.patreonId;
         session.user.accessEndsAt = user.accessEndsAt;
         session.user.isCreator = user.patreonId === process.env.CREATOR_ID;
         session.user.isProducer =
            user.patreonId === process.env.PRODUCER_TIER_ID ||
            user.patreonId === process.env.DEV_ID;

         return session;
      },
   },
};
