import prisma from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface Props{
    params : {id : string}
}


export async function GET(request : NextRequest, {params : {id}}:Props){
    const user = await prisma.user.findUnique({
        where : {email : id}
    })

    if(!user)
        return NextResponse.json({error : 'User does not exist'}, {status : 404})

    return NextResponse.json(user)
}