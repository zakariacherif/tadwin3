'use client';

import { deleteDocument } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const DeleteDoc = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const router = useRouter();

    const handleDelete = async () => {
        const roomId = pathname.split("/").pop();
        if (!roomId) return;

        startTransition(async () => {
            try {
                const { success } = await deleteDocument(roomId);
                if (success) {
                    setIsOpen(false);
                    router.replace('/');
                    toast.success("تم حذف الملف بنجاح");
                } else {
                    toast.error("حدث خطأ أثناء حذف الملف");
                }
            } catch (error) {
                console.error("Error deleting document:", error);
                toast.error("حدث خطأ أثناء حذف الملف");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="h-full">
                <Button className="h-full">
                    <Trash />
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-start font-alex justify-center p-10">
                <DialogHeader>
                    <DialogTitle className="text-right text-2xl font-bold">
                        هل أنت متأكد من حذف هذا الملف؟
                    </DialogTitle>
                    <DialogDescription className="text-right text-sm">
                        بعد التأكيد لن تتمكن من التراجع عن هذا الإجراء.
                    </DialogDescription>
                </DialogHeader>
                <Button disabled={isPending} onClick={handleDelete}>
                    {isPending ? "انتظر قليلا..." : "احذف"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDoc;
