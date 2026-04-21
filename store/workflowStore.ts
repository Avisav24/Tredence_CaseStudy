import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  type Node,
  type Edge,
  type XYPosition,
  addEdge,
  type Connection,
} from '@xyflow/react';
import {
  type WorkflowNodeData,
  type NodeType,
  type SimulationResult,
  type ValidationResult,
  type WorkflowSnapshot,
  createDefaultNodeData,
} from '@/types/workflow';
import { validateWorkflowGraph } from '@/lib/graphUtils';

interface WorkflowStore {
  // ── Canvas state ─────────────────────────────────────────
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  workflowName: string;

  // ── Canvas actions ───────────────────────────────────────
  setNodes: (nodes: Node<WorkflowNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (type: NodeType, position: XYPosition) => void;
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => void;
  removeNode: (nodeId: string) => void;
  connectNodes: (connection: Connection) => void;
  setSelectedNode: (nodeId: string | null) => void;
  setWorkflowName: (name: string) => void;
  clearCanvas: () => void;
  loadWorkflow: (name: string, nodes: Node<WorkflowNodeData>[], edges: Edge[]) => void;

  // ── Validation ───────────────────────────────────────────
  validationResult: ValidationResult | null;
  runValidation: () => ValidationResult;

  // ── Simulation ───────────────────────────────────────────
  simulationResult: SimulationResult | null;
  isSimulating: boolean;
  setSimulationResult: (result: SimulationResult | null) => void;
  setIsSimulating: (v: boolean) => void;

  // ── Undo / Redo ──────────────────────────────────────────
  undoStack: WorkflowSnapshot[];
  redoStack: WorkflowSnapshot[];
  pushSnapshot: () => void;
  undo: () => void;
  redo: () => void;
}

let nodeIdCounter = 1;
function genId(type: NodeType): string {
  return `${type}_${nodeIdCounter++}`;
}

// ─── Default demo workflow ────────────────────────────────────
const demoNodes: Node<WorkflowNodeData>[] = [
  {
    id: 'start_0',
    type: 'start',
    position: { x: 300, y: 60 },
    data: {
      nodeType: 'start',
      label: 'Start',
      title: 'Employee Onboarding',
      metadata: [{ key: 'department', value: 'Engineering' }],
      status: 'idle',
      validationErrors: [],
    },
  },
  {
    id: 'task_0',
    type: 'task',
    position: { x: 300, y: 220 },
    data: {
      nodeType: 'task',
      label: 'Task',
      title: 'Collect Documents',
      description: 'Gather all required KYC and HR documents from the new hire.',
      assignee: 'HR Team',
      dueDate: '2024-08-01',
      customFields: [],
      status: 'idle',
      validationErrors: [],
    },
  },
  {
    id: 'approval_0',
    type: 'approval',
    position: { x: 300, y: 380 },
    data: {
      nodeType: 'approval',
      label: 'Approval',
      title: 'Manager Approval',
      approverRole: 'Manager',
      autoApproveThreshold: 2,
      status: 'idle',
      validationErrors: [],
    },
  },
  {
    id: 'automated_0',
    type: 'automated',
    position: { x: 300, y: 540 },
    data: {
      nodeType: 'automated',
      label: 'Automated Step',
      title: 'Send Welcome Email',
      actionId: 'send_email',
      actionParams: { to: 'new.hire@company.com', subject: 'Welcome to Tredence!' },
      status: 'idle',
      validationErrors: [],
    },
  },
  {
    id: 'end_0',
    type: 'end',
    position: { x: 300, y: 700 },
    data: {
      nodeType: 'end',
      label: 'End',
      endMessage: 'Onboarding workflow completed successfully.',
      showSummary: true,
      status: 'idle',
      validationErrors: [],
    },
  },
];

const demoEdges: Edge[] = [
  { id: 'e1', source: 'start_0',    target: 'task_0',      animated: false },
  { id: 'e2', source: 'task_0',     target: 'approval_0',  animated: false },
  { id: 'e3', source: 'approval_0', target: 'automated_0', animated: false },
  { id: 'e4', source: 'automated_0', target: 'end_0',      animated: false },
];

export const useWorkflowStore = create<WorkflowStore>()(
  devtools(
    (set, get) => ({
      nodes: demoNodes,
      edges: demoEdges,
      selectedNodeId: null,
      workflowName: 'Employee Onboarding',

      validationResult: null,
      simulationResult: null,
      isSimulating: false,

      undoStack: [],
      redoStack: [],

      // ── Canvas actions ──────────────────────────────────
      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),

      addNode: (type, position) => {
        get().pushSnapshot();
        const id = genId(type);
        const newNode: Node<WorkflowNodeData> = {
          id,
          type,
          position,
          data: createDefaultNodeData(type),
        };
        set(state => ({ nodes: [...state.nodes, newNode] }));
      },

      updateNodeData: (nodeId, partial) => {
        set(state => ({
          nodes: state.nodes.map(n =>
            n.id === nodeId
              ? { ...n, data: { ...n.data, ...partial } as WorkflowNodeData }
              : n
          ),
        }));
      },

      removeNode: (nodeId) => {
        get().pushSnapshot();
        set(state => ({
          nodes: state.nodes.filter(n => n.id !== nodeId),
          edges: state.edges.filter(e => e.source !== nodeId && e.target !== nodeId),
          selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
        }));
      },

      connectNodes: (connection) => {
        get().pushSnapshot();
        set(state => ({
          edges: addEdge(
            { ...connection, animated: false, style: { stroke: '#6366F1', strokeWidth: 2 } },
            state.edges
          ),
        }));
      },

      setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),
      setWorkflowName: (name) => set({ workflowName: name }),

      clearCanvas: () => {
        get().pushSnapshot();
        set({ nodes: [], edges: [], selectedNodeId: null });
      },

      loadWorkflow: (name, nodes, edges) => {
        get().pushSnapshot();
        set({ 
          workflowName: name, 
          nodes: JSON.parse(JSON.stringify(nodes)), 
          edges: JSON.parse(JSON.stringify(edges)),
          selectedNodeId: null,
          validationResult: null,
          simulationResult: null 
        });
      },

      // ── Validation ────────────────────────────────────
      runValidation: () => {
        const { nodes, edges } = get();
        const result = validateWorkflowGraph(nodes, edges);

        // Annotate nodes with their validation errors
        const errorsByNode = new Map<string, string[]>();
        result.errors.forEach(e => {
          if (e.nodeId) {
            const existing = errorsByNode.get(e.nodeId) ?? [];
            errorsByNode.set(e.nodeId, [...existing, e.message]);
          }
        });

        set(state => ({
          validationResult: result,
          nodes: state.nodes.map(n => ({
            ...n,
            data: {
              ...n.data,
              validationErrors: errorsByNode.get(n.id) ?? [],
            },
          })),
        }));

        return result;
      },

      // ── Simulation ───────────────────────────────────
      setSimulationResult: (result) => set({ simulationResult: result }),
      setIsSimulating: (v) => set({ isSimulating: v }),

      // ── Undo / Redo ──────────────────────────────────
      pushSnapshot: () => {
        const { nodes, edges } = get();
        const snapshot: WorkflowSnapshot = {
          nodes: JSON.parse(JSON.stringify(nodes)),
          edges: JSON.parse(JSON.stringify(edges)),
          timestamp: Date.now(),
        };
        set(state => ({
          undoStack: [...state.undoStack.slice(-30), snapshot],
          redoStack: [],
        }));
      },

      undo: () => {
        const { undoStack, nodes, edges } = get();
        if (undoStack.length === 0) return;
        const prev = undoStack[undoStack.length - 1];
        const currentSnapshot: WorkflowSnapshot = {
          nodes: JSON.parse(JSON.stringify(nodes)),
          edges: JSON.parse(JSON.stringify(edges)),
          timestamp: Date.now(),
        };
        set(state => ({
          undoStack: state.undoStack.slice(0, -1),
          redoStack: [...state.redoStack, currentSnapshot],
          nodes: prev.nodes as Node<WorkflowNodeData>[],
          edges: prev.edges as Edge[],
        }));
      },

      redo: () => {
        const { redoStack, nodes, edges } = get();
        if (redoStack.length === 0) return;
        const next = redoStack[redoStack.length - 1];
        const currentSnapshot: WorkflowSnapshot = {
          nodes: JSON.parse(JSON.stringify(nodes)),
          edges: JSON.parse(JSON.stringify(edges)),
          timestamp: Date.now(),
        };
        set(state => ({
          redoStack: state.redoStack.slice(0, -1),
          undoStack: [...state.undoStack, currentSnapshot],
          nodes: next.nodes as Node<WorkflowNodeData>[],
          edges: next.edges as Edge[],
        }));
      },
    }),
    { name: 'FlowHR-Store' }
  )
);
