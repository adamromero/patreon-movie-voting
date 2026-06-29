import connectDB from "@/lib/connectDB";
import updatePledge from "./updatePledge";
import removePledge from "./removePledge";

export default async function handlePledge(event: any, request: any) {
   const patreonUserId = request.data?.relationships?.user?.data?.id;
   const tier = request.included?.find(
      (pledge: any) => pledge.type === "tier",
   ).id;

   console.log("event: ", event);

   if (!patreonUserId) {
      throw new Error("Patreon webhook: missing user ID");
   }

   const conn = await connectDB();
   const db = conn.connection.db;

   if (!db) {
      throw new Error("Cannot connect to DB");
   }

   const user = await db.collection("users").findOne({
      patreonId: patreonUserId,
   });

   if (!user) {
      return { message: "User not found" };
   }

   if (event === "members:pledge:update") {
      updatePledge(db, user, event, tier);
   } else if (event === "members:pledge:delete") {
      const nextChargeDate = request.data?.attributes?.next_charge_date ?? null;
      removePledge(db, user, event, nextChargeDate);
   }

   return { status: 200 };
}
