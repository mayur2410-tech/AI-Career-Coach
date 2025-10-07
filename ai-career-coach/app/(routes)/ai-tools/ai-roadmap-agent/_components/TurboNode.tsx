import React from 'react'
import Link from 'next/link'
import { Hanalei } from 'next/font/google'
import { Handle, Position } from '@xyflow/react'
function TurboNode({data}: any) {
  return (
    <div className='rounded-lg  border border-gray-300  bg-yellow-100 shadow-md w-64 p-5'>
        <div className='font-bold text-lg text-gray-800'>{data.title}</div>
        <p className='text-sm mt-1 line-clamp-2 text-gray-600'>{data.description}</p>
        <Link href={data.link} target='_blank' className='text-blue-600 underline text-sm mt-2 inline-block'>Learn More</Link>
        <Handle type='target' position={Position.Top} />
        <Handle type='source' position={Position.Bottom} />
    </div>
  )
}

export default TurboNode
