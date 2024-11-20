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
    const statistics = await Transaction.aggregate([
      {
        $match: { status: "approved" },
      },
      {
        $group: {
          _id: null,
          totalTransaction: { $sum: "$amount" },
          totalRevenue: { $sum: "$fee" },
        },
      },
      {
        $lookup: {
          from: "users",
          pipeline: [{ $count: "totalUsers" }],
          as: "userCount",
        },
      },
      {
        $lookup: {
          from: "users",
          pipeline: [{ $match: { role: "agent" } }, { $count: "totalUser" }],
          as: "agentCount",
        },
      },
      {
        $unwind: {
          path: "$userCount",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return NextResponse.json(statistics);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error!" },
      { status: 500 }
    );
  }
};
