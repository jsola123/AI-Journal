'use client'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from "react";

function Navbar() {
const [streakCounter, setStreakCounter] = useState(0);
  return (
    <div className='flex justify-end fixed top-0 w-full px-10 py-2'>
        <div className='flex items-center'>
        <Image
                src="/heart-pulse-svgrepo-com.svg"
                alt="heart streak counter"
                width={50}
                height={50}
              />
        <p className='font-bold'>{streakCounter} Days</p>
        </div>
         
     </div>
  )
}

export default Navbar