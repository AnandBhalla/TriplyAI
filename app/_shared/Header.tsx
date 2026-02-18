"use client"

import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {

    const {user} = useUser();
  return (
    <div className='flex justify-between items-center p-3 h-25'>
      
      <div><Image src='/Logo.png' alt='logo' width={200} height={50}/></div>
      
      <div>
        {
        !user?
            <SignInButton mode='modal'>
                <Button size={'sm'} className='cursor-pointer'>Get Started</Button>
            </SignInButton>  
        :   <UserButton/>
        }
        </div>
    </div>
  )
}

export default Header
