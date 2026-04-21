'use client';
import { type NodeProps } from '@xyflow/react';
import { Play, CheckSquare, UserCheck, Zap, StopCircle } from 'lucide-react';
import { BaseNode } from './BaseNode';
import {
  type StartNodeData,
  type TaskNodeData,
  type ApprovalNodeData,
  type AutomatedStepNodeData,
  type EndNodeData,
} from '@/types/workflow';

export function StartNode({ data, selected }: NodeProps) {
  const d = data as unknown as StartNodeData;
  return (
    <BaseNode
      nodeType="start"
      icon={<Play className="w-4 h-4" />}
      label="Start"
      subtitle={d.title}
      status={d.status}
      validationErrors={d.validationErrors}
      selected={selected}
      hasTarget={false}
    />
  );
}

export function TaskNode({ data, selected }: NodeProps) {
  const d = data as unknown as TaskNodeData;
  return (
    <BaseNode
      nodeType="task"
      icon={<CheckSquare className="w-4 h-4" />}
      label="Task"
      subtitle={d.title}
      status={d.status}
      validationErrors={d.validationErrors}
      selected={selected}
    />
  );
}

export function ApprovalNode({ data, selected }: NodeProps) {
  const d = data as unknown as ApprovalNodeData;
  return (
    <BaseNode
      nodeType="approval"
      icon={<UserCheck className="w-4 h-4" />}
      label="Approval"
      subtitle={d.title}
      status={d.status}
      validationErrors={d.validationErrors}
      selected={selected}
    />
  );
}

export function AutomatedStepNode({ data, selected }: NodeProps) {
  const d = data as unknown as AutomatedStepNodeData;
  return (
    <BaseNode
      nodeType="automated"
      icon={<Zap className="w-4 h-4" />}
      label="Automated"
      subtitle={d.title}
      status={d.status}
      validationErrors={d.validationErrors}
      selected={selected}
    />
  );
}

export function EndNode({ data, selected }: NodeProps) {
  const d = data as unknown as EndNodeData;
  return (
    <BaseNode
      nodeType="end"
      icon={<StopCircle className="w-4 h-4" />}
      label="End"
      subtitle={d.endMessage}
      status={d.status}
      validationErrors={d.validationErrors}
      selected={selected}
      hasSource={false}
    />
  );
}
