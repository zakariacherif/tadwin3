'use client';

import React, { FormEvent, useEffect, useState, useTransition, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { doc, updateDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import { Save, Loader, BadgeCheck, BadgeX } from 'lucide-react';
import useOwner from '@/lib/useOwner';
import Editor from '../b-component/Editor';
import DeleteDoc from './DeleteDoc';
import InviteUser from './InviteUser';
import ManageUsers from './ManageUsers';
import Avatars from './Avatars';
import TranslateDocument from './TranslateDocument';


const Document = ({ id }: { id: string }) => {
    const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
    const [input, setInput] = useState('');
    const [isUpdating, startTransition] = useTransition();
    const isOwner = useOwner();
    
    useEffect(() => {
        if (data) {
            setInput(data.title);
        }
    }, [data]);

    const updateTitle = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            startTransition(async () => {
                try {
                    await updateDoc(doc(db, 'documents', id), {
                        title: input,
                    });
                } catch (error) {
                    console.error("Failed to update the document title:", error);
                    alert("Error updating title. Please try again.");
                }
            });
        }
    }, [input, id]);

    return (
        <div className='flex-1 aspect-[1/1.41] h-auto bg-white p-4 md:p-5'>
            {/* document name */}
            <div className='h-12 max-w-6xl mx-auto flex justify-between items-center pb-5'>
                {loading ? (
                    <p>انتظر قليلا...</p>
                ) : error ? (
                    <p>حدث خطأ. حاول مرة أخرى.</p>
                ) : (
                    <form onSubmit={updateTitle} className='flex flex-row h-12 gap-2 flex-1 items-center font-alex'>
                        <div className=' flex flex-row h-full'>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            maxLength={20}
                            placeholder="اسم الملف"
                            className='w-full h-full mr-2 text-sm md:text-base rounded-l-none'
                            aria-label="Document Title"
                            style={{ minHeight: '2.5rem' }} // Ensure a minimum height for touch targets
                        />
                        <Button disabled={isUpdating} type='submit' className='h-full min-w-[65px] rounded-r-none'>
                            {isUpdating ? <Loader className="animate-spin" /> : <Save />}
                        </Button>
                        </div>
                        {/*-----------------------------------------------------------------*/}
                        {isOwner ? (
                                <>
                                    {/* Invite user */}
                                    <InviteUser />
                                    {/* Delete document */}
                                    <DeleteDoc />
                                    {/* Ownership message */}
                                    <>
                                        <BadgeCheck color="#000000" height="75px" />
                                        <p className='text-xs text-gray-500'>أنت مالك هذه المدونة</p>
                                    </>
                                </>
                            ) : (
                                <>
                                    {/* Content for non-owners */}
                                    <BadgeX color="#000000" height="75px"/>
                                    <p className='text-xs text-gray-500'>أنت لست مالك هذه المدونة</p>
                                </>
                    )}
                        {/*-----------------------------------------------------------------*/}
                    </form>
                )}
            </div>
            <hr className='pb-10'/>
            {/* Additional sections can be filled here (users, editor, etc.) */}
            {/* manage users */}
            <div className=' flex flex-row h-12 items-center justify-between max-w-6xl ' >
                <ManageUsers  />
                    {/*Translate a  <TranslateDocument doc={doc}/> summary of the document to other languages*/}
                   {/*Speech recognition*/}
                  {/*avatrs*/}
                <Avatars />

            </div>
          
            
             {/* Editor */}
                <Editor />
        </div>
    );
};

export default Document;
