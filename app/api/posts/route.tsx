import prisma from "@/prisma/client";
import { Props } from "next/script";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const post = await prisma.post.findMany();

  return NextResponse.json(post);
}