'use client';

import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="mb-7 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-1 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-linear-to-b from-rose-400 to-rose-600" />
          <div className="absolute inset-0 bg-linear-to-b from-white/30 to-transparent opacity-0 animate-pulse" />
        </div>
        <h2 className="text-xl font-bold text-white md:text-2xl lg:text-3xl tracking-tight">{title}</h2>
      </div>
      {action && (
        <div className="group text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-rose-400">
          {action}
        </div>
      )}
    </div>
  );
}
