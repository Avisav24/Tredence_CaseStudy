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
        'relative rounded-2xl border transition-all duration-300 min-w-[240px] max-w-[280px]',
        'backdrop-blur-md shadow-2xl',
        selected
          ? 'border-violet-500 shadow-violet-500/20'
          : hasErrors
          ? 'border-rose-500/50 shadow-rose-500/10'
          : 'border-white/[0.08] hover:border-white/20',
      )}
      style={{
        background: selected
          ? `linear-gradient(135deg, ${bg}, rgba(124,58,237,0.12))`
          : `linear-gradient(135deg, ${bg}, rgba(10,15,30,0.95))`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-6 right-6 h-1 rounded-full"
        style={{ background: color, opacity: 0.8 }}
      />

      {/* Status indicator */}
      {status !== 'idle' && (
        <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-[#030712] border border-white/10">
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
          className="!w-4 !h-4 !border-[3px] !rounded-full transition-all hover:scale-125"
          style={{ borderColor: color, backgroundColor: '#030712', top: -8 }}
        />
      )}

      {/* Content */}
      <div className="px-7 py-6 flex items-center gap-5">
        {/* Icon pill */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-[1rem] flex items-center justify-center border border-white/5"
          style={{ backgroundColor: `${color}15`, color }}
        >
          <div className="w-5 h-5">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-1.5 opacity-60" style={{ color }}>
            {label}
          </p>
          {subtitle && (
            <p className="text-[15px] text-white font-black tracking-tight truncate">
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
