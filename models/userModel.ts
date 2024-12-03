import mongoose, { Model, Types } from "mongoose";

export interface IUser extends Document {
  id: Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  hashedPin: string;
  balance: number;
  status: "active" | "pending";
  role: "user" | "agent" | "admin";
  isAdmin: boolean;
}
type modelType = Model<IUser>;

const userSchema = new mongoose.Schema<IUser, modelType>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    hashedPin: { type: String, required: true },
    balance: { type: Number, required: true, default: 40 },
    status: {
      type: String,
      required: true,
      enum: ["active", "pending", "blocked"],
      default: "active",
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "agent", "admin"],
      default: "user",
    },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
