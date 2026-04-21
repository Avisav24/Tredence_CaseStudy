'use client';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from './Inputs';

interface KeyValuePair {
  key: string;
  value: string;
}

interface KeyValueEditorProps {
  label?: string;
  pairs: KeyValuePair[];
  onChange: (pairs: KeyValuePair[]) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
}

export function KeyValueEditor({
  label = 'Custom Fields',
  pairs,
  onChange,
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value',
}: KeyValueEditorProps) {
  const addPair = () => onChange([...pairs, { key: '', value: '' }]);

  const updatePair = (index: number, field: 'key' | 'value', val: string) => {
    const updated = pairs.map((p, i) => (i === index ? { ...p, [field]: val } : p));
    onChange(updated);
  };

  const removePair = (index: number) => {
    onChange(pairs.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="flex flex-col gap-2">
        {pairs.map((pair, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="text"
              value={pair.key}
              placeholder={keyPlaceholder}
              onChange={e => updatePair(idx, 'key', e.target.value)}
              className="flex-1 rounded-lg border border-white/10 bg-[#0D1117] px-3 py-1.5 text-xs text-[#F9FAFB] placeholder:text-[#4B5563] outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all"
            />
            <input
              type="text"
              value={pair.value}
              placeholder={valuePlaceholder}
              onChange={e => updatePair(idx, 'value', e.target.value)}
              className="flex-1 rounded-lg border border-white/10 bg-[#0D1117] px-3 py-1.5 text-xs text-[#F9FAFB] placeholder:text-[#4B5563] outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all"
            />
            <button
              onClick={() => removePair(idx)}
              className="p-1.5 rounded-lg hover:bg-rose-500/10 text-[#6B7280] hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
      <Button variant="ghost" size="sm" onClick={addPair} className="self-start text-violet-400 hover:text-violet-300">
        <Plus className="w-3.5 h-3.5" />
        Add field
      </Button>
    </div>
  );
}
