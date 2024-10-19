'use client';

import { deleteDocument, inviteUser } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, UserPlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

const InviteUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [email, setEmail] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const handleInvite = async (e: FormEvent) => {
       e.preventDefault();
        const roomId = pathname.split("/").pop();
        if(!roomId) return;
        startTransition(async () => {
            const {success} = await inviteUser(roomId, email);
           if(success){
            setIsOpen(false);
           setEmail("");
           toast.success("تم ارسال الدعوة بنجاح");
           }else{
            toaster.error("حدث خطأ أثناء العملية");
           }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="h-full">
                <Button className="h-full">
                    <UserPlus />
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-start font-alex justify-center p-10">
                <DialogHeader>
                    <DialogTitle className="text-right text-2xl font-bold">
                       هل تود مشاركة هذه المدونة مع أحد؟
                    </DialogTitle>
                    <DialogDescription className="text-right text-sm">
                        أدخل البريد الإلكتروني الخاص بمن تريد مشاركته
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-row justify-between items-center w-full mt-10" onSubmit={handleInvite}>
                <Input 
                type="email"
                placeholder="بريد إلكتروني"
                className="w-full rounded-l-none"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <Button type="submit" disabled={!email ||isPending} className="rounded-r-none">
                    {isPending ? "انتظر قليلا..." : "مشاركة"}
                </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InviteUser;
