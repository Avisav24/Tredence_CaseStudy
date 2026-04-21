import { type Node, type Edge } from '@xyflow/react';
import { type WorkflowNodeData } from '@/types/workflow';

export interface WorkflowExport {
  version: '1.0';
  name: string;
  exportedAt: string;
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
}

export function exportWorkflow(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[],
  name = 'My Workflow'
): string {
  const payload: WorkflowExport = {
    version: '1.0',
    name,
    exportedAt: new Date().toISOString(),
    nodes,
    edges,
  };
  return JSON.stringify(payload, null, 2);
}

export function downloadWorkflow(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[],
  name = 'workflow'
): void {
  const json = exportWorkflow(nodes, edges, name);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importWorkflow(json: string): WorkflowExport | null {
  try {
    const parsed = JSON.parse(json) as WorkflowExport;
    if (!parsed.version || !parsed.nodes || !parsed.edges) return null;
    return parsed;
  } catch {
    return null;
  }
}
