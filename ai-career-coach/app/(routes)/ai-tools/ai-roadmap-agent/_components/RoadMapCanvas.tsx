import React from 'react'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Controls, MiniMap, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TurboNode from './TurboNode';

const nodeTypes={
    turbo:TurboNode,
     input: TurboNode,
  output: TurboNode         
}

function RoadMapCanvas({initialNodes, initialEdges}: any) {
//     const initialNodes = [
//   { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
//   { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
// ];
// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        >
            <Controls />
            <MiniMap />
            {/* @ts-ignore */}
            <Background variant='dots' gap={12} size={1} />
        </ReactFlow>
    </div>
  )
}

export default RoadMapCanvas
