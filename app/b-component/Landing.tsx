import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
const Landing = () => {
  return (
    <>
    <SignedOut>
       
    <div className='w-[100vw] h-[100vh] flex flex-col gap-8 justify-center items-center'>
        <h1 className='text-5xl font-bold font-alex'>مرحبا بكم في تدوين</h1>
        <p className='text-2xl font-alex mt-2'>أول برنامج عربي لتسهيل الكتابة</p>
        <Button className='font-alex'>
        <SignInButton>ابدأ التدوين الآن!!!</SignInButton>
    </Button>
    </div>
    </SignedOut>
    <SignedIn>
    <div className='w-[100vw] h-[100vh] flex flex-col gap-8 justify-center items-center'>
        <h1 className='text-5xl font-bold font-alex'>مرحبا بكم في تدوين</h1>
        <p className='text-2xl font-alex mt-2'>أول برنامج عربي لتسهيل الكتابة</p>
        <Button className='font-alex'>
        <Link href='/'>أدخل إلى حسابك</Link>
    </Button>
    </div>
    </SignedIn>
    </>
  )
}

export default Landing