import { useCallback, useMemo, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useReactFlow,
  type Connection,
  type Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowStore } from '../store/workflowStore';
import { createNode } from '../utils/nodeFactory';
import type { WorkflowNodeType } from '../types/workflow';
import { nodeTypes } from './nodeTypes';

function CanvasInner() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { project } = useReactFlow();
  const { nodes, edges, onNodesChange, onEdgesChange, setEdges, addNode, selectNode } = useWorkflowStore();

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((existing) =>
        addEdge(
          {
            ...connection,
            animated: false,
            type: 'smoothstep',
          },
          existing
        )
      );
    },
    [setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow') as WorkflowNodeType;
      if (!type || !wrapperRef.current) return;

      const bounds = wrapperRef.current.getBoundingClientRect();
      const position = project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      addNode(createNode(type, position));
    },
    [addNode, project]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={wrapperRef} className="canvas-wrapper" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_: React.MouseEvent, node: Node) => selectNode(node.id)}
        onPaneClick={() => selectNode(null)}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap zoomable pannable />
        <Controls />
        <Background gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}

export default function WorkflowCanvas() {
  useMemo(() => nodeTypes, []);
  return <CanvasInner />;
}
