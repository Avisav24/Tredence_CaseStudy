'use client';
import { useEffect, useState } from 'react';
import { Input, Select } from '@/components/ui/Inputs';
import { type AutomatedStepNodeData, type AutomationAction } from '@/types/workflow';
import { fetchAutomations } from '@/api/workflowApi';
import { Loader2 } from 'lucide-react';

interface AutomatedStepNodeFormProps {
  data: AutomatedStepNodeData;
  onChange: (data: Partial<AutomatedStepNodeData>) => void;
}

export function AutomatedStepNodeForm({ data, onChange }: AutomatedStepNodeFormProps) {
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAutomations()
      .then(setActions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const selectedAction = actions.find(a => a.id === data.actionId);

  const handleActionChange = (actionId: string) => {
    // Reset params when action changes
    onChange({ actionId, actionParams: {} });
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Title"
        value={data.title}
        placeholder="e.g. Send Welcome Email"
        onChange={e => onChange({ title: e.target.value })}
      />

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading actions...
        </div>
      ) : (
        <Select
          label="Action *"
          value={data.actionId}
          options={[
            { value: '', label: '— Select an action —' },
            ...actions.map(a => ({ value: a.id, label: a.label })),
          ]}
          onChange={e => handleActionChange(e.target.value)}
        />
      )}

      {/* Dynamic params based on selected action */}
      {selectedAction && selectedAction.params.length > 0 && (
        <div className="flex flex-col gap-3">
          <label className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
            Action Parameters
          </label>
          <div className="rounded-lg border border-white/10 bg-[#0D1117] p-3 flex flex-col gap-3">
            {selectedAction.params.map(param => (
              <Input
                key={param}
                label={param}
                value={data.actionParams[param] ?? ''}
                placeholder={`Enter ${param}`}
                onChange={e =>
                  onChange({
                    actionParams: { ...data.actionParams, [param]: e.target.value },
                  })
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
