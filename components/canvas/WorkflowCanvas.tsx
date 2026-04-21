'use client';
import { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeTypes,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useWorkflowStore } from '@/store/workflowStore';
import { type NodeType, type WorkflowNodeData } from '@/types/workflow';
import { getNodeTypeColor } from '@/lib/graphUtils';

import {
  StartNode,
  TaskNode,
  ApprovalNode,
  AutomatedStepNode,
  EndNode,
} from '@/components/nodes/NodeTypes';
import { CanvasToolbar } from './CanvasToolbar';

const nodeTypes: NodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedStepNode,
  end: EndNode,
};

interface WorkflowCanvasProps {
  onSimulate: () => void;
  isSimulating: boolean;
}

export function WorkflowCanvas({ onSimulate, isSimulating }: WorkflowCanvasProps) {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
    connectNodes,
    setSelectedNode,
    pushSnapshot,
  } = useWorkflowStore();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const rf = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes(applyNodeChanges(changes, nodes) as Node<WorkflowNodeData>[]);
    },
    [nodes, setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges, setEdges]
  );

  // Drop handler: convert drag position → canvas position and create node
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type || !reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = rf.screenToFlowPosition({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });

      addNode(type, position);
    },
    [addNode, rf]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const onNodeDragStop = useCallback(() => {
    pushSnapshot();
  }, [pushSnapshot]);

  return (
    <div ref={reactFlowWrapper} className="w-full h-full relative canvas-dots flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={connectNodes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodeDragStop={onNodeDragStop}
        onInit={() => {}}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        deleteKeyCode="Delete"
        multiSelectionKeyCode="Shift"
        defaultEdgeOptions={{
          style: { stroke: '#6366F1', strokeWidth: 2 },
          animated: false,
        }}
        proOptions={{ hideAttribution: true }}
      >
        {/* Using CSS background dots instead of Background component for better performance and style matching */}
        <MiniMap
          style={{
            backgroundColor: '#03071d',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '0.75rem',
          }}
          nodeColor={(n) => {
            const data = n.data as WorkflowNodeData;
            return getNodeTypeColor(data?.nodeType ?? 'task');
          }}
          maskColor="rgba(3,7,29,0.7)"
        />
        

      </ReactFlow>
    </div>
  );
}
