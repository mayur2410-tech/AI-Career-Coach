"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const History = () => {
  const[userHistory, setUserHistory] = useState([])
  return (
    <div className='mt-5 p-5 border rounded-xl'>
      <h2 className='font-bold text-lg'>Previous History</h2>
      <p>What Your previously work on, You can find it here.</p>

      {userHistory.length == 0 && 
           <div className='flex items-center justify-center flex-col mt-6'>
            <Image src={'/idea.png'} alt="bulb" width={50} height={50} className='mx-auto mt-10'/>
            <h2>You do Not have any history</h2>
            <Button className='mt-5'>Explore AI Tools</Button>

           </div>
      }

    </div>
  )
}

export default History
