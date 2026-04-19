import type { NodeProps } from 'reactflow';
import type { StartNodeData } from '../../types/workflow';
import { NodeCard } from './shared';

export default function StartNode({ data }: NodeProps<StartNodeData>) {
  return (
    <NodeCard title="Start" subtitle={data.title || 'Start Workflow'} colorClass="green" disableTarget>
      <p className="mini-text">Metadata pairs: {data.metadata.length}</p>
    </NodeCard>
  );
}
