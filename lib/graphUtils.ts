import { type Node, type Edge } from '@xyflow/react';
import { type WorkflowNodeData, type ValidationError, type ValidationResult, type NodeType } from '@/types/workflow';

// ─── Topological Sort (Kahn's Algorithm) ────────────────────
export function topologicalSort(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): string[] {
  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();

  nodes.forEach(n => {
    inDegree.set(n.id, 0);
    adj.set(n.id, []);
  });

  edges.forEach(e => {
    adj.get(e.source)?.push(e.target);
    inDegree.set(e.target, (inDegree.get(e.target) ?? 0) + 1);
  });

  const queue: string[] = [];
  inDegree.forEach((deg, id) => {
    if (deg === 0) queue.push(id);
  });

  const result: string[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    adj.get(node)?.forEach(neighbor => {
      const newDeg = (inDegree.get(neighbor) ?? 1) - 1;
      inDegree.set(neighbor, newDeg);
      if (newDeg === 0) queue.push(neighbor);
    });
  }

  return result;
}

// ─── Cycle Detection (DFS) ───────────────────────────────────
export function hasCycle(nodes: Node[], edges: Edge[]): boolean {
  const adj = new Map<string, string[]>();
  nodes.forEach(n => adj.set(n.id, []));
  edges.forEach(e => adj.get(e.source)?.push(e.target));

  const visited = new Set<string>();
  const inStack = new Set<string>();

  function dfs(nodeId: string): boolean {
    visited.add(nodeId);
    inStack.add(nodeId);
    for (const neighbor of adj.get(nodeId) ?? []) {
      if (!visited.has(neighbor) && dfs(neighbor)) return true;
      if (inStack.has(neighbor)) return true;
    }
    inStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id) && dfs(node.id)) return true;
  }
  return false;
}

// ─── Node Field Validation ───────────────────────────────────
function validateNodeFields(node: Node<WorkflowNodeData>): ValidationError[] {
  const errors: ValidationError[] = [];
  const data = node.data;

  if (data.nodeType === 'task') {
    if (!data.title?.trim()) {
      errors.push({ type: 'missing_field', nodeId: node.id, message: `Task node requires a title` });
    }
    if (!data.assignee?.trim()) {
      errors.push({ type: 'missing_field', nodeId: node.id, message: `Task node requires an assignee` });
    }
  }

  if (data.nodeType === 'approval') {
    if (!data.title?.trim()) {
      errors.push({ type: 'missing_field', nodeId: node.id, message: `Approval node requires a title` });
    }
  }

  if (data.nodeType === 'automated') {
    if (!data.actionId) {
      errors.push({ type: 'missing_field', nodeId: node.id, message: `Automated step requires an action` });
    }
  }

  return errors;
}

// ─── Full Graph Validation ───────────────────────────────────
export function validateWorkflowGraph(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): ValidationResult {
  const errors: ValidationError[] = [];

  const startNodes = nodes.filter(n => n.data.nodeType === 'start');
  if (startNodes.length === 0)
    errors.push({ type: 'missing_start', message: 'Workflow must have a Start node' });
  if (startNodes.length > 1)
    errors.push({ type: 'multiple_start', message: 'Only one Start node is allowed' });

  const endNodes = nodes.filter(n => n.data.nodeType === 'end');
  if (endNodes.length === 0)
    errors.push({ type: 'missing_end', message: 'Workflow must have at least one End node' });

  nodes.forEach(node => {
    if (node.data.nodeType === 'start') return;
    const hasIncoming = edges.some(e => e.target === node.id);
    if (!hasIncoming) {
      errors.push({
        type: 'orphan_node',
        nodeId: node.id,
        message: `Node "${node.data.label}" has no incoming connection`,
      });
    }
  });

  if (hasCycle(nodes, edges)) {
    errors.push({ type: 'cycle', message: 'Workflow contains a cycle — loops are not allowed' });
  }

  nodes.forEach(node => {
    errors.push(...validateNodeFields(node));
  });

  return { valid: errors.length === 0, errors };
}

// ─── Get node type color ─────────────────────────────────────
export function getNodeTypeColor(type: NodeType): string {
  const colors: Record<NodeType, string> = {
    start: '#10B981',
    task: '#6366F1',
    approval: '#F59E0B',
    automated: '#06B6D4',
    end: '#F43F5E',
  };
  return colors[type] ?? '#6B7280';
}

export function getNodeTypeBg(type: NodeType): string {
  const colors: Record<NodeType, string> = {
    start: 'rgba(16,185,129,0.12)',
    task: 'rgba(99,102,241,0.12)',
    approval: 'rgba(245,158,11,0.12)',
    automated: 'rgba(6,182,212,0.12)',
    end: 'rgba(244,63,94,0.12)',
  };
  return colors[type] ?? 'rgba(107,114,128,0.12)';
}
