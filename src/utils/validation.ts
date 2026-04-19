import type { Edge } from 'reactflow';
import type { ValidationResult, WorkflowNode } from '../types/workflow';

export function validateWorkflow(nodes: WorkflowNode[], edges: Edge[]): ValidationResult {
  const errors: string[] = [];

  const startNodes = nodes.filter((n) => n.type === 'start');
  const endNodes = nodes.filter((n) => n.type === 'end');

  if (startNodes.length !== 1) {
    errors.push('Workflow must contain exactly one Start node.');
  }

  if (endNodes.length < 1) {
    errors.push('Workflow must contain at least one End node.');
  }

  for (const node of nodes) {
    if (node.type !== 'start') {
      const incoming = edges.some((e) => e.target === node.id);
      if (!incoming) errors.push(`${labelFor(node)} has no incoming connection.`);
    }

    if (node.type !== 'end') {
      const outgoing = edges.some((e) => e.source === node.id);
      if (!outgoing) errors.push(`${labelFor(node)} has no outgoing connection.`);
    }
  }

  const cycleDetected = hasCycle(nodes, edges);
  if (cycleDetected) {
    errors.push('Workflow contains a cycle. Simulation supports only acyclic flows.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

function labelFor(node: WorkflowNode) {
  const title = (node.data as Record<string, unknown>).title;
  const endMessage = (node.data as Record<string, unknown>).endMessage;
  return String(title || endMessage || `${node.type} node`);
}

function hasCycle(nodes: WorkflowNode[], edges: Edge[]) {
  const graph = new Map<string, string[]>();
  nodes.forEach((node) => graph.set(node.id, []));
  edges.forEach((edge) => {
    graph.get(edge.source)?.push(edge.target);
  });

  const visiting = new Set<string>();
  const visited = new Set<string>();

  function dfs(nodeId: string): boolean {
    if (visiting.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visiting.add(nodeId);
    for (const next of graph.get(nodeId) ?? []) {
      if (dfs(next)) return true;
    }
    visiting.delete(nodeId);
    visited.add(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (dfs(node.id)) return true;
  }
  return false;
}
