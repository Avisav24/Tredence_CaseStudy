'use client';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Trash2,
  Undo2,
  Redo2,
  Download,
  Upload,
} from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import { useWorkflowStore } from '@/store/workflowStore';
import { downloadWorkflow, importWorkflow } from '@/lib/workflowSerializer';
import { useRef } from 'react';
import clsx from 'clsx';

export function CanvasToolbar() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { nodes, edges, clearCanvas, undo, redo, undoStack, redoStack, setNodes, setEdges, workflowName } = useWorkflowStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canUndo = undoStack.length > 0;
  const canRedo = redoStack.length > 0;

  const handleExport = () => {
    downloadWorkflow(nodes, edges, workflowName);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = importWorkflow(ev.target?.result as string);
      if (result) {
        setNodes(result.nodes);
        setEdges(result.edges);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="flex items-center gap-1 px-1">
      {/* Undo / Redo */}
      <ToolbarButton onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">
        <Undo2 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)">
        <Redo2 className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      {/* Zoom */}
      <ToolbarButton onClick={() => zoomOut()} title="Zoom Out">
        <ZoomOut className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => zoomIn()} title="Zoom In">
        <ZoomIn className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => fitView({ padding: 0.15, duration: 400 })} title="Fit View">
        <Maximize2 className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      {/* Export / Import */}
      <ToolbarButton onClick={handleExport} title="Export JSON">
        <Download className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => fileInputRef.current?.click()} title="Import JSON">
        <Upload className="w-4 h-4" />
      </ToolbarButton>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImport}
      />

      <Divider />

      {/* Clear */}
      <ToolbarButton onClick={clearCanvas} title="Clear Canvas" variant="danger">
        <Trash2 className="w-4 h-4" />
      </ToolbarButton>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-white/10 mx-1" />;
}

interface ToolbarButtonProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'danger';
}

function ToolbarButton({ onClick, title, children, disabled, variant = 'default' }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={clsx(
        'p-1.5 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed',
        variant === 'danger'
          ? 'text-white/40 hover:bg-rose-500/10 hover:text-rose-400'
          : 'text-white/40 hover:bg-white/5 hover:text-white'
      )}
    >
      {children}
    </button>
  );
}
