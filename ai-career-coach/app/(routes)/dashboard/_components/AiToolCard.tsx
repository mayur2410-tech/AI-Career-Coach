"use client"
import React, { use } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'
import ResumeUploadDailog from './ResumeUploadDailog'
import RoadMapGeneratorAgent from '../../ai-tools/ai-roadmap-agent/page'
import RoadMapGeneratorDialog from './RoadMapGeneratorDialog'
import { useRouter } from 'next/navigation'
interface AiToolCardProps {
  tool: {
    name: string;
    des: string;
    icon: string;
    button: string;
    path: string;
    gradient?: string;
  };
  key: number;
}



const AiToolCard = ({ tool ,key}: AiToolCardProps ) => {

  const router = useRouter()

  const[openResumeUpload, setOpenResumeUpload] = useState(false)
  const[openRoadMapDailog, setOpenRoadMapDailog] = useState(false)
const onClickButton = () => {
 if(tool.name == "AI Resume Analyzer"){
  setOpenResumeUpload(true)
  return
 }
 if(tool.path === "/ai-tools/ai-roadmap-agent"){
  setOpenRoadMapDailog(true)
  return
 }

 router.push(tool.path)

}

  return (
    <div className='group relative p-6 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105'>
      {/* Gradient overlay on hover */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300'></div>
      
      <div className='relative z-10'>
        {/* Icon container with gradient background */}
        <div className={`inline-flex p-4 bg-gradient-to-br ${tool.gradient || 'from-blue-500 to-indigo-500'} rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Image
            src={tool.icon}
            alt={tool.name}
            width={key === 0 ? 60 : 40}
            height={key === 0 ? 60 : 40}
            className='brightness-0 invert'
          />
        </div>
        
        <h2 className='font-bold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
          {tool.name}
        </h2>
        <p className='text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed'>
          {tool.des}
        </p>
      
        <Button 
          className={`mt-2 w-full bg-gradient-to-r ${tool.gradient || 'from-blue-500 to-indigo-500'} hover:shadow-lg transition-all duration-300 border-0 font-semibold rounded-xl py-6`}
          onClick={onClickButton}
        >
          {tool.button}
          <svg className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Button>

        <ResumeUploadDailog openResumeUpload={openResumeUpload} setOpenResumeDailog={setOpenResumeUpload}/>
        <RoadMapGeneratorDialog  openDialog={openRoadMapDailog} setOpenDialog={setOpenRoadMapDailog}/>
      </div>
    </div>
  )
}

export default AiToolCard
