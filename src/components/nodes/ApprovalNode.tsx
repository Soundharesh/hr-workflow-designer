import type { NodeProps } from 'reactflow';
import type { ApprovalNodeData } from '../../types/workflow';
import { NodeCard } from './shared';

export default function ApprovalNode({ data }: NodeProps<ApprovalNodeData>) {
  return (
    <NodeCard title="Approval" subtitle={data.title || 'Approval Step'} colorClass="amber">
      <p className="mini-text">Role: {data.approverRole || 'Approver'}</p>
      <p className="mini-text">Threshold: {data.autoApproveThreshold ?? 0}</p>
    </NodeCard>
  );
}
