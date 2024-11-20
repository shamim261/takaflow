import User from "@/models/userModel";
import { userLoginInput } from "@/schemas/userSchema";
import { userLoginType } from "@/types";
import connectDB from "@/utils/connectDB";
import { generateToken } from "@/utils/tokenUtils";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, pin }: userLoginType = await req.json();
  // data validation
  const validationResult = userLoginInput.safeParse({ email, pin });
  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error?.format() },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const user = await User.findOne({
      $or: [{ email: email }, { phone: email }],
      role: "user",
    });
    if (user) {
      const isMatch = await bcrypt.compare(pin, user.hashedPin);

      if (isMatch) {
        const token = await generateToken(user);
        const { _id, name, email, phone, role, isAdmin } = user;
        let userObj = {
          id: _id,
          name,
          email,
          phone,
          role,
          isAdmin,
          token: token,
        };

        const response = NextResponse.json(userObj);

        response.cookies.set(process.env.COOKIE_NAME!, token!, {
          maxAge: 604800, // 7 days
          httpOnly: true,
        });

        return response;
      } else {
        return NextResponse.json(
          { error: "Invalid username or password" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 400 }
      );
    }
  } catch (e) {
    console.log(e);
  }
}
