import mongoose from "mongoose";

const connectDB = async () => {
  const url = process.env.MONGODB_CONNECTION_STRING;
  if (!url) {
    throw new Error("URL not found!");
  }
  try {
    await mongoose.connect(url);
    console.log("DB connected successfully");
  } catch (err) {
    throw new Error("Cannot connect to db!");
  }
};

export default connectDB;
