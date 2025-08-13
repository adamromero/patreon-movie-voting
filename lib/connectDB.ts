import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGODB_URI as string;
if (!MONGO_URI) throw new Error("Please add your MONGO_URI to .env.local");

let cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } = (
   global as any
).mongooseCache || { conn: null, promise: null };

(global as any).mongooseCache = cached;

export default async function connectDB(): Promise<Mongoose> {
   if (cached.conn) return cached.conn;

   if (!cached.promise) {
      cached.promise = mongoose.connect(MONGO_URI).then((m) => m);
   }

   cached.conn = await cached.promise;
   return cached.conn;
}
