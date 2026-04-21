'use client';
import { Input, Textarea } from '@/components/ui/Inputs';
import { KeyValueEditor } from '@/components/ui/KeyValueEditor';
import { type TaskNodeData } from '@/types/workflow';

interface TaskNodeFormProps {
  data: TaskNodeData;
  onChange: (data: Partial<TaskNodeData>) => void;
}

export function TaskNodeForm({ data, onChange }: TaskNodeFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Title *"
        value={data.title}
        placeholder="e.g. Collect Documents"
        onChange={e => onChange({ title: e.target.value })}
        error={!data.title?.trim() ? 'Title is required' : undefined}
      />
      <Textarea
        label="Description"
        value={data.description}
        placeholder="Describe what this task involves..."
        onChange={e => onChange({ description: e.target.value })}
      />
      <Input
        label="Assignee *"
        value={data.assignee}
        placeholder="e.g. HR Team, John Doe"
        onChange={e => onChange({ assignee: e.target.value })}
        error={!data.assignee?.trim() ? 'Assignee is required' : undefined}
      />
      <Input
        label="Due Date"
        type="date"
        value={data.dueDate}
        onChange={e => onChange({ dueDate: e.target.value })}
      />
      <KeyValueEditor
        label="Custom Fields"
        pairs={data.customFields}
        onChange={pairs => onChange({ customFields: pairs })}
      />
    </div>
  );
}
