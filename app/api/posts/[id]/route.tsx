import prisma from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


interface Props{
    params : {id : string}
}

export async function GET(request: NextRequest, {params : {id}}:Props){
    const post = await prisma.post.findMany({
        where : {userId : id}
    })

    return NextResponse.json(post)
}



export async function POST(request : NextRequest, {params : {id}}:Props){
    const body = await request.json()

    const newPost = await prisma.post.create({
        data : {
            description : body.description,
            amount : body.amount,
            status : body.status,
            type : body.type,
            quantity : body.quantity,
            userId : id
        }
    })

    if(!newPost)
        return NextResponse.json({error : error}, {status : 400})

    return NextResponse.json(newPost)
}