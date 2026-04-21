import { type AutomationAction, type SimulationResult } from '@/types/workflow';
import { type Node, type Edge } from '@xyflow/react';
import { type WorkflowNodeData } from '@/types/workflow';

// ─── GET /api/automations ────────────────────────────────────
export async function fetchAutomations(): Promise<AutomationAction[]> {
  const res = await fetch('/api/automations');
  if (!res.ok) throw new Error('Failed to fetch automations');
  return res.json();
}

// ─── POST /api/simulate ──────────────────────────────────────
export async function postSimulate(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): Promise<SimulationResult> {
  const res = await fetch('/api/simulate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });
  if (!res.ok) throw new Error('Simulation request failed');
  return res.json();
}

// ─── POST /api/validate ──────────────────────────────────────
export async function postValidate(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
) {
  const res = await fetch('/api/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });
  if (!res.ok) throw new Error('Validation request failed');
  return res.json();
}
