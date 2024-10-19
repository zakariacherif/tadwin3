'use client'
import Document from '@/app/s-component/Document'
import React from 'react'
const DocumentPage = ({params: {id} }:{
    params: {
        id: string
    }
}) => {   
  return (
    <div className='flex flex-col flex-1 min-h-[90vh]'>
    <Document id={id} />  
    </div>
  )
}

export default DocumentPage