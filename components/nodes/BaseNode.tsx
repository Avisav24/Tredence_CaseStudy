'use client';
import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import clsx from 'clsx';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { type WorkflowNodeData, type NodeType } from '@/types/workflow';
import { getNodeTypeColor, getNodeTypeBg } from '@/lib/graphUtils';

interface BaseNodeProps {
  nodeType: NodeType;
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  status?: WorkflowNodeData['status'];
  validationErrors?: string[];
  selected?: boolean;
  hasSource?: boolean;
  hasTarget?: boolean;
}

export function BaseNode({
  nodeType,
  icon,
  label,
  subtitle,
  status = 'idle',
  validationErrors = [],
  selected,
  hasSource = true,
  hasTarget = true,
}: BaseNodeProps) {
  const color = getNodeTypeColor(nodeType);
  const bg = getNodeTypeBg(nodeType);
  const hasErrors = validationErrors.length > 0;

  return (
    <div
      className={clsx(
        'relative rounded-xl border transition-all duration-200 min-w-[180px] max-w-[220px]',
        'backdrop-blur-sm shadow-xl',
        selected
          ? 'border-violet-500/80 shadow-violet-500/20'
          : hasErrors
          ? 'border-rose-500/50 shadow-rose-500/10'
          : 'border-white/10 hover:border-white/20',
      )}
      style={{
        background: selected
          ? `linear-gradient(135deg, ${bg}, rgba(124,58,237,0.08))`
          : `linear-gradient(135deg, ${bg}, rgba(10,15,30,0.9))`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-4 right-4 h-0.5 rounded-full"
        style={{ background: color, opacity: 0.7 }}
      />

      {/* Status indicator */}
      {status !== 'idle' && (
        <div className="absolute -top-1 -right-1">
          {status === 'running' && (
            <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
          )}
          {status === 'success' && (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          )}
          {status === 'error' && (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
        </div>
      )}

      {/* Handles */}
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-3 !h-3 !border-2 !rounded-full"
          style={{ borderColor: color, backgroundColor: '#0A0F1E', top: -6 }}
        />
      )}

      {/* Content */}
      <div className="px-4 py-3 flex items-center gap-3">
        {/* Icon pill */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}22`, color }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color }}>
            {label}
          </p>
          {subtitle && (
            <p className="text-xs text-[#D1D5DB] font-medium truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Validation errors */}
      {hasErrors && (
        <div className="px-4 pb-2 flex items-start gap-1.5">
          <AlertCircle className="w-3 h-3 text-rose-400 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-rose-400 leading-snug">
            {validationErrors[0]}
          </p>
        </div>
      )}

      {hasSource && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-3 !h-3 !border-2 !rounded-full"
          style={{ borderColor: color, backgroundColor: '#0A0F1E', bottom: -6 }}
        />
      )}
    </div>
  );
}
