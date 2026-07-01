import mongoose from "mongoose";

type Db = NonNullable<mongoose.Connection["db"]>;

interface UserDocument {
   _id: mongoose.Types.ObjectId;
   accessEndsAt?: string | Date | null;
   patreonId?: string;
}

export default async function updatePledge(
   db: Db,
   user: UserDocument,
   event: string,
   tier: string,
) {
   const patreonWebhookEventLog = {
      type: event,
      at: new Date(),
   };

   await db.collection("users").updateOne(
      { _id: user._id },
      {
         $set: {
            pledgeCanceledAt: null,
            accessEndsAt: null,
            patreonWebhookEventLog,
            tier,
         },
      },
   );
}
