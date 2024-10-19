'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {  Users } from "lucide-react";
import {  useState, useTransition } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import useOwner from "@/lib/useOwner";
import { useRoom } from "@liveblocks/react/suspense";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { removeUserFromDoc } from "@/actions/actions";

const ManageUsers = () => {
    const { user } = useUser();
    const isOwner = useOwner();
    const room = useRoom();
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
    );

    const handleDelete = async (userId: string) => {
        // Handle delete logic here
        startTransition(async ()=>{
            if(!user) return;
            const {success} = await removeUserFromDoc(room.id, userId);
            if(success){
                toast.success("تم حذف المستخدم بنجاح");
                setIsOpen(false);
            }else{
                toast.error("حدث خطأ أثناء حذف المستخدم");
            }
        });
       
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="h-full">
                <Button className="h-full">
                    <Users />
                    <h1 className="mr-2 text-lg font-normal font-alex">
                        ({usersInRoom?.docs.length})
                    </h1>
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-start font-alex justify-center p-10">
                <DialogHeader>
                    <DialogTitle className="text-right text-2xl font-bold">
                        المستخدمون الذين شاركتهم هذه المدونة
                    </DialogTitle>
                    <DialogDescription className="text-right text-sm">
                        هذه قائمة المستخدمين الذين يمكنهم التعديل على المدونة.
                    </DialogDescription>
                </DialogHeader>
                <hr />
                <div>
                    {/* Users in this room */}
                    {usersInRoom?.docs.map((doc) => {
                        const userRole = doc.data().role;
                        return (
                            <div
                                key={doc.data().userId}
                                className="flex items-center justify-between w-full p-4 gap-3 mb-4 border-b border-gray-300"
                            >
                                <p className="font-light">
                                    {doc.data().userId === user?.emailAddresses[0]?.toString()
                                        ? `أنت (${doc.data().userId})`
                                        : doc.data().userId}
                                </p>
                                <div className="flex items-center gap-2 w-full">
                                    <Button>
                                        {userRole === "owner" ? "المالك" : "ضيف"}
                                    </Button>
                                    {isOwner &&
                                    doc.data().userId !== user?.emailAddresses[0].toString() && (
                                        <Button
                                            onClick={() => handleDelete(doc.data().userId)}
                                            disabled={isPending}
                                            variant="destructive"
                                        >
                                            {isPending ? "جاري حذف..." : "حذف"}    
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ManageUsers;
