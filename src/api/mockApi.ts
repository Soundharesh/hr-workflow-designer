import type { Edge } from 'reactflow';
import type { AutomationAction, SimulationStep, WorkflowNode } from '../types/workflow';
import { validateWorkflow } from '../utils/validation';

const automations: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'notify_slack', label: 'Notify Slack', params: ['channel', 'message'] },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAutomations(): Promise<AutomationAction[]> {
  await delay(300);
  return automations;
}

export async function simulateWorkflow(payload: {
  nodes: WorkflowNode[];
  edges: Edge[];
}): Promise<{ steps: SimulationStep[]; validationErrors: string[] }> {
  await delay(600);

  const validation = validateWorkflow(payload.nodes, payload.edges);
  if (!validation.isValid) {
    return { steps: [], validationErrors: validation.errors };
  }

  const ordered = topologicalSort(payload.nodes, payload.edges);
  const steps: SimulationStep[] = ordered.map((node) => {
    const data = node.data as Record<string, unknown>;
    const title = String(data.title || data.endMessage || node.type);
    return {
      nodeId: node.id,
      title,
      type: node.type,
      status: 'completed',
      message: buildMessage(node),
    };
  });

  return { steps, validationErrors: [] };
}

function buildMessage(node: WorkflowNode): string {
  const data = node.data as Record<string, unknown>;

  switch (node.type) {
    case 'start':
      return `Workflow entered at \"${String(data.title || 'Start')}\".`;
    case 'task':
      return `Task assigned to ${String(data.assignee || 'Unassigned')}.`;
    case 'approval':
      return `Approval routed to ${String(data.approverRole || 'Approver')}.`;
    case 'automation':
      return `Automation ${String(data.actionLabel || 'Unknown Action')} executed.`;
    case 'end':
      return `Workflow finished with message: ${String(data.endMessage || 'Completed')}.`;
    default:
      return 'Step executed.';
  }
}

function topologicalSort(nodes: WorkflowNode[], edges: Edge[]): WorkflowNode[] {
  const incomingCount = new Map<string, number>();
  const outgoingMap = new Map<string, string[]>();
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  nodes.forEach((node) => {
    incomingCount.set(node.id, 0);
    outgoingMap.set(node.id, []);
  });

  edges.forEach((edge) => {
    incomingCount.set(edge.target, (incomingCount.get(edge.target) ?? 0) + 1);
    outgoingMap.get(edge.source)?.push(edge.target);
  });

  const queue: string[] = [];
  incomingCount.forEach((count, id) => {
    if (count === 0) queue.push(id);
  });

  const ordered: WorkflowNode[] = [];
  while (queue.length) {
    const current = queue.shift()!;
    const node = nodeMap.get(current);
    if (node) ordered.push(node);

    for (const next of outgoingMap.get(current) ?? []) {
      const updated = (incomingCount.get(next) ?? 1) - 1;
      incomingCount.set(next, updated);
      if (updated === 0) queue.push(next);
    }
  }

  return ordered;
}
