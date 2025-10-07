import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'



export async function POST(request : NextRequest){
    const body = await request.json()

    const userExist = await prisma.user.findUnique({
        where : {email : body.email}
    })

    if(userExist)
        return NextResponse.json({error : 'User already exists'}, {status : 400})

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const newUser = await prisma.user.create({
        data : {
            email : body.email,
            hashedPassword : hashedPassword,
            role : body.role,
            storeName : body.storeName,
            name : body.name,
            phoneNumber : body.phoneNumber,
            country : body.country
        }
    })

    return NextResponse.json({email : newUser.email})
}
