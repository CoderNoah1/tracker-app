import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET(request: Request) {
    
    const session = await getServerSession(authOptions);

    console.log("Session data:", session);

    if (!session) {
        return new Response(JSON.stringify({ error: "Not Autherized" }), { status: 401 });
    }

    return new Response(JSON.stringify(session), { status: 200 });

}