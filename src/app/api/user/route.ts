/* eslint-disable @typescript-eslint/no-unused-vars */
import prismadb from "@/lib/prismadb";
import * as bcrypt from "bcrypt"

interface RequestBody {
    name: string;
    email: string;
    password: string
}

export async function POST(request:Request) {

    const body: RequestBody = await request.json();

    const user = await prismadb.user.create({
        data:{
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password,10)
        }
    });
    
    
    const {password, ...result} = user;
    return new Response(JSON.stringify(result));
}