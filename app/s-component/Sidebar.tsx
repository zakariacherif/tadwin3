'use client'

import React, { useEffect, useState } from 'react'
import NewDocBtn from './NewDocBtn'
import { useCollection } from 'react-firebase-hooks/firestore'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { collectionGroup, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import SideBarOption from './SideBarOption'

interface RoomDocument {
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
}

const Sidebar = () => {
    const { user, isLoaded } = useUser();  // Ensure the user object is loaded
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: [],
    })

    // Ensure the user and emailAddresses are loaded and defined before making the query
    const [data, loading, error] = useCollection(
        isLoaded && user?.emailAddresses?.[0] && (
            query(collectionGroup(db, 'rooms'), where('userId', '==', user.emailAddresses[0].toString()))
        )
    );

    useEffect(() => {
        if (!data) return;

        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;
                if (roomData.role === 'owner') {
                    acc.owner.push({
                        id: curr.id,
                        ...roomData,
                    });
                } else {
                    acc.editor.push({
                        id: curr.id,
                        ...roomData,
                    });
                }
                return acc;
            }, {
                owner: [],
                editor: [],
            }
        )
        setGroupedData(grouped)
    }, [data])

    if (loading) {
        return <p  className='text-gray-800 m-10 font-alex'>انتظر قليلا...</p>
    }

    if (error) {
        return <p  className='text-gray-800 m-10 font-alex'>خطأ: {error.message}</p>
    }

    const menuOptions = (
        <>
            <div className='text-gray-500 font-semibold font-alex text-lg mt-20 md:mt-5 mb-3'>
                القائمة الرئيسية
            </div>
            <NewDocBtn />

            {/* My docs */}
            {groupedData.owner.length === 0 ? (
                <h2 className='text-gray-500 font-semibold font-alex text-sm mt-5'>لا توجد أي مدونات</h2>
            ) : (
                <>
                    <h2 className='text-gray-500 font-semibold font-alex text-sm mb-3 mt-5'>مدوّناتي</h2>
                    {groupedData.owner.map((doc) => (
                        <SideBarOption key={doc.id} id={doc.id} href={`/docs/${doc.roomId}`} />
                    ))}
                </>
            )}
            
            {/* Shared docs */}
            {groupedData.editor.length > 0 && (
                <>
                    <h2 className='text-gray-500 font-semibold font-alex text-sm mb-3 mt-5'>مدونات مشتركة</h2>
                    {groupedData.editor.map((doc) => (
                        <SideBarOption key={doc.id} id={doc.id} href={`/docs/${doc.roomId}`} />
                    ))}
                </>
            )}
        </>
    );

    return (
        <div className='p-2 md:p-10 relative'>
            <div className='md:hidden'>
                <Sheet>
                    <SheetTrigger>
                        <Menu className='w-12 h-12' />
                    </SheetTrigger>

                    <SheetContent side={"left"} className='w-[80vw] md:w-[25vw]'>
                        <div className='mt-2 flex flex-col items-center'>
                            {menuOptions}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <div className='hidden md:inline'>
                {menuOptions}
            </div>
        </div>
    )
}

export default Sidebar
