import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET (req: Request, { params }: { params: { userId: string } }) {
    
    const session = await getServerSession(authOptions);
    const userId = params.userId;

    if (!session) {
        return NextResponse.json({ message: "Could not find the session" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        return NextResponse.json({ message: "Can't find the user" }, { status: 404 });
    }

    const userTags = await prisma.tag.findMany({
        where: { userId }
    })

    if (userTags.length === 0) {
        return NextResponse.json({ message: "User as no tags" }, { status: 200 });
    }

    return NextResponse.json(userTags, { status: 200 })

} 