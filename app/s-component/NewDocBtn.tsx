'use client'
import { createNewDoc } from '@/actions/actions'
import { Button } from '@/components/ui/button'
import { FilePlus2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTransition } from 'react'
const NewDocBtn = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleNewDoc = () => {
        startTransition(async () => {
            const {docId} = await createNewDoc();
            router.push(`/doc/${docId}`);
        })
    }
  return (
    <Button className="font-alex  mb-5 p-6" onClick={handleNewDoc} disabled={isPending}>
        {isPending? 'انتظر قليلا...' : 'تدوينة جديدة'}
         <FilePlus2 className="mr-3" />     
    </Button>
  )
}

export default NewDocBtn