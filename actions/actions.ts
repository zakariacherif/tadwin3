'use server';

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDoc() {
    auth().protect(); // Protect this route with authentication
    const { sessionClaims } = await auth();
    
    const docCollectionRef = adminDb.collection('documents');
    const docRef = await docCollectionRef.add({
        title: "مدوّنة جديدة",
        createdAt: new Date(), // Adding a createdAt field for better tracking
    });

    await adminDb.collection('users')
        .doc(sessionClaims?.email!)
        .collection('rooms')
        .doc(docRef.id)
        .set({
            userId: sessionClaims?.email!,
            role: "owner",
            createdAt: new Date(),
            roomId: docRef.id,
        });

    return {
        docId: docRef.id,
    };
}   
{/*----------------------------------------------------------------------------------*/}
export async function deleteDocument(roomId: string) {
    auth().protect(); // Protect this route with authentication
    try {
        // Delete the document from the 'documents' collection
        await adminDb.collection('documents').doc(roomId).delete();

        // Query to find related rooms and delete them
        const query = await adminDb
            .collectionGroup('rooms')
            .where('roomId', '==', roomId)
            .get();

        const batch = adminDb.batch();
        query.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Remove the room from liveblocks
        await liveblocks.deleteRoom(roomId);

        return { success: true };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { success: false };
    }
}
{/*------------------------------------------------------------------------*/}
export async function inviteUser(roomId: string, email: string){
    auth().protect(); // Protect this route with authentication
    try{
        await adminDb
        .collection('users')
        .doc(email)
        .collection('rooms')
        .doc(roomId)
        .set({
            userId: email,
            role: "editor",
            createdAt: new Date(),
            roomId  
        })
    return { success: true};
    }catch(error){
        console.error(error);
        return { success: false};
    }
}
/*--------------------------------------------------------------------------------*/
export async function removeUserFromDoc(roomId: string, email: string){
    auth().protect(); // Protect this route with authentication
    try{
        await adminDb
        .collection('users')
        .doc(email)
        .collection('rooms')
        .doc(roomId)
        .delete()
        return { success: true};
    }catch(error){
        console.error(error);
        return { success: false};
    }
}