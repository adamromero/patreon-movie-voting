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
   nextChargeDate: string,
) {
   const pledgeCanceledAt = new Date();
   const accessEndsAt = nextChargeDate
      ? new Date(nextChargeDate)
      : pledgeCanceledAt;

   console.log("pledgeCanceledAt: ", pledgeCanceledAt);
   console.log("accessEndsAt: ", accessEndsAt);

   await db.collection("users").updateOne(
      { _id: user._id },
      {
         $set: {
            pledgeCanceledAt,
            accessEndsAt,
         },
      },
   );
}
