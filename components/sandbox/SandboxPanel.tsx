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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#111827] shadow-2xl flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#F9FAFB]">Workflow Simulation</h2>
              <p className="text-xs text-[#6B7280]">Step-by-step execution log</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-[#6B7280] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status bar */}
        {(isLoading || result) && (
          <div
            className={clsx(
              'px-6 py-3 flex items-center gap-2 text-sm border-b border-white/5',
              isLoading && 'bg-violet-500/10 text-violet-300',
              !isLoading && result?.success && 'bg-emerald-500/10 text-emerald-300',
              !isLoading && result && !result.success && 'bg-rose-500/10 text-rose-300'
            )}
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Running simulation...</>
            ) : result?.success ? (
              <><CheckCircle2 className="w-4 h-4" /> Workflow completed successfully in {result.totalDuration}ms</>
            ) : (
              <><AlertCircle className="w-4 h-4" /> Simulation failed — {result?.errors[0]}</>
            )}
          </div>
        )}

        {/* Steps */}
        <div className="flex-1 overflow-y-auto p-6">
          {displaySteps.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#4B5563]" />
              </div>
              <p className="text-sm text-[#4B5563]">No steps to display</p>
            </div>
          )}

          <div className="relative flex flex-col gap-3">
            {/* Timeline line */}
            {displaySteps.length > 1 && (
              <div className="absolute left-4 top-8 bottom-8 w-px bg-white/5" />
            )}

            {displaySteps.map((step, i) => (
              <StepCard key={step.nodeId + i} step={step} index={i} />
            ))}

            {/* Loading placeholder */}
            {isLoading && (
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-white/5 rounded animate-pulse w-2/3" />
                  <div className="h-2.5 bg-white/5 rounded animate-pulse w-1/2" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
          {result && (
            <p className="text-xs text-[#6B7280]">
              {result.steps.length} steps · {result.totalDuration}ms total
            </p>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
            <Button variant="primary" size="sm" onClick={onRerun} disabled={isLoading}>
              {isLoading ? 'Running...' : 'Re-run'}
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
    <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-4 transition-colors">
      {/* Step number / icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
        style={{ backgroundColor: `${color}22`, color }}
      >
        {index + 1}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-[#E5E7EB] truncate">{step.label}</p>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {step.status === 'success' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span className="text-[10px] text-[#6B7280]">{step.duration}ms</span>
          </div>
        </div>
        <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{step.message}</p>
      </div>
    </div>
  );
}
