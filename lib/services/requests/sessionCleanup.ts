import connectDB from "@/lib/connectDB";

export default async function sessionCleanup() {
   const conn = await connectDB();
   const db = conn.connection.db;

   if (!db) {
      throw new Error("No DB connection");
   }

   const expiredUsers = await db
      .collection("users")
      .find({ accessEndsAt: { $lt: new Date() } }, { projection: { _id: 1 } })
      .toArray();

   const userIds = expiredUsers.map((u) => u._id);

   if (userIds.length === 0) {
      return {
         ok: true,
         expiredUsers: 0,
         deletedSessions: 0,
      };
   }

   const updateResult = await db
      .collection("users")
      .updateMany(
         { _id: { $in: userIds } },
         { $set: { accessEndsAt: null, pledgeCanceledAt: null } },
      );

   const deleteResult = await db
      .collection("sessions")
      .deleteMany({ userId: { $in: userIds } });

   return {
      ok: true,
      expiredUsers: updateResult.modifiedCount,
      deletedSessions: deleteResult.deletedCount,
   };
}
