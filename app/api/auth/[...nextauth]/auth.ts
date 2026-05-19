import { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import PatreonProvider from "next-auth/providers/patreon";
import clientPromise from "@/lib/mongodb";
import connectDB from "@/lib/connectDB";
import type { User as AppUser } from "@/app/types/user";

declare module "next-auth" {
   interface Session {
      user: AppUser;
   }

   interface User {
      firstName: string;
      patreonId: string;
      tier?: string;
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
         const patreonId = (profile as any)?.data?.id;
         if (patreonId === process.env.CREATOR_ID) {
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

         const email = (profile as any)?.data?.attributes?.email;
         const tier =
            pledge.relationships?.currently_entitled_tiers?.data?.find(
               (item: any) => item.type === "tier",
            )?.id;

         user.firstName = (profile as any).data.attributes.first_name;
         user.patreonId = patreonId;
         user.tier = tier;

         const conn = await connectDB();
         const db = conn.connection.db;

         if (db) {
            const userDB = await db.collection("users").findOne({ email });

            if (userDB) {
               const updates: Partial<{
                  patreonId: string;
                  tier: string;
               }> = {};

               //set patreon id to existing user that didn't have one
               if (!userDB.patreonId) {
                  updates.patreonId = patreonId;
               }

               //set tier to existing user who doesn't have a tier or the stored tier differs from the current one
               if (userDB.tier !== tier) {
                  updates.tier = tier;
               }

               if (Object.keys(updates).length > 0) {
                  await db
                     .collection("users")
                     .updateOne({ email }, { $set: updates });
               }
            }
         }

         return true;
      },

      async redirect({ baseUrl }) {
         return baseUrl;
      },
      async session({ session, user }) {
         session.user.id = user.patreonId;
         session.user.firstName = user.firstName ?? "";
         session.user.accessEndsAt = user.accessEndsAt;
         session.user.isCreator = user.patreonId === process.env.CREATOR_ID;
         session.user.isProducer =
            user.patreonId === process.env.PRODUCER_TIER_ID;

         return session;
      },
   },
};
