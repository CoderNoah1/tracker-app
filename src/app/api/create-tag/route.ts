import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST (request: NextRequest) {

    const session = await getServerSession(authOptions);
    const tagContentData = await request.json();

    if (!session) {
        return NextResponse.json({ message: "Could not find the session" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user?.email ?? "" }
    });

    if (!user) {
        return NextResponse.json({ message: "Can't find the user" }, { status: 404 })
    }

    if (!tagContentData.content) {
        return NextResponse.json({ message: "You need to write somthing" }, { status: 400 })
    }

    await prisma.tag.create({
        data: {
            content: tagContentData.content,
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    })

    return NextResponse.json({ message: "Successfully created new tag" }, { status: 200 })
}