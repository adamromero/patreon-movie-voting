import connectDB from "@/lib/connectDB";

export default async function sessionCleanup() {
   const conn = await connectDB();
   const db = conn.connection.db;

   console.log("Running cron...");

   if (!db) {
      throw new Error("No DB connection");
   }

   const expiredUsers = await db
      .collection("users")
      .find({ accessEndsAt: { $lt: new Date() } }, { projection: { _id: 1 } })
      .toArray();

   const userIds = expiredUsers.map((user) => user._id);

   if (userIds.length === 0) {
      const response = {
         ok: true,
         deletedUsers: 0,
         deletedSessions: 0,
      };

      console.log(response);
      return response;
   }

   const deleteSession = await db
      .collection("sessions")
      .deleteMany({ userId: { $in: userIds } });

   const deleteUser = await db
      .collection("users")
      .deleteMany({ _id: { $in: userIds } });

   const response = {
      ok: true,
      deletedUsers: deleteUser.deletedCount,
      deletedSessions: deleteSession.deletedCount,
   };

   console.log(response);
   return response;
}
