import type { NodeProps } from 'reactflow';
import type { AutomationNodeData } from '../../types/workflow';
import { NodeCard } from './shared';

export default function AutomationNode({ data }: NodeProps<AutomationNodeData>) {
  return (
    <NodeCard title="Automation" subtitle={data.title || 'Automated Step'} colorClass="purple">
      <p className="mini-text">Action: {data.actionLabel || 'Select action'}</p>
      <p className="mini-text">Params: {Object.keys(data.actionParams).length}</p>
    </NodeCard>
  );
}
