import path from 'path'
import React from 'react'
import AiToolCard from './AiToolCard'

const AiTools = () => {

    const AiToolsList =[
     
        {
            name: "AI Mock Interview",
            des: "Improve your Communication Skill ",
            icon: "/robot.png",
            button: "Mock Interview",
            path:'/ai-tools/ai-mock-interview',
            gradient: "from-cyan-500 to-teal-500"
        },
        {
            name: "AI Resume Analyzer",
            des: "Improve your resume ",
            icon: "/resume.png",
            button: "Analyze Now",
            path:'/ai-tools/ai-resume-analyzer',
            gradient: "from-purple-500 to-pink-500"
        },
        {
            name: "Career Roadmap Generator",
            des: "Build your roadmap",
            icon:'/roadmap.png',
            button: 'Generate Now',
            path:'/ai-tools/ai-roadmap-agent',
            gradient: "from-green-500 to-emerald-500"
        },
        {
            name: "Cover Letter Generator",
            des: "Write a cover letter",
            icon: "/cover.png",
            button: " Create Now",
            path:'/ai-tools/ai-coverletter-agent',
            gradient: "from-orange-500 to-red-500"
        },
           {
            name: " AI Resume Builder",
            des: "Create a professional resume ",
            icon: "/builder.png",
            button: "Build Resume",
            path:'/ai-tools/ai-resume-builder',
            gradient: "from-blue-500 to-indigo-500"
        },
    ]
  return (
    <div className='p-6 md:p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='font-bold text-2xl md:text-3xl text-gray-900 dark:text-white flex items-center gap-3'>
            <span className='p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' />
              </svg>
            </span>
            Available AI Tools
          </h2>
          <p className='text-gray-600 dark:text-gray-300 mt-2'>Start building and shaping your career with these exclusive AI tools</p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6'>
        {AiToolsList.map((tool:any, index)=>(
           <AiToolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  )
}

export default AiTools
