import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

const connectDB = async () => {
  if (connection.isConnected) {
    return;
  }

  const url = process.env.MONGODB_CONNECTION_STRING;

  try {
    const db = await mongoose.connect(url!);
    console.log("DB connected successfully");
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    throw new Error("Cannot connect to db!");
  }
};

export default connectDB;
