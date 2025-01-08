import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST (request: NextRequest) {

    try {
        const session = await getServerSession(authOptions);
        const trackData = await request.json();
    
        if (!session) {
            return NextResponse.json({ message: "Could not find the session" }, { status: 404 });
        }
    
        const user = await prisma.user.findUnique({
            where: { email: session.user?.email ?? "" }
        });
    
        if (!user) {
            return NextResponse.json({ message: "Can't find the user" }, { status: 404 })
        }
    
        if (!trackData.name || !trackData.type || !trackData.tags || !trackData.description || !trackData.color) {
            return NextResponse.json({ message: "You need to fill in all the fields" }, { status: 400 })
        }

        const track = await prisma.track.create({
            data: {
                name: trackData.name,
                type: trackData.type,
                tags: {
                    connectOrCreate: trackData.tags.map((tagContent: string) => ({
                        where: {
                            userId_content: {
                                userId: user.id,
                                content: tagContent
                            }
                        },
                        create: {
                            content: tagContent, 
                            userId: user.id 
                        }
                    }))
                },
                description: trackData.description,
                color: trackData.color,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        });
    
        console.log("Successfully created new track", track);
        return NextResponse.json({ message: "Successfully created new track" }, { status: 200 });
    } catch (error: any) {
        console.error("Error creating track: ", error);
        return NextResponse.json({ message: "Error create", error: error }, { status: 500 });
    }
}