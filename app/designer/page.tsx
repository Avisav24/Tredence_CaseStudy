'use client';
import { useState, useCallback, useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { Workflow, AlertTriangle, Edit2, Check, LogOut } from 'lucide-react';
import Link from 'next/link';
import { WorkflowCanvas } from '@/components/canvas/WorkflowCanvas';
import { Sidebar } from '@/components/canvas/Sidebar';
import { NodeFormPanel } from '@/components/forms/NodeFormPanel';
import { SandboxPanel } from '@/components/sandbox/SandboxPanel';
import { useWorkflowStore } from '@/store/workflowStore';
import { simulateWorkflow } from '@/lib/simulationEngine';
import { type SimulationStep } from '@/types/workflow';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { CanvasToolbar } from '@/components/canvas/CanvasToolbar';

export default function DesignerPage() {
  const {
    nodes,
    edges,
    workflowName,
    setWorkflowName,
    runValidation,
    setSimulationResult,
    setIsSimulating,
    isSimulating,
    simulationResult,
    validationResult,
    undo,
    redo,
  } = useWorkflowStore();

  const [sandboxOpen, setSandboxOpen] = useState(false);
  const [liveSteps, setLiveSteps] = useState<SimulationStep[]>([]);
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(workflowName);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  const handleSimulate = useCallback(async () => {
    const validation = runValidation();
    if (!validation.valid) {
      setSandboxOpen(true);
      return;
    }

    setSandboxOpen(true);
    setIsSimulating(true);
    setLiveSteps([]);
    setSimulationResult(null);

    try {
      const result = await simulateWorkflow(nodes, edges, (step) => {
        setLiveSteps(prev => [...prev, step]);
      });
      setSimulationResult(result);
    } finally {
      setIsSimulating(false);
    }
  }, [nodes, edges, runValidation, setSimulationResult, setIsSimulating]);

  const errorCount = validationResult?.errors.length ?? 0;

  return (
    <div className="flex h-screen bg-[#03071d] text-white overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Topbar ─────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-6 h-14 border-b border-white/5 bg-[#03071d]/80 backdrop-blur-sm z-10 flex-shrink-0">
          {/* Status/Breadcrumb */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">Editor</span>
            <span className="text-white/5 text-xs">/</span>
            {editingName ? (
              <div className="flex items-center gap-1.5">
                <input
                  autoFocus
                  value={tempName}
                  onChange={e => setTempName(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setWorkflowName(tempName);
                      setEditingName(false);
                    }
                    if (e.key === 'Escape') setEditingName(false);
                  }}
                  className="text-sm font-bold bg-white/5 border border-blue-500/50 rounded-lg px-3 py-1 text-white outline-none w-52"
                />
              </div>
            ) : (
              <button
                onClick={() => { setTempName(workflowName); setEditingName(true); }}
                className="flex items-center gap-2 rounded-lg text-sm font-bold text-white transition-colors group"
              >
                {workflowName}
                <Edit2 className="w-3 h-3 text-white/20 group-hover:text-white transition-colors" />
              </button>
            )}
          </div>

          {/* Right side: node count + validation badge + simulate */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {errorCount > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3" />
                  {errorCount} Issues
                </div>
              )}
              {validationResult?.valid && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  <Check className="w-3 h-3" />
                  Ready
                </div>
              )}
            </div>
            
            <div className="h-4 w-px bg-white/5 mx-1" />
            
            <div className="flex items-center gap-4 mr-2">
              <button
                onClick={handleSimulate}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                Run Simulation
              </button>
            </div>
          </div>
        </header>

        {/* ── Main 3-panel layout ─────────────────────────────── */}
        <main className="main-workspace-container flex-1 relative w-full h-full">
          {/* Canvas Workspace (Background) */}
          <div className="absolute inset-0 z-0 bg-[#03071d]">
            <ReactFlowProvider>
              {/* Floating Toolbar - Bottom Centered */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-2 glass rounded-2xl shadow-2xl z-20 border border-white/5 animate-fade-in-up">
                <CanvasToolbar />
              </div>
              <WorkflowCanvas onSimulate={handleSimulate} isSimulating={isSimulating} />
            </ReactFlowProvider>
          </div>

          {/* Node Palette Overlay */}
          <div className="absolute left-6 top-6 bottom-6 w-[280px] designer-panel z-10 glass pointer-events-auto">
            <Sidebar />
          </div>

          {/* Configuration Panel Overlay */}
          <div className="absolute right-6 top-6 bottom-6 w-[320px] designer-panel z-10 glass pointer-events-auto">
            <NodeFormPanel />
          </div>
        </main>
      </div>

      {/* ── Sandbox modal ───────────────────────────────────── */}
      <SandboxPanel
        isOpen={sandboxOpen}
        isLoading={isSimulating}
        result={simulationResult}
        liveSteps={liveSteps}
        onClose={() => setSandboxOpen(false)}
        onRerun={handleSimulate}
      />
    </div>
  );
}
