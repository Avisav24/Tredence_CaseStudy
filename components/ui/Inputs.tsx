'use client';
import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={clsx(
          'w-full rounded-lg border bg-[#0D1117] px-3 py-2 text-sm text-[#F9FAFB] outline-none transition-all',
          'placeholder:text-[#4B5563]',
          error
            ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
            : 'border-white/10 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20',
          className
        )}
      />
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  )
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        {...props}
        rows={3}
        className={clsx(
          'w-full rounded-lg border border-white/10 bg-[#0D1117] px-3 py-2 text-sm text-[#F9FAFB]',
          'placeholder:text-[#4B5563] outline-none resize-none',
          'focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all',
          className
        )}
      />
    </div>
  )
);
Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        {...props}
        className={clsx(
          'w-full rounded-lg border border-white/10 bg-[#0D1117] px-3 py-2 text-sm text-[#F9FAFB]',
          'outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all',
          'appearance-none cursor-pointer',
          className
        )}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-[#111827]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}

export function Toggle({ label, checked, onChange, description }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-[#F9FAFB]">{label}</p>
        {description && <p className="text-xs text-[#6B7280] mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200',
          checked ? 'bg-violet-600' : 'bg-white/10'
        )}
      >
        <span
          className={clsx(
            'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5',
            checked ? 'translate-x-4' : 'translate-x-0.5'
          )}
        />
      </button>
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
}

export function Badge({ children, color = '#6366F1' }: BadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: `${color}22`, color, border: `1px solid ${color}44` }}
    >
      {children}
    </span>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  loading?: boolean;
}

export function Button({ variant = 'primary', size = 'md', loading, children, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm' };
  const variants = {
    primary: 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20',
    secondary: 'bg-white/5 hover:bg-white/10 text-[#F9FAFB] border border-white/10',
    ghost: 'hover:bg-white/5 text-[#9CA3AF] hover:text-[#F9FAFB]',
    danger: 'bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30',
  };
  return (
    <button {...props} className={clsx(base, sizes[size], variants[variant], className)}>
      {loading && (
        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
