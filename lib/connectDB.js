import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI_DEV;

if (!MONGO_URI) {
   throw new Error("Please add your MONGO_URI to .env.local");
}

let globalWithMongoose = global;
let cached = globalWithMongoose.mongoose;

if (!cached) {
   cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB() {
   if (cached.conn) {
      return cached.conn;
   }

   if (!cached.promise) {
      cached.promise = mongoose
         .connect(MONGO_URI)
         .then((mongoose) => {
            return mongoose;
         })
         .catch((error) => {
            console.error("MongoDB connection error:", error);
            throw error;
         });
   }

   try {
      cached.conn = await cached.promise;
      return cached.conn;
   } catch (error) {
      throw error;
   }
}

export default connectDB;
