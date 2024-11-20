import Transaction from "@/models/transactionModel";
import connectDB from "@/utils/connectDB";
import { decodeJwt } from "jose";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  const { _id, phone } = decodeJwt(token!);

  if (!_id) {
    return NextResponse.json({ error: "token not found!" }, { status: 400 });
  }

  const ObjectId = mongoose.Types.ObjectId;
  const userId = _id as string;
  const matchCond = {
    $or: [
      { senderId: new ObjectId(userId) },
      { receiverId: new ObjectId(userId) },
    ],
  };

  try {
    await connectDB();
    const result = await Transaction.aggregate([
      {
        $match: matchCond,
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
