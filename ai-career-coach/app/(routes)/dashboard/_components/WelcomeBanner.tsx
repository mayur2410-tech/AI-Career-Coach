import { Button } from '@/components/ui/button'
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='relative overflow-hidden p-8 md:p-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl'>
      {/* Decorative elements */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
      
      <div className='relative z-10'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-3 bg-white/20 rounded-2xl backdrop-blur-sm'>
            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
            </svg>
          </div>
          <h2 className='font-bold text-3xl md:text-4xl text-white'>Welcome to AI Career Coach!</h2>
        </div>
        
        <p className='text-white/90 text-lg md:text-xl mb-6 max-w-3xl leading-relaxed'>
          Smarter career decisions start here - get tailored advice, real-time market insights, and a personalized roadmap built just for you with the power of AI.
        </p>
        
        <div className='flex flex-wrap gap-4 items-center'>
          <Button variant={'outline'} className='bg-white hover:bg-gray-100 text-blue-600 font-semibold px-6 py-6 rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
            </svg>
            Let&apos;s Get Started
          </Button>
          
          <div className='flex items-center gap-6 text-white/90'>
            <div className='flex items-center gap-2'>
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
              </svg>
              <span className='font-medium'>10K+ Users</span>
            </div>
            <div className='flex items-center gap-2'>
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
              </svg>
              <span className='font-medium'>AI Powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner
