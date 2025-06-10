import mongoose from "mongoose";

// const connectionString = process.env.MONGO;
const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@ozonecluster.xtb3u.mongodb.net/ozone?retryWrites=true&w=majority&appName=ozoneCluster`;

if (!process.env.MONGO_DB_USERNAME || !process.env.MONGO_DB_PASSWORD) {
  throw new Error("MongoDB credentials are not set in environment variables");
}

const connectDB = async () => {
  if (mongoose.connection?.readyState >= 1) {
    console.log("---- Already connected to MongoDB ----");
    return;
  }

  try {
    console.log("---- Connecting to MongoDB ----");
    await mongoose.connect(connectionString);
    console.log("---- Connected Successfully✅ ----");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectDB;