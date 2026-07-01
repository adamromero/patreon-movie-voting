import mongoose from "mongoose";

type Db = NonNullable<mongoose.Connection["db"]>;

interface UserDocument {
   _id: mongoose.Types.ObjectId;
   accessEndsAt?: string | Date | null;
   patreonId?: string;
}

export default async function removePledge(
   db: Db,
   user: UserDocument,
   event: string,
   nextChargeDate: string,
) {
   const pledgeCanceledAt = new Date();
   const accessEndsAt = nextChargeDate
      ? new Date(nextChargeDate)
      : pledgeCanceledAt;

   const patreonWebhookEventLog = {
      type: event,
      at: pledgeCanceledAt,
   };

   console.log("user id: ", user._id);
   console.log("event: ", event);

   await db.collection("users").updateOne(
      { _id: user._id },
      {
         $set: {
            pledgeCanceledAt,
            accessEndsAt,
            patreonWebhookEventLog,
         },
      },
   );
}
