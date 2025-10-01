import path from 'path'
import React from 'react'
import AiToolCard from './AiToolCard'

const AiTools = () => {

    const AiToolsList =[
        {
            name: " AI Resume Builder",
            des: "Create a professional resume ",
            icon: "/builder.png",
            button: "Build Resume",
            path:'/#'
        },
        {
            name: "AI Resume Analyzer",
            des: "Improve your resume ",
            icon: "/resume.png",
            button: "Analyze Now",
            path:'/ai-resume-analyzer'
        },
        {
            name: "Career Roadmap Generator",
            des: "Build your roadmap",
            icon:'/roadmap.png',
            button: 'Generate Now',
            path:'/career-roadmap-generator'
        },
        {
            name: "Cover Letter Generator",
            des: "Write a cover letter",
            icon: "/cover.png",
            button: " Create Now",
            path:'/cover-letter-generator'
        },
    ]
  return (
    <div className='mt-7 p-5 bg-white rounded-xl shadow-md border'>
      <h2 className='font-bold text-lg'> Available AI Tools</h2>
      <p>Start Building and Shaping Your Career with this exclusive AI Tools</p>

      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
        {AiToolsList.map((tool:any, index)=>(
           <AiToolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  )
}

export default AiTools
