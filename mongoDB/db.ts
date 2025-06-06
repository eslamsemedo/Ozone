import mongoose from "mongoose";

// const connectionString = process.env.MONGO;
const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@ozonecluster.xtb3u.mongodb.net/ozone?retryWrites=true&w=majority&appName=ozoneCluster`;

if (!connectionString) {
  throw new Error("Please provide a valid connection string");
}

const connectDB = async () => {
  if (mongoose.connection?.readyState >= 1) {
    console.log("---- Already connected to MongoDB ----");
    return;
  }

  try {
    console.log("---- Connecting to MongoDB ----");
    await mongoose.connect(connectionString);
    console.log("---- connected Successfully✅ ----");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectDB;