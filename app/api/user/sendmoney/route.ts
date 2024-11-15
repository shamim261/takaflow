import Transaction, { ITransaction } from "@/models/transactionModel";
import User from "@/models/userModel";
import { getUser } from "@/utils/auth";
import bcrypt from "bcrypt";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const user = await getUser();
  const { formData } = await req.json();

  const { number, amount: userAmount, pin } = formData;

  const sender = await User.findOne({ phone: user?.phone });
  const receiver = await User.findOne({ phone: number, role: "user" });
  // check the valid receipt
  if (!receiver || sender?.phone === number) {
    return NextResponse.json(
      { error: "Receipt should be a valid user!" },
      { status: 400 }
    );
  }
  // check the minimum amount
  const minimumAmount = 10;
  const amount = Number(userAmount);
  if (amount < minimumAmount) {
    return NextResponse.json(
      { error: "Minimum amount is 10 taka!" },
      { status: 400 }
    );
  }
  if (amount > sender.balance) {
    return NextResponse.json(
      { error: "insufficient balance!" },
      { status: 400 }
    );
  }

  // check pin
  const isMatch = await bcrypt.compare(pin, sender.hashedPin);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 400 });
  }
  const fee = amount >= 100 ? 5 : 0;
  try {
    const transaction: HydratedDocument<ITransaction> = new Transaction({
      senderId: sender._id,
      receiverId: receiver._id,
      type: "send_money",
      fee: fee,
      amount: amount + fee,
    });
    await transaction.save();
    // TODO: Complete the transaction
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
