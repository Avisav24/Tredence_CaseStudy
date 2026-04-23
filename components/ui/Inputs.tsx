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
          'w-full rounded-2xl border bg-[#0D1117] px-6 py-4 text-[15px] text-[#F9FAFB] outline-none transition-all',
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
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-[0.2em] mb-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        {...props}
        rows={4}
        className={clsx(
          'w-full rounded-2xl border border-white/10 bg-[#0D1117] px-6 py-4 text-[15px] text-[#F9FAFB]',
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
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-[0.2em] mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...props}
          className={clsx(
            'w-full rounded-2xl border border-white/10 bg-[#0D1117] px-6 py-4 text-[15px] text-[#F9FAFB]',
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
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
           </svg>
        </div>
      </div>
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
    <div className="flex items-start justify-between gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
      <div className="space-y-1.5">
        <p className="text-[15px] font-black text-[#F9FAFB] tracking-tight">{label}</p>
        {description && <p className="text-[12px] text-[#6B7280] leading-relaxed font-medium">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          'relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-300 items-center px-1',
          checked ? 'bg-violet-600 shadow-[0_0_15px_rgba(124,58,237,0.4)]' : 'bg-white/10'
        )}
      >
        <span
          className={clsx(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-xl transform transition-transform duration-300',
            checked ? 'translate-x-5' : 'translate-x-0'
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
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-wider"
      style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}33` }}
    >
      {children}
    </span>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({ variant = 'primary', size = 'md', loading, children, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center gap-3 rounded-2xl font-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-tight active:scale-95';
  const sizes = { 
    sm: 'px-5 py-3 text-[13px]', 
    md: 'px-8 py-4 text-[15px]',
    lg: 'px-12 py-5 text-[17px]'
  };
  const variants = {
    primary: 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_10px_25px_rgba(124,58,237,0.3)]',
    secondary: 'bg-white/5 hover:bg-white/10 text-[#F9FAFB] border border-white/10 backdrop-blur-sm',
    ghost: 'hover:bg-white/5 text-[#9CA3AF] hover:text-[#F9FAFB]',
    danger: 'bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/20',
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
