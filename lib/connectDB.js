import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
   throw new Error("Please add your MONGODB_URI to .env.local");
}

const MONGODB_URI = process.env.MONGO_URI;

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
      const opts = {
         bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
         return mongoose;
      });
   }
   cached.conn = await cached.promise;
   return cached.conn;
}

export default connectDB;
