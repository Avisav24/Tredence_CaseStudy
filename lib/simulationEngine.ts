import { type Node, type Edge } from '@xyflow/react';
import { type WorkflowNodeData, type SimulationResult, type SimulationStep, type NodeType } from '@/types/workflow';
import { topologicalSort } from './graphUtils';

// ─── Per-node mock execution messages ───────────────────────
function getSimulationMessage(node: Node<WorkflowNodeData>): string {
  const data = node.data;
  switch (data.nodeType) {
    case 'start':
      return `✓ Workflow initiated: "${data.title || 'Untitled'}"`;
    case 'task':
      return `✓ Task "${data.title}" assigned to ${data.assignee || 'Unassigned'}${data.dueDate ? ` (due ${data.dueDate})` : ''}`;
    case 'approval': {
      const threshold = data.autoApproveThreshold;
      return `✓ Sent to ${data.approverRole} for approval — auto-approved after ${threshold} day${threshold !== 1 ? 's' : ''}`;
    }
    case 'automated':
      return `✓ Executed action: "${data.actionId || 'Unknown action'}" — completed successfully`;
    case 'end':
      return `✓ ${data.endMessage || 'Workflow completed'}`;
  }
}

// ─── Main simulation engine ──────────────────────────────────
export async function simulateWorkflow(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[],
  onStep?: (step: SimulationStep) => void
): Promise<SimulationResult> {
  const steps: SimulationStep[] = [];

  if (nodes.length === 0) {
    return { success: false, steps: [], errors: ['Workflow has no nodes'], totalDuration: 0 };
  }

  // Get topologically-sorted node IDs
  const order = topologicalSort(nodes, edges);
  if (order.length === 0) {
    return { success: false, steps: [], errors: ['Could not determine execution order — check for cycles'], totalDuration: 0 };
  }

  // Execute each node in order
  for (const nodeId of order) {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) continue;

    const duration = Math.floor(Math.random() * 600) + 200;
    await new Promise(r => setTimeout(r, Math.min(duration, 400))); // cap UI delay

    // Simulate occasional failure on automated steps (10% chance, for demo)
    const shouldFail =
      node.data.nodeType === 'automated' &&
      !node.data.actionId &&
      Math.random() < 0.5;

    const step: SimulationStep = {
      nodeId: node.id,
      nodeType: node.data.nodeType as NodeType,
      label: node.data.label,
      status: shouldFail ? 'error' : 'success',
      message: shouldFail
        ? `✗ Automated step failed: no action selected`
        : getSimulationMessage(node),
      timestamp: new Date().toISOString(),
      duration,
    };

    steps.push(step);
    onStep?.(step);

    if (step.status === 'error') break;
  }

  const hasError = steps.some(s => s.status === 'error');
  return {
    success: !hasError,
    steps,
    errors: steps.filter(s => s.status === 'error').map(s => s.message),
    totalDuration: steps.reduce((acc, s) => acc + s.duration, 0),
  };
}
