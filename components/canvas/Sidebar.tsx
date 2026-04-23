'use client';
import { Play, CheckSquare, UserCheck, Zap, StopCircle, Workflow } from 'lucide-react';
import { type NodeType } from '@/types/workflow';
import { getNodeTypeColor } from '@/lib/graphUtils';

interface NodeTemplate {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const NODE_TEMPLATES: NodeTemplate[] = [
  {
    type: 'start',
    label: 'Start',
    description: 'Workflow entry point',
    icon: <Play className="w-4 h-4" />,
  },
  {
    type: 'task',
    label: 'Task',
    description: 'Human task or activity',
    icon: <CheckSquare className="w-4 h-4" />,
  },
  {
    type: 'approval',
    label: 'Approval',
    description: 'Manager or HR approval step',
    icon: <UserCheck className="w-4 h-4" />,
  },
  {
    type: 'automated',
    label: 'Automated Step',
    description: 'System-triggered action',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    type: 'end',
    label: 'End',
    description: 'Workflow completion',
    icon: <StopCircle className="w-4 h-4" />,
  },
];

export function Sidebar() {
  const onDragStart = (e: React.DragEvent, type: NodeType) => {
    e.dataTransfer.setData('application/reactflow', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 flex items-center gap-2">
        <Workflow className="w-4 h-4 text-blue-400" />
        <span className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">
          Node Palette
        </span>
      </div>

      {/* Node list */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-4 custom-scrollbar">
        {NODE_TEMPLATES.map(template => {
          const color = getNodeTypeColor(template.type);
          return (
            <div
              key={template.type}
              draggable
              onDragStart={e => onDragStart(e, template.type)}
              className="group flex items-center gap-6 rounded-[2rem] border border-white/[0.03] bg-white/[0.02] p-8 cursor-grab active:cursor-grabbing hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500 select-none relative overflow-hidden"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ backgroundColor: `${color}10`, color, border: `1px solid ${color}20` }}
              >
                {template.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[16px] font-black text-white leading-tight tracking-tight">
                  {template.label}
                </p>
                <p className="text-[12px] text-white/30 truncate mt-2 font-medium">
                  {template.description}
                </p>
              </div>
              
              {/* Subtle accent glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${color}05 0%, transparent 70%)` }}
              />
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="px-5 py-4 border-t border-white/5">
        <p className="text-[10px] text-white/10 font-medium uppercase tracking-widest leading-relaxed text-center">
          Drag to Canvas
        </p>
      </div>
    </div>
  );
}
