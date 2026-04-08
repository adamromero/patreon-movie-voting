import connectDB from "@/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

type Db = NonNullable<mongoose.Connection["db"]>;

interface UserDocument {
   _id: mongoose.Types.ObjectId;
   accessEndsAt?: string | Date | null;
   patreonId?: string;
}

const handlePledgeUpdate = async (db: Db, user: UserDocument) => {
   if (user.accessEndsAt && new Date(user.accessEndsAt) > new Date()) {
      await db.collection("users").updateOne(
         { _id: user._id },
         {
            $set: {
               accessEndsAt: null,
            },
         },
      );
   }
};

const handlePledgeDelete = async (
   db: Db,
   user: UserDocument,
   nextChargeDate: string,
) => {
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
};

export async function POST(req: NextRequest) {
   try {
      const event = req.headers.get("x-patreon-event");
      const request = await req.json();
      const patreonUserId = request.data?.relationships?.user?.data?.id;

      console.log("event: ", event);

      if (!patreonUserId) {
         return NextResponse.json(
            { message: "Patreon webhook: missing user ID" },
            { status: 200 },
         );
      }

      const conn = await connectDB();
      const db = conn.connection.db;

      if (!db) {
         return NextResponse.json({ status: 200 });
      }

      const user = await db.collection("users").findOne({
         patreonId: patreonUserId,
      });

      if (!user) {
         return NextResponse.json({ status: 200 });
      }

      if (event === "members:pledge:update") {
         handlePledgeUpdate(db, user);
      } else if (event === "members:pledge:delete") {
         const nextChargeDate =
            request.data?.attributes?.next_charge_date ?? null;
         handlePledgeDelete(db, user, nextChargeDate);
      }

      return NextResponse.json({ status: 200 });
   } catch (error) {
      console.error("Patreon webhook error:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 },
      );
   }
}
