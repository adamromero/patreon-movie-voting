import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
   throw new Error("Missing MONGODB_URI");
}

const globalForMongo = globalThis as typeof globalThis & {
   _mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
   globalForMongo._mongoClientPromise ??
   (globalForMongo._mongoClientPromise = new MongoClient(uri).connect());

export default clientPromise;
