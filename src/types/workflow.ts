import type { Edge, Node } from 'reactflow';

export type WorkflowNodeType = 'start' | 'task' | 'approval' | 'automation' | 'end';

export type KVPair = {
  key: string;
  value: string;
};

export type StartNodeData = {
  title: string;
  metadata: KVPair[];
};

export type TaskNodeData = {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: KVPair[];
};

export type ApprovalNodeData = {
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
};

export type AutomationAction = {
  id: string;
  label: string;
  params: string[];
};

export type AutomationNodeData = {
  title: string;
  actionId: string;
  actionLabel: string;
  actionParams: Record<string, string>;
};

export type EndNodeData = {
  endMessage: string;
  summaryFlag: boolean;
};

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomationNodeData
  | EndNodeData;

export type WorkflowNode = Node<WorkflowNodeData> & {
  type: WorkflowNodeType;
};

export type WorkflowEdge = Edge;

export type SimulationStep = {
  nodeId: string;
  title: string;
  type: WorkflowNodeType;
  status: 'completed' | 'warning';
  message: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};
