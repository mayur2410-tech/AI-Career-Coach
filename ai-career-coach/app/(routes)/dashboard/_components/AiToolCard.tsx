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
    <div className='p-3 border rounded-lg '>
<Image
      src={tool.icon}
      alt={tool.name}
      width={key === 0 ? 120 : 50}  // bigger only for the first item
      height={key === 0 ? 120 : 50}
    />      <h2 className='font-bold mt-2'>{tool.name}</h2>
      <p className='text-gray-400'>{tool.des}</p>
    
        <Button className='mt-3 w-full'
        onClick={onClickButton}
        >{tool.button}</Button>

        <ResumeUploadDailog openResumeUpload={openResumeUpload} setOpenResumeDailog={setOpenResumeUpload}/>
        <RoadMapGeneratorDialog  openDialog={openRoadMapDailog} setOpenDialog={setOpenRoadMapDailog}/>
      
    </div>
  )
}

export default AiToolCard
