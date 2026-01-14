import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  const users = await prisma.user.findMany();
  console.log(users)
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userExist = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (userExist)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const userNameExists = await prisma.user.findUnique({
      where: { username: body.username },
    });

    if (userNameExists)
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        hashedPassword: hashedPassword,
        role: body.role,
        storeName: body.storeName,
        name: body.name,
        phoneNumber: body.phoneNumber,
        LGA: body.LGA,
        username: body.username,
      },
    });

    if (!newUser)
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 400 }
      );

    return NextResponse.json({ email: newUser.email, id: newUser.id });
  } catch (err) {
    console.error("Error in /api/users POST:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
