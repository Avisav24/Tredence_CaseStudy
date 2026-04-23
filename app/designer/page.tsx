'use client';
import { useState, useCallback, useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { Workflow, AlertTriangle, Edit2, Check, LogOut, Play, Save, Share2 } from 'lucide-react';
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
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* ── Topbar ─────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-8 h-16 border-b border-white/5 bg-[#03071d]/80 backdrop-blur-xl z-30 flex-shrink-0">
          {/* Status/Breadcrumb */}
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
              <Workflow className="w-4 h-4 text-blue-400" />
            </Link>
            <div className="h-4 w-px bg-white/10 mx-1" />
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
                  onBlur={() => setEditingName(false)}
                  className="text-sm font-bold bg-white/5 border border-blue-500/50 rounded-lg px-3 py-1.5 text-white outline-none w-64 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                />
              </div>
            ) : (
              <button
                onClick={() => { setTempName(workflowName); setEditingName(true); }}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all group"
              >
                <span className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">{workflowName}</span>
                <Edit2 className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors" />
              </button>
            )}
          </div>

          {/* Right side: validation + actions */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {errorCount > 0 && (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {errorCount} Critical Issues
                </div>
              )}
              {validationResult?.valid && (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/5">
                  <Check className="w-3.5 h-3.5" />
                  Graph Verified
                </div>
              )}
            </div>
            
            <div className="h-6 w-px bg-white/5 mx-1" />
            
            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/5 shadow-sm">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/5 shadow-sm">
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleSimulate}
                className="flex items-center gap-2.5 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-xl shadow-blue-600/20 active:scale-95 border border-blue-400/20 group"
              >
                <Play className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" />
                Run Simulation
              </button>
            </div>
          </div>
        </header>

        {/* ── Main Workspace ─────────────────────────────── */}
        <main className="flex-1 relative w-full h-full overflow-hidden bg-[#03071d]">
          {/* Canvas Background Grid/Dots */}
          <div className="absolute inset-0 opacity-20 pointer-events-none z-0" 
               style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <ReactFlowProvider>
            {/* Main Canvas */}
            <div className="absolute inset-0 z-10">
              <WorkflowCanvas onSimulate={handleSimulate} isSimulating={isSimulating} />
            </div>

            {/* Floating UI Overlays */}
            <div className="absolute inset-0 pointer-events-none z-20 p-8">
              <div className="h-full w-full relative flex items-start justify-between">
                {/* Node Palette */}
                <div className="w-72 h-full glass-morphism-dark rounded-[2.5rem] border border-white/5 shadow-2xl pointer-events-auto overflow-hidden flex flex-col">
                  <Sidebar />
                </div>

                {/* Configuration Panel */}
                <div className="w-80 h-full glass-morphism-dark rounded-[2.5rem] border border-white/5 shadow-2xl pointer-events-auto overflow-hidden flex flex-col">
                  <NodeFormPanel />
                </div>
              </div>

              {/* Bottom Toolbar */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
                <div className="glass-morphism-dark rounded-2xl p-2 border border-white/10 shadow-2xl flex items-center gap-1">
                  <CanvasToolbar />
                </div>
              </div>
            </div>
          </ReactFlowProvider>
        </main>
      </div>

      {/* ── Sandbox Panel ───────────────────────────────────── */}
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
