import Transaction, { ITransaction } from "@/models/transactionModel";
import User from "@/models/userModel";
import { getUser } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import generateID from "@/utils/generateID";
import bcrypt from "bcrypt";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDB();
  const user = await getUser();
  const { number, amount: userAmount, pin } = await req.json();

  const sender = await User.findOne({ phone: user?.phone });
  const receiver = await User.findOne({ phone: number, role: "user" });
  // check the valid receipt

  if (!receiver || receiver?.status === "pending" || sender?.phone === number) {
    return NextResponse.json(
      { error: "Receipt should be a valid User!" },
      { status: 400 }
    );
  }
  // check the minimum amount
  const minimumAmount = 10;
  const amount = Number(userAmount);
  if (amount < minimumAmount) {
    return NextResponse.json(
      { error: `Minimum amount is ${minimumAmount} taka!` },
      { status: 400 }
    );
  }

  // check pin
  const isMatch = await bcrypt.compare(pin, sender.hashedPin);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 400 });
  }
  const fee = 0;
  try {
    await connectDB();

    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();

    const transaction: HydratedDocument<ITransaction> = new Transaction({
      trxID: generateID(),
      senderId: sender._id,
      receiverId: receiver._id,
      type: "send_money",
      fee: fee,
      amount: amount + fee,
      status: "approved",
    });
    await transaction.save();

    return NextResponse.json(
      { success: "Transaction created successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error!" },
      { status: 500 }
    );
  }
};
