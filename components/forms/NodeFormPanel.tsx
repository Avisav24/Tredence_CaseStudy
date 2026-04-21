'use client';
import { X, AlertCircle, Edit3 } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import { StartNodeForm } from './StartNodeForm';
import { TaskNodeForm } from './TaskNodeForm';
import { ApprovalNodeForm } from './ApprovalNodeForm';
import { AutomatedStepNodeForm } from './AutomatedStepNodeForm';
import { EndNodeForm } from './EndNodeForm';
import { Button } from '@/components/ui/Inputs';
import {
  type WorkflowNodeData,
  type StartNodeData,
  type TaskNodeData,
  type ApprovalNodeData,
  type AutomatedStepNodeData,
  type EndNodeData,
} from '@/types/workflow';
import { getNodeTypeColor } from '@/lib/graphUtils';
import { Play, CheckSquare, UserCheck, Zap, StopCircle } from 'lucide-react';

const NODE_ICONS: Record<string, React.ReactNode> = {
  start: <Play className="w-4 h-4" />,
  task: <CheckSquare className="w-4 h-4" />,
  approval: <UserCheck className="w-4 h-4" />,
  automated: <Zap className="w-4 h-4" />,
  end: <StopCircle className="w-4 h-4" />,
};

const NODE_LABELS: Record<string, string> = {
  start: 'Start',
  task: 'Task',
  approval: 'Approval',
  automated: 'Automated Step',
  end: 'End',
};

export function NodeFormPanel() {
  const { nodes, selectedNodeId, setSelectedNode, updateNodeData, removeNode } = useWorkflowStore();

  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const isOpen = !!selectedNode;

  if (!isOpen) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-4 p-8 bg-transparent">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-white/20" />
        </div>
        <p className="text-sm text-white/30 text-center leading-relaxed">
          Select a node to configure its properties
        </p>
      </div>
    );
  }

  const data = selectedNode.data as WorkflowNodeData;
  const nodeType = data.nodeType;
  const color = getNodeTypeColor(nodeType);

  const handleChange = (partial: Partial<WorkflowNodeData>) => {
    updateNodeData(selectedNode.id, partial);
  };

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {/* Header */}
      <div 
        className="px-6 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]"
        style={{ borderTop: `2px solid ${color}` }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
            {NODE_ICONS[nodeType]}
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color }}>
              {NODE_LABELS[nodeType]}
            </p>
            <p className="text-[10px] text-white/30 font-mono mt-0.5">{selectedNode.id}</p>
          </div>
        </div>
        <button
          onClick={() => setSelectedNode(null)}
          className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
        {nodeType === 'start' && (
          <StartNodeForm
            data={data as StartNodeData}
            onChange={p => handleChange(p as Partial<WorkflowNodeData>)}
          />
        )}
        {nodeType === 'task' && (
          <TaskNodeForm
            data={data as TaskNodeData}
            onChange={p => handleChange(p as Partial<WorkflowNodeData>)}
          />
        )}
        {nodeType === 'approval' && (
          <ApprovalNodeForm
            data={data as ApprovalNodeData}
            onChange={p => handleChange(p as Partial<WorkflowNodeData>)}
          />
        )}
        {nodeType === 'automated' && (
          <AutomatedStepNodeForm
            data={data as AutomatedStepNodeData}
            onChange={p => handleChange(p as Partial<WorkflowNodeData>)}
          />
        )}
        {nodeType === 'end' && (
          <EndNodeForm
            data={data as EndNodeData}
            onChange={p => handleChange(p as Partial<WorkflowNodeData>)}
          />
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/5">
        <Button
          variant="danger"
          size="sm"
          className="w-full justify-center"
          onClick={() => removeNode(selectedNode.id)}
        >
          Delete Node
        </Button>
      </div>
    </div>
  );
}
