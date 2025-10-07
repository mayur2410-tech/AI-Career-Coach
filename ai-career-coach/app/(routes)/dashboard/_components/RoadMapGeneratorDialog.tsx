"use client"
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, SparkleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RoadMapGeneratorDialog = ({openDialog,setOpenDialog}:any) => {

  const[userInput,setUserInput] = useState<string>();
  const[loading,setLoading] = useState(false);
  const router = useRouter()

const generateRoadmap = async()=>{ 
  try{
    setLoading(true);
    console.log("userInput",userInput)
    const response = await axios.post('/api/ai-roadmap-agent',{
      userInput:userInput
    })

    console.log("response:",response.data); 
    router.push("/ai-tools/ai-roadmap-agent")

  }catch(e){
    console.log(e);
  }finally{
    setLoading(false);
  }
    
}


  return (
   <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  {/* <DialogTrigger>Open</DialogTrigger> */}
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Enter Position/Skills to Generate Roadmap</DialogTitle>
      <DialogDescription asChild>
        <div className='mt-2'>
            <Input placeholder='e.g Full Stack Developer'
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            />
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant={'outline'}>Cancel</Button>
      <Button onClick={generateRoadmap} disabled={loading|| !userInput}> {loading?<Loader2  className='animate-spin'/>:<SparkleIcon />}Generate</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default RoadMapGeneratorDialog
