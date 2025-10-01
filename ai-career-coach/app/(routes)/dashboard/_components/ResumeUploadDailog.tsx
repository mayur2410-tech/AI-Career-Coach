"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid/dist/esm-node';
import { File, Loader2Icon, Sparkle } from 'lucide-react'
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from "uuid";

const id = uuidv4();
 // e.g. "fdda765f-fc57-5604-a269-52a7df8164ec"

const ResumeUploadDailog = ({openResumeUpload,setOpenResumeDailog}:any) => {
  
    const[file,setFile]= useState<any>()
    const[loading,setLoading]=useState(false)
    const router = useRouter();
    const onFileChange = (e:any) => {
        const file = e.target.files?.[0];
        if(file){
            console.log("file:",file.name)
            setFile(file)
        }
    }

 const onUplaodAndAnalyze = async () => {
  setLoading(true);
  const recordId = id;
  const formData = new FormData();
  formData.append('resumeFile', file);
  formData.append('recordId', recordId);

  try {
    const result = await axios.post('/api/ai-resume-agent', formData);
    console.log("result:", result.data);
    // You can optionally show a toast or notification here
    setOpenResumeDailog(false);
    router.push('/ai-tools/ai-resume-analyzer');
  } catch (err) {
    console.error("Upload failed:", err);
  } finally {
    // ✅ Always runs
    setLoading(false);
   
  }
};

    const onCancel = () => {
        setFile(null)
        // setOpenResumeDailog(false)
    }
  
    return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeDailog}>
  {/* <DialogTrigger>Open</DialogTrigger> */}
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Uplaod Resume PDF File</DialogTitle>
      <DialogDescription>
        <div>
            <label htmlFor='resume-upload' className='flex items-center flex-col justify-center p-7 border border-dashed rounded-xl hover:bg-slate-200 cursor-pointer'> 
                    <File className='h-10 w-10' />
                    {file?
                    <h2 className='mt-3 text-blue-600'>{(file as any).name}</h2>
                    :
                    <h2 className='mt-3'>Click here to uplaod PDF file</h2>
                    }
            </label>
            <input type="file" id='resume-upload' accept='application/pdf' className='hidden' onChange={onFileChange}/>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <Button variant={'outline'} onClick={onCancel}>Cancel</Button>
        <Button onClick={onUplaodAndAnalyze} disabled={!file || loading}>
            { loading? <Loader2Icon className='animate-spin' />
            :<Sparkle /> }
            Upload and Analyze
            </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default ResumeUploadDailog
