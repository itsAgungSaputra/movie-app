'use client';

import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-linear-to-b from-rose-500 to-rose-600" />
        <h2 className="text-xl font-bold text-white md:text-2xl lg:text-3xl tracking-tight">{title}</h2>
      </div>
      {action && (
        <div className="text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors">
          {action}
        </div>
      )}
    </div>
  );
}
