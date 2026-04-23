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
    <div className="flex h-screen bg-[#030712] text-white overflow-hidden font-body">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* ── Topbar ─────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-10 h-20 border-b border-white/[0.05] bg-[#030712]/60 backdrop-blur-2xl z-30 flex-shrink-0">
          {/* Status/Breadcrumb */}
          <div className="flex items-center gap-6">
            <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 group shadow-sm">
              <Workflow className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            </Link>
            <div className="h-6 w-px bg-white/10 mx-1" />
            {editingName ? (
              <div className="flex items-center gap-2">
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
                  className="text-sm font-bold bg-white/5 border border-blue-500/50 rounded-xl px-4 py-2 text-white outline-none w-72 shadow-[0_0_30px_rgba(37,99,235,0.15)]"
                />
              </div>
            ) : (
              <button
                onClick={() => { setTempName(workflowName); setEditingName(true); }}
                className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-white/5 transition-all group"
              >
                <span className="text-base font-black text-white/90 group-hover:text-white transition-colors tracking-tight">{workflowName}</span>
                <Edit2 className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
              </button>
            )}
          </div>

          {/* Right side: validation + actions */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              {errorCount > 0 && (
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/5">
                  <AlertTriangle className="w-4 h-4 animate-pulse" />
                  {errorCount} Critical Issues
                </div>
              )}
              {validationResult?.valid && (
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/5">
                  <Check className="w-4 h-4" />
                  Graph Verified
                </div>
              )}
            </div>
            
            <div className="h-8 w-px bg-white/10 mx-1" />
            
            <div className="flex items-center gap-4">
              <button className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all duration-300 border border-white/5 shadow-sm">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all duration-300 border border-white/5 shadow-sm">
                <Save className="w-5 h-5" />
              </button>
              <button
                onClick={handleSimulate}
                className="flex items-center gap-3 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-sm font-black transition-all duration-300 shadow-[0_10px_30px_rgba(37,99,235,0.3)] active:scale-95 border border-blue-400/20 group"
              >
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                Run Simulation
              </button>
            </div>
          </div>
        </header>

        {/* ── Main Workspace ─────────────────────────────── */}
        <main className="flex-1 relative w-full h-full overflow-hidden bg-[#030712]">
          {/* Canvas Background Grid/Dots */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" 
               style={{ 
                 backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                 backgroundSize: '48px 48px' 
               }} />

          <ReactFlowProvider>
            {/* Main Canvas */}
            <div className="absolute inset-0 z-10">
              <WorkflowCanvas onSimulate={handleSimulate} isSimulating={isSimulating} />
            </div>

            {/* Floating UI Overlays */}
            <div className="absolute inset-0 pointer-events-none z-20 p-12">
              <div className="h-full w-full relative flex items-start justify-between">
                {/* Node Palette - Floating Card */}
                <div className="w-80 h-fit max-h-full glass-morphism rounded-[2.5rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] pointer-events-auto overflow-hidden flex flex-col animate-reveal">
                  <Sidebar />
                </div>

                {/* Configuration Panel - Floating Card */}
                <div className="w-96 h-fit max-h-full glass-morphism rounded-[2.5rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] pointer-events-auto overflow-hidden flex flex-col animate-reveal" style={{ animationDelay: '0.1s' }}>
                  <NodeFormPanel />
                </div>
              </div>

              {/* Bottom Toolbar - Floating Pill */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-auto animate-reveal" style={{ animationDelay: '0.2s' }}>
                <div className="glass-morphism rounded-[2rem] p-2 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center gap-2">
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

