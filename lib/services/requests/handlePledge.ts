import connectDB from "@/lib/connectDB";
import updatePledge from "./updatePledge";
import removePledge from "./removePledge";

export default async function handlePledge(event: any, request: any) {
   const patreonUserId = request.data?.relationships?.user?.data?.id;
   const tier = request.included?.find(
      (pledge: any) => pledge.type === "tier",
   ).id;

   const webhookInfo = {
      event,
      request,
      patreonUserId,
   };

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
      console.warn("Patreon webhook received for unknown user", webhookInfo);

      return {
         ignored: true,
         reason: "user_not_found",
      };
   }

   const nextChargeDate = request.data?.attributes?.next_charge_date ?? null;

   try {
      if (event === "members:pledge:update") {
         await updatePledge(db, user, event, tier);
      }

      if (event === "members:pledge:delete") {
         await removePledge(db, user, event, nextChargeDate);
      }

      console.log("Webhook processed successfully", webhookInfo);

      return { status: 200 };
   } catch (err) {
      console.error("Webhook processing failed", err);

      throw err;
   }
}
