"use client"
import React from 'react'
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import RoadMapCanvas from './_components/RoadMapCanvas';
      const RoadMapGeneratorAgent = () => {
const [latestRoadMap, setLatestRoadMap] = useState<any>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
    useEffect(() => {
    const fetchLatestRoadMap = async () => {
      try {
        const response = await axios.get("/api/roadmap/latest");
        setLatestRoadMap(response.data[0]); 
        console.log("data:", response.data[0].roadMapData)
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch latest road map");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRoadMap();
  }, []);

   if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 '>
      <div className='border rounded-xl p-5'>
          <h2 className='font-bold text-2xl'>{latestRoadMap?.roadMapData?.roadmapTitle}</h2>
          <p className='mt-3 text-gray-500'><strong>Description:</strong><br></br> {latestRoadMap?.roadMapData?.description}</p>
          <h2 className='mt-5 font-medium text-blue-600'>Duration: {latestRoadMap?.roadMapData?.duration}</h2>
          <Button className='mt-5 w-full'>+ Create Another Roadmap</Button>
      </div>
      <div className='md:col-span-2 w-full h-[40vh]'>
        <RoadMapCanvas initialNodes={latestRoadMap?.roadMapData?.initialNodes}  initialEdges={latestRoadMap?.roadMapData?.initialEdges} />
      </div>
      
    </div>
  )
}

export default RoadMapGeneratorAgent



// "use client"

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const RoadMapGeneratorAgent = () => {
//   const [latestRoadMap, setLatestRoadMap] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchLatestRoadMap = async () => {
//       try {
//         const response = await axios.get("/api/roadmap/latest");
//         setLatestRoadMap(response.data[0]);
//       } catch (err: any) {
//         console.error(err);
//         setError("Failed to fetch latest road map");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLatestRoadMap();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const nodes = latestRoadMap?.roadMapData?.initialNodes || [];

//   return (
//     <div className="p-5">
//       {/* Roadmap Title and Description */}
//       <div className="mb-8">
//         <h2 className="font-bold text-3xl">{latestRoadMap?.roadMapData?.roadmapTitle}</h2>
//         <p className="mt-2 text-gray-600">{latestRoadMap?.roadMapData?.description}</p>
//         <p className="mt-1 text-gray-500"><strong>Duration:</strong> {latestRoadMap?.roadMapData?.duration}</p>
//       </div>

//       {/* Nodes */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {nodes.map((node: any) => (
//           <div
//             key={node.id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
//           >
//             <h3 className="font-semibold text-xl">{node.data.title}</h3>
//             <p className="text-gray-600 mt-2">{node.data.description}</p>
//             <a
//               href={node.data.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-3 inline-block text-blue-600 hover:underline"
//             >
//               Watch on YouTube
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RoadMapGeneratorAgent;
