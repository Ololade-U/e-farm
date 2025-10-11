import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import useStoreQuery from "@/app/components/store";
import { error } from "console";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {

  const body = await request.json();

  const userExist = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (userExist)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
//   setUser(true);

  const userNameExists = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (userNameExists)
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 400 }
    );
//   setUserName(true);

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword: hashedPassword,
      role: body.role,
      storeName: body.storeName,
      name: body.name,
      phoneNumber: body.phoneNumber,
      country: body.country,
      username: body.username,
    },
  });

  if(!newUser)
    return NextResponse.json({error : error}, {status : 400})

  return NextResponse.json({ email: newUser.email, id : newUser.id });
}
