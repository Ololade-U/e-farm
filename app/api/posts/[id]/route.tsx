import { PostType, Status, MeasureUnit } from "@/app/generated/prisma";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


interface Products{
    id : string,
    userId : string,
    description : string,
    type : PostType,
    amount : number,
    quantity : number,
    postedAt : Date,
    status : Status,
    img : string | null
}

type RouteContext = {
    params: Promise<{ id: string }>;
};



export async function GET(request: NextRequest, context: RouteContext): Promise<NextResponse<Products[] | { error: string }>> {
  const { id } = await context.params;
  const post = await prisma.post.findMany({
    where: { userId: id },
  });

  return NextResponse.json(post);
}

export async function POST(request: NextRequest, context: RouteContext) : Promise<NextResponse<Products | { error: string }>> {
  const { id : userId } = await context.params;
  try {
    const body = await request.json();

    const amountAsNumber = parseInt(body.amount); // Use parseFloat for currency/decimals
    const quantityAsNumber = parseInt(body.quantity);

    const postType = body.type as PostType;
    const statusType = body.status as Status;

    const newPost = await prisma.post.create({
      data: {
        description: body.description,
        amount: amountAsNumber,
        status: statusType,
        type: postType,
        img: body.img,
        quantity: quantityAsNumber,
        userId: userId,
        unit: body.unit as MeasureUnit,
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
    return NextResponse.json(
      { error: "Internal Server Error during post creation." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) : Promise<NextResponse<string | { error: string }>> {
  const { id } = await context.params;
  const post = await prisma.post.findUnique({
    where: { id: id },
  });

  if (!post)
    return NextResponse.json({ error: "Post not found" }, { status: 400 });

  await prisma.post.delete({
    where: { id: id },
  });

  return NextResponse.json(`Post ${id} was deleted`);
}
