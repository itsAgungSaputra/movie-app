'use client';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  className?: string;
}

export function Select({ value, onChange, options, label, className = '' }: SelectProps) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white backdrop-blur-sm transition-all duration-300 focus:border-rose-500/40 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-rose-500/15 appearance-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-900">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
