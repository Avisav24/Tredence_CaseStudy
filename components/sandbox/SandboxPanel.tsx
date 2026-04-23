'use client';
import { X, CheckCircle2, AlertCircle, Loader2, Clock, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { type SimulationResult, type SimulationStep } from '@/types/workflow';
import { getNodeTypeColor } from '@/lib/graphUtils';
import { Button } from '@/components/ui/Inputs';

interface SandboxPanelProps {
  isOpen: boolean;
  isLoading: boolean;
  result: SimulationResult | null;
  liveSteps: SimulationStep[];
  onClose: () => void;
  onRerun: () => void;
}

export function SandboxPanel({ isOpen, isLoading, result, liveSteps, onClose, onRerun }: SandboxPanelProps) {
  if (!isOpen) return null;

  const displaySteps = isLoading ? liveSteps : (result?.steps ?? []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 animate-reveal" onClick={onClose}>
      <div className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md" />
      
      <div
        className="relative w-full max-w-2xl rounded-[2.5rem] border border-white/10 glass-morphism-dark shadow-[0_40px_100px_rgba(0,0,0,0.7)] flex flex-col max-h-[85vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-8 border-b border-white/5">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <ChevronRight className="w-6 h-6 text-violet-400" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white tracking-tight">Workflow Simulation</h2>
              <p className="text-[13px] font-medium text-[#9CA3AF] uppercase tracking-[0.15em]">Step-by-step execution log</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-white/10 text-[#6B7280] hover:text-white transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status bar */}
        {(isLoading || result) && (
          <div
            className={clsx(
              'px-10 py-4 flex items-center gap-3 text-sm font-bold border-b border-white/5',
              isLoading && 'bg-violet-500/10 text-violet-300',
              !isLoading && result?.success && 'bg-emerald-500/10 text-emerald-300',
              !isLoading && result && !result.success && 'bg-rose-500/10 text-rose-300'
            )}
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Running simulation engine...</>
            ) : result?.success ? (
              <><CheckCircle2 className="w-4 h-4" /> Workflow completed successfully in {result.totalDuration}ms</>
            ) : (
              <><AlertCircle className="w-4 h-4" /> Simulation failed — {result?.errors[0]}</>
            )}
          </div>
        )}

        {/* Steps */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {displaySteps.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-20 h-20 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/5">
                <Clock className="w-8 h-8 text-[#4B5563]" />
              </div>
              <p className="text-sm font-medium text-[#4B5563] uppercase tracking-widest">No steps to display</p>
            </div>
          )}

          <div className="relative flex flex-col gap-4">
            {/* Timeline line */}
            {displaySteps.length > 1 && (
              <div className="absolute left-6 top-10 bottom-10 w-px bg-gradient-to-b from-violet-500/20 via-white/5 to-transparent" />
            )}

            {displaySteps.map((step, i) => (
              <StepCard key={step.nodeId + i} step={step} index={i} />
            ))}

            {/* Loading placeholder */}
            {isLoading && (
              <div className="flex items-center gap-5 rounded-3xl border border-white/5 bg-white/[0.02] p-6 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <Loader2 className="w-5 h-5 text-violet-400/50 animate-spin" />
                </div>
                <div className="flex-1 space-y-2.5">
                  <div className="h-4 bg-white/10 rounded-full w-2/3" />
                  <div className="h-3 bg-white/5 rounded-full w-1/2" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
          <div>
            {result && (
              <p className="text-[13px] font-black text-[#6B7280] uppercase tracking-widest">
                {result.steps.length} steps <span className="mx-2 opacity-30">/</span> {result.totalDuration}ms total
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
            <Button variant="primary" size="sm" onClick={onRerun} disabled={isLoading}>
              {isLoading ? 'Running...' : 'Re-run Simulation'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, index }: { step: SimulationStep; index: number }) {
  const color = getNodeTypeColor(step.nodeType);

  return (
    <div className="group flex items-start gap-5 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] p-6 transition-all duration-500 hover:scale-[1.01] hover:border-white/10 shadow-sm hover:shadow-xl">
      {/* Step number / icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-sm font-black shadow-lg transition-transform duration-500 group-hover:rotate-6"
        style={{ 
          backgroundColor: `${color}15`, 
          color, 
          border: `1px solid ${color}30`,
          boxShadow: `0 8px 16px ${color}10`
        }}
      >
        {index + 1}
      </div>

      <div className="flex-1 min-w-0 pt-1">
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <p className="text-base font-black text-white tracking-tight truncate">{step.label}</p>
          <div className="flex items-center gap-2 flex-shrink-0 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
            {step.status === 'success' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span className="text-[11px] font-bold text-[#9CA3AF]">{step.duration}ms</span>
          </div>
        </div>
        <p className="text-[14px] text-[#9CA3AF] leading-relaxed font-medium">{step.message}</p>
      </div>
    </div>
  );
}

