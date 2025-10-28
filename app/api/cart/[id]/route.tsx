import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { id: userId } = await context.params;
  const cart = await prisma.cart.findMany({ where: { userId: userId } });

  return NextResponse.json(cart);
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { id: userId } = await context.params;
  try {
    const body = await request.json();
    const productId = body.productId;

    if (!productId) {
      return NextResponse.json(
        { error: "Missing 'productId' in request body." },
        { status: 400 }
      );
    }

    // --- 🔑 SOLUTION: Use upsert to either create a new item or increment quantity ---
    const updatedCart = await prisma.cart.create({
      data: {
        userId: userId,
        postId: productId,
      },
    });
    return NextResponse.json(updatedCart, { status: 200 });
  } catch (error) {
    console.error("Prisma Post Creation Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during post creation." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id: postId } = await context.params;
  const body = await request.json();
  const userId = body.userId;

  const deletedCartItem = await prisma.cart.delete({
    where: {
      userId_postId: {
        userId: userId,
        postId: postId,
      },
    },
  });

  return NextResponse.json(deletedCartItem, { status: 200 });
}
