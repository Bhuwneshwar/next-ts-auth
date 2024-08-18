import { connect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log({ reqBody });
    const { token } = reqBody;
    console.log({ token });

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    console.log({ user });

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email verify successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
