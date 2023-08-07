import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      const db = conn.connection.useDb(process.env.MONGO_DATABASE);

      console.log(`MongoDB Connected: ${conn.connection.host}`);
   } catch (error) {
      console.log(error);
      process.exit(1);
   }
};

export default connectDB;
