'use client'

import { db } from '@/firebase'
import { doc } from 'firebase/firestore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import clsx from 'clsx'

// Define the expected structure of the document data
interface DocumentData {
  title: string;
}

const SideBarOption = ({ href, id }: { href: string, id: string }) => {
  // Fetch the document data using the provided id
  const [data, loading, error] = useDocumentData<DocumentData>(doc(db, 'documents', id))
  
  // Get the current pathname to highlight the active link
  const pathname = usePathname();
  const isActive = pathname === href;

  // Loading state
  if (loading) return <p className='text-gray-800 m-10 font-alex'>انتظر قليلا ...</p>;

  // Error state
  if (error) return <p className='text-gray-800 m-10 font-alex'>حدث خطأ ما. حاول مرة اخرى.</p>;

  // No data
  if (!data) return null;

  return (
    <Link 
      href={href} 
      className={clsx(
        'relative w-[80%] md:w-[100%] text-center md:text-start block py-2 my-3 px-4 rounded-md text-gray-800',
        isActive ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'
      )}
      aria-label={`Navigate to ${data.title}`}
    >
      {/* Document title */}
      <p className='truncate font-alex'>{data.title}</p>
    </Link>
  )
}

export default SideBarOption
