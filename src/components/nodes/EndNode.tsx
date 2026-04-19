import type { NodeProps } from 'reactflow';
import type { EndNodeData } from '../../types/workflow';
import { NodeCard } from './shared';

export default function EndNode({ data }: NodeProps<EndNodeData>) {
  return (
    <NodeCard title="End" subtitle={data.endMessage || 'Workflow completed'} colorClass="red" disableSource>
      <p className="mini-text">Summary: {data.summaryFlag ? 'Enabled' : 'Disabled'}</p>
    </NodeCard>
  );
}
