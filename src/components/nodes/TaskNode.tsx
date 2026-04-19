import type { NodeProps } from 'reactflow';
import type { TaskNodeData } from '../../types/workflow';
import { NodeCard } from './shared';

export default function TaskNode({ data }: NodeProps<TaskNodeData>) {
  return (
    <NodeCard title="Task" subtitle={data.title || 'Human Task'} colorClass="blue">
      <p className="mini-text">Assignee: {data.assignee || 'Unassigned'}</p>
      <p className="mini-text">Due: {data.dueDate || 'Not set'}</p>
    </NodeCard>
  );
}
