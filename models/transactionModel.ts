import mongoose, { Types } from "mongoose";

export interface ITransaction {
  trxID: string;
  type: "send_money" | "cash_out" | "cash_in";
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  amount: number;
  fee: number;
  status: "rejected" | "pending" | "approved";
}

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    trxID: { type: String, required: true, unique: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: {
      type: String,
      required: true,
      enum: ["send_money", "cash_in", "cash_out"],
    },
    fee: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: {
      type: "String",
      enum: ["rejected", "pending", "approved"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
