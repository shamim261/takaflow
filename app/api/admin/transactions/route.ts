import Transaction from "@/models/transactionModel";
import { getUser } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const userInfo = await getUser();
  if (!userInfo?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }
  try {
    await connectDB();
    const transactions = await Transaction.aggregate([
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
    ]).sort({ updatedAt: -1 });
    return NextResponse.json(transactions);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error!" },
      { status: 500 }
    );
  }
};
