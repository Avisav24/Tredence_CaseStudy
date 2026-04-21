'use client';
import { Input, Toggle } from '@/components/ui/Inputs';
import { type EndNodeData } from '@/types/workflow';

interface EndNodeFormProps {
  data: EndNodeData;
  onChange: (data: Partial<EndNodeData>) => void;
}

export function EndNodeForm({ data, onChange }: EndNodeFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="End Message"
        value={data.endMessage}
        placeholder="e.g. Onboarding completed successfully."
        onChange={e => onChange({ endMessage: e.target.value })}
      />
      <Toggle
        label="Show Completion Summary"
        description="Display a summary of all completed steps at the end"
        checked={data.showSummary}
        onChange={v => onChange({ showSummary: v })}
      />
    </div>
  );
}
