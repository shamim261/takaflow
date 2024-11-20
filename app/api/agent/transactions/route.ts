import Transaction from "@/models/transactionModel";
import User from "@/models/userModel";
import connectDB from "@/utils/connectDB";
import { decodeJwt } from "jose";
import mongoose, { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export interface MatchCond {
  $or: [{ senderId: Types.ObjectId }, { receiverId: Types.ObjectId }];
  status?: string | undefined;
}

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  const { _id } = decodeJwt(token!);
  const userId = _id as string;

  if (!_id) {
    return NextResponse.json({ error: "token not found!" }, { status: 400 });
  }

  const ObjectId = mongoose.Types.ObjectId;

  try {
    await connectDB();
    const matchedCond: MatchCond = {
      $or: [
        { senderId: new ObjectId(userId) },
        { receiverId: new ObjectId(userId) },
      ],
      status: status === "pending" ? "pending" : undefined,
    };
    if (status && status === "pending") {
      matchedCond.status = "pending";
    }

    const result = await Transaction.aggregate([
      {
        $match: matchedCond,
      },
      // Lookup for sender's phone
      {
        $lookup: {
          from: "users", // The name of the User collection
          localField: "senderId",
          foreignField: "_id",
          as: "senderDetails",
        },
      },
      // Lookup for receiver's phone
      {
        $lookup: {
          from: "users",
          localField: "receiverId",
          foreignField: "_id",
          as: "receiverDetails",
        },
      },
      // Add sender and receiver phone numbers
      {
        $addFields: {
          senderPhone: { $arrayElemAt: ["$senderDetails.phone", 0] }, // Extract phone from senderDetails
          receiverPhone: { $arrayElemAt: ["$receiverDetails.phone", 0] }, // Extract phone from receiverDetails
        },
      },
      // Remove extra lookup details to clean up the output
      {
        $project: {
          senderDetails: 0,
          receiverDetails: 0,
        },
      },
      {
        $addFields: {
          userSpecificType: {
            $cond: {
              if: { $eq: ["$senderId", new ObjectId(userId)] },
              then: {
                $cond: {
                  if: { $eq: ["$type", "send_money"] },
                  then: "Sent Money",
                  else: "Cash Out",
                },
              },
              else: {
                $cond: {
                  if: { $eq: ["$type", "send_money"] },
                  then: "Received Money",
                  else: "Cash In",
                },
              },
            },
          },
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
    ]);

    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, action } = await req.json();

    await connectDB();

    const transaction = await Transaction.findOne({ _id: id });

    if (action === "approve") {
      const sender = await User.findById(transaction.senderId);
      const receiver = await User.findById(transaction.receiverId);

      if (transaction.type === "cash_in") {
        sender.balance += transaction.amount;
        receiver.balance -= transaction.amount;
      }
      if (transaction.type === "cash_out") {
        sender.balance -= transaction.amount;
        receiver.balance += transaction.amount - transaction.fee;
      }
      await sender.save();
      await receiver.save();

      transaction.status = "approved";
    }

    if (action === "decline") {
      transaction.status = "rejected";
    }
    await transaction.save();

    return NextResponse.json({ success: "Transaction Updated Successfully!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Transaction updatation error!" },
      { status: 500 }
    );
  }
}
