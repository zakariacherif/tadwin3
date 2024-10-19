import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    auth().protect();

    const { sessionClaims } = await auth();
    if (!sessionClaims || !sessionClaims.email) {
        return NextResponse.json(
            { message: "Unauthorized: Invalid session claims" },
            { status: 401 }
        );
    }

    const { room } = await req.json();
    const session = liveblocks.prepareSession(sessionClaims.email, {
        userInfo: {
            name: sessionClaims.fullName,
            email: sessionClaims.email,
            avatar: sessionClaims.image,
        }
    });

    try {
        const usersInRoom = await adminDb
            .collectionGroup('rooms')
            .where('userId', '==', sessionClaims.email)
            .get();

        const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

        if (userInRoom?.exists) {
            session.allow(room, session.FULL_ACCESS);
            const { body, status } = await session.authorize();
            console.log("you are authorized to access the room");
            return new Response(body, { status });
        } else {
            return NextResponse.json(
                { message: "You are not authorized to access this room" },
                { status: 403 }
            );
        }
    } catch (error) {
        console.error("Error accessing the room:", { error, room, sessionClaims });
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
