import prisma from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const post = await prisma.post.findMany({
    where: { userId: id },
  });

  return NextResponse.json(post);
}

export async function POST(request: NextRequest, { params: { id } }: Props) {
  try {
    const body = await request.json();

    const amountAsNumber = parseInt(body.amount); // Use parseFloat for currency/decimals
    const quantityAsNumber = parseInt(body.quantity);

    const newPost = await prisma.post.create({
      data: {
        description: body.description,
        amount: amountAsNumber,
        status: body.status,
        type: body.type,
        img : body.img,
        quantity: quantityAsNumber,
        userId: id,
      },
    });

    if (!newPost)
      return NextResponse.json(
        { error: "Your product wasn't uploaded" },
        { status: 400 }
      );

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Prisma Post Creation Error:", error);
    // Respond with a general error message for the client
    return NextResponse.json(
      { error: "Internal Server Error during post creation." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const post = prisma.post.findUnique({
    where: { id: id },
  });

  if (!post)
    return NextResponse.json({ error: "Post not found" }, { status: 400 });

  await prisma.post.delete({
    where: { id: id },
  });

  return NextResponse.json(`Post ${id} was deleted`);
}
