import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
   throw new Error("Please add your Mongo URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
   var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
   let globalWithMongoClientPromise = global;

   if (!globalWithMongoClientPromise._mongoClientPromise) {
      client = new MongoClient(uri);
      globalWithMongoClientPromise._mongoClientPromise = client.connect();
   }
   clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
   client = new MongoClient(uri);
   clientPromise = client.connect();
}

export default clientPromise;
