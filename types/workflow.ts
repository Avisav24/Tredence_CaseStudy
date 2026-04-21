// ============================================================
// FlowHR — Core Type System
// All workflow node data uses discriminated unions for
// complete type safety without runtime casting.
// ============================================================

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export type NodeStatus = 'idle' | 'running' | 'success' | 'error' | 'skipped';

// ─── Base ────────────────────────────────────────────────────
export interface BaseNodeData extends Record<string, unknown> {
  label: string;
  status?: NodeStatus;
  validationErrors?: string[];
}

// ─── Start Node ──────────────────────────────────────────────
export interface StartNodeData extends BaseNodeData {
  nodeType: 'start';
  title: string;
  metadata: Array<{ key: string; value: string }>;
}

// ─── Task Node ───────────────────────────────────────────────
export interface TaskNodeData extends BaseNodeData {
  nodeType: 'task';
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: Array<{ key: string; value: string }>;
}

// ─── Approval Node ───────────────────────────────────────────
export type ApproverRole = 'Manager' | 'HRBP' | 'Director' | 'CEO';

export interface ApprovalNodeData extends BaseNodeData {
  nodeType: 'approval';
  title: string;
  approverRole: ApproverRole;
  autoApproveThreshold: number;
}

// ─── Automated Step Node ─────────────────────────────────────
export interface AutomatedStepNodeData extends BaseNodeData {
  nodeType: 'automated';
  title: string;
  actionId: string;
  actionParams: Record<string, string>;
}

// ─── End Node ────────────────────────────────────────────────
export interface EndNodeData extends BaseNodeData {
  nodeType: 'end';
  endMessage: string;
  showSummary: boolean;
}

// ─── Union ───────────────────────────────────────────────────
export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData;

// ─── Automation Actions (from mock API) ──────────────────────
export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

// ─── Simulation ──────────────────────────────────────────────
export interface SimulationStep {
  nodeId: string;
  nodeType: NodeType;
  label: string;
  status: 'success' | 'error' | 'skipped';
  message: string;
  timestamp: string;
  duration: number;
}

export interface SimulationResult {
  success: boolean;
  steps: SimulationStep[];
  errors: string[];
  totalDuration: number;
}

// ─── Validation ──────────────────────────────────────────────
export interface ValidationError {
  type:
    | 'missing_start'
    | 'multiple_start'
    | 'missing_end'
    | 'orphan_node'
    | 'cycle'
    | 'missing_field'
    | 'unreachable_node';
  nodeId?: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

// ─── Workflow Snapshot (for undo/redo) ───────────────────────
export interface WorkflowSnapshot {
  nodes: unknown[];
  edges: unknown[];
  timestamp: number;
}

// ─── Default factory helpers ─────────────────────────────────
export function createDefaultNodeData(type: NodeType): WorkflowNodeData {
  switch (type) {
    case 'start':
      return {
        nodeType: 'start',
        label: 'Start',
        title: 'Workflow Start',
        metadata: [],
        status: 'idle',
        validationErrors: [],
      };
    case 'task':
      return {
        nodeType: 'task',
        label: 'Task',
        title: 'New Task',
        description: '',
        assignee: '',
        dueDate: '',
        customFields: [],
        status: 'idle',
        validationErrors: [],
      };
    case 'approval':
      return {
        nodeType: 'approval',
        label: 'Approval',
        title: 'Approval Step',
        approverRole: 'Manager',
        autoApproveThreshold: 3,
        status: 'idle',
        validationErrors: [],
      };
    case 'automated':
      return {
        nodeType: 'automated',
        label: 'Automated Step',
        title: 'Automated Action',
        actionId: '',
        actionParams: {},
        status: 'idle',
        validationErrors: [],
      };
    case 'end':
      return {
        nodeType: 'end',
        label: 'End',
        endMessage: 'Workflow completed successfully.',
        showSummary: true,
        status: 'idle',
        validationErrors: [],
      };
  }
}
