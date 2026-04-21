'use client';
import { Input, Select } from '@/components/ui/Inputs';
import { type ApprovalNodeData, type ApproverRole } from '@/types/workflow';

interface ApprovalNodeFormProps {
  data: ApprovalNodeData;
  onChange: (data: Partial<ApprovalNodeData>) => void;
}

const APPROVER_ROLES: ApproverRole[] = ['Manager', 'HRBP', 'Director', 'CEO'];

export function ApprovalNodeForm({ data, onChange }: ApprovalNodeFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Title *"
        value={data.title}
        placeholder="e.g. Manager Approval"
        onChange={e => onChange({ title: e.target.value })}
        error={!data.title?.trim() ? 'Title is required' : undefined}
      />
      <Select
        label="Approver Role"
        value={data.approverRole}
        options={APPROVER_ROLES.map(r => ({ value: r, label: r }))}
        onChange={e => onChange({ approverRole: e.target.value as ApproverRole })}
      />
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
          Auto-Approve Threshold (days)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={1}
            max={14}
            value={data.autoApproveThreshold}
            onChange={e => onChange({ autoApproveThreshold: Number(e.target.value) })}
            className="flex-1 accent-violet-500"
          />
          <span className="text-sm font-bold text-violet-400 w-8 text-center">
            {data.autoApproveThreshold}
          </span>
        </div>
        <p className="text-xs text-[#6B7280]">
          Auto-approved after {data.autoApproveThreshold} day{data.autoApproveThreshold !== 1 ? 's' : ''} of no response
        </p>
      </div>
    </div>
  );
}
