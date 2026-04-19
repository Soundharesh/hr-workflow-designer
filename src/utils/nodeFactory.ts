import type { XYPosition } from 'reactflow';
import type {
  WorkflowNode,
  WorkflowNodeType,
  StartNodeData,
  TaskNodeData,
  ApprovalNodeData,
  AutomationNodeData,
  EndNodeData,
} from '../types/workflow';

const baseStyle = {
  borderRadius: 14,
  border: '1px solid #d1d5db',
  background: '#ffffff',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
  width: 220,
};

export function getDefaultNodeData(type: WorkflowNodeType) {
  switch (type) {
    case 'start':
      return {
        title: 'Start Workflow',
        metadata: [],
      } satisfies StartNodeData;
    case 'task':
      return {
        title: 'Collect Documents',
        description: '',
        assignee: '',
        dueDate: '',
        customFields: [],
      } satisfies TaskNodeData;
    case 'approval':
      return {
        title: 'Manager Approval',
        approverRole: 'Manager',
        autoApproveThreshold: 0,
      } satisfies ApprovalNodeData;
    case 'automation':
      return {
        title: 'Send Notification',
        actionId: '',
        actionLabel: '',
        actionParams: {},
      } satisfies AutomationNodeData;
    case 'end':
      return {
        endMessage: 'Workflow completed',
        summaryFlag: true,
      } satisfies EndNodeData;
    default:
      return {};
  }
}

export function createNode(type: WorkflowNodeType, position: XYPosition): WorkflowNode {
  return {
    id: `${type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type,
    position,
    data: getDefaultNodeData(type),
    draggable: true,
    deletable: true,
    selectable: true,
    style: baseStyle,
  } as WorkflowNode;
}
