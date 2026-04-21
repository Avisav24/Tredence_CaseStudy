'use client';
import { Input } from '@/components/ui/Inputs';
import { KeyValueEditor } from '@/components/ui/KeyValueEditor';
import { type StartNodeData } from '@/types/workflow';

interface StartNodeFormProps {
  data: StartNodeData;
  onChange: (data: Partial<StartNodeData>) => void;
}

export function StartNodeForm({ data, onChange }: StartNodeFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Workflow Title"
        value={data.title}
        placeholder="e.g. Employee Onboarding"
        onChange={e => onChange({ title: e.target.value })}
      />
      <KeyValueEditor
        label="Metadata"
        pairs={data.metadata}
        onChange={pairs => onChange({ metadata: pairs })}
        keyPlaceholder="e.g. department"
        valuePlaceholder="e.g. Engineering"
      />
    </div>
  );
}
