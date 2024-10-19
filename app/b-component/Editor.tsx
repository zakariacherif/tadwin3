'use client';
import { useRoom, useSelf } from '@liveblocks/react/suspense';
import React, { useEffect, useState } from 'react';
import * as Y from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { locales } from "@blocknote/core";
import stringToColor from '@/lib/stringToColor';

type EditorProps = {
    doc: Y.Doc,
    provider: LiveblocksYjsProvider
};

function BlockNote({ doc, provider }: EditorProps) {
    const userInfo = useSelf((me) => me.info);

    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment("document-store"),
            user: {
                name: userInfo?.name || 'Anonymous',
                color: stringToColor(userInfo?.email) || '#000000',
            }
        },
        dictionary: locales.ar,
    });

    return (
        <div className='relative max-w-6xl mx-auto font-alex'>
            <BlockNoteView 
                editor={editor}
                className='mx-auto h-auto aspect-[1/1.41] py-10 px-4 sm:px-6 lg:px-8 font-alex' // Apply custom class for font
                data-changing-font-demo
            />
        </div>
    );
}

const Editor = () => {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc | null>(null);
    const [provider, setProvider] = useState<LiveblocksYjsProvider | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);

        setDoc(yDoc);
        setProvider(yProvider);
        
        setLoading(false); // Mark loading as complete

        return () => {
            yProvider.destroy();
            yDoc.destroy();
        };
    }, [room]);

    if (loading) return <p>Loading document...</p>; // Loading state
    if (!doc || !provider) return <p>Error: Document or provider not available.</p>; // Error state

    return (
        <div className=' mx-auto h-auto  min-h-[50vh] aspect-[1/1.41] py-10 px-4 sm:px-6 lg:px-8'>
            <BlockNote doc={doc} provider={provider}  />
        </div>
    );
}

export default Editor;
