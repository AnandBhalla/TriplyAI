"use client"

import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from "next/navigation";

function Hero() {

  
const router= useRouter();
  return (
    <div className=' mt-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-3'>
        
        <div className="flex justify-center  ">
          <div className="group relative flex items-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f]">
            <span
              className={cn(
                "animate-gradient absolute inset-0 rounded-full bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
              )}
              style={{
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
              }}
            />
            ✈️ <span className="mx-2 h-4 w-px bg-neutral-500" />
            <AnimatedGradientText className="text-s sm:text-sm font-medium  ">
              Introducing TriplyAI
            </AnimatedGradientText>
            <ChevronRight className="ml-1 size-4 stroke-neutral-500" />
          </div>
        </div> 

      <h2 className='text-5xl font-bold text-center'>Every Trip, Perfectly Planned</h2>
      <p className='text-center text-xl text-gray-600 z-10  mt-3'>Hi, I am your <span className='text-primary font-bold'>Triply</span>  Travel Guide, lets plan your first trip</p>
      <Button onClick={()=>router.push('/travel')} className='cursor-pointer animate-bounce'>Start Trip</Button>
      
    </div>
  )
}

export default Hero
