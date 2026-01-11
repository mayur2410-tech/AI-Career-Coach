"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const History = () => {
  const[userHistory, setUserHistory] = useState([])
  return (
    <div className='p-6 md:p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl'>
          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
        </div>
        <div>
          <h2 className='font-bold text-2xl text-gray-900 dark:text-white'>Previous History</h2>
          <p className='text-gray-600 dark:text-gray-300'>What you previously worked on, you can find it here</p>
        </div>
      </div>

      {userHistory.length == 0 && 
           <div className='flex items-center justify-center flex-col py-16 px-4'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-2xl opacity-20'></div>
              <div className='relative p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-full'>
                <Image src={'/idea.png'} alt="bulb" width={80} height={80} className='mx-auto'/>
              </div>
            </div>
            
            <h2 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mt-8'>No History Yet</h2>
            <p className='text-gray-500 dark:text-gray-400 mt-2 text-center max-w-md'>
              Start using our AI tools to build your career. Your activity will appear here.
            </p>
            
            <Button className='mt-6 px-6 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
              Explore AI Tools
            </Button>
           </div>
      }

    </div>
  )
}

export default History
