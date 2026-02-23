'use client';

import Link from 'next/link';
import { DrakorCard } from './DrakorCard';
import { HorizontalScroll, Skeleton } from '@/components/ui';
import type { Drakor } from '@/types/drakor';

interface DrakorSectionProps {
  title: string;
  subtitle?: string;
  drakorList: Drakor[];
  viewAllHref?: string;
  isLoading?: boolean;
  error?: Error | null;
  priority?: boolean;
}

export function DrakorSection({
  title,
  subtitle,
  drakorList,
  viewAllHref,
  isLoading = false,
  error = null,
  priority = false,
}: DrakorSectionProps) {
  if (error) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-red-500/5 p-6 ring-1 ring-red-500/10">
            <p className="text-red-400/80">Failed to load Korean dramas. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header - elegant minimal */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              {/* Subtle accent bar */}
              <div className="h-6 w-0.5 rounded-full bg-linear-to-b from-rose-400 to-amber-300" />
              <div>
                <h2 className="text-xl font-semibold tracking-wide text-white md:text-2xl">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
          
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group flex items-center gap-1 text-sm text-gray-400 transition-colors duration-300 hover:text-white"
            >
              View All
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="shrink-0">
                <Skeleton className="h-64 w-40 rounded-xl md:h-72 md:w-44" />
                <Skeleton className="mt-3 h-4 w-32" />
                <Skeleton className="mt-2 h-3 w-20" />
              </div>
            ))}
          </div>
        ) : drakorList.length === 0 ? (
          <div className="flex items-center justify-center rounded-xl bg-white/5 py-16 ring-1 ring-white/5">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
                <svg className="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <p className="text-gray-500">No Korean dramas found</p>
            </div>
          </div>
        ) : (
          <HorizontalScroll>
            {drakorList.map((drakor, index) => (
              <div 
                key={drakor.id} 
                className="shrink-0 w-40 md:w-44"
              >
                <DrakorCard 
                  drakor={drakor} 
                  priority={priority && index < 4} 
                />
              </div>
            ))}
          </HorizontalScroll>
        )}
      </div>
    </section>
  );
}

// Grid layout variant - cleaner for browse pages
interface DrakorSectionGridProps {
  title: string;
  subtitle?: string;
  drakorList: Drakor[];
  isLoading?: boolean;
  columns?: 4 | 5 | 6;
}

export function DrakorSectionGrid({
  title,
  subtitle,
  drakorList,
  isLoading = false,
  columns = 5,
}: DrakorSectionGridProps) {
  const gridCols = {
    4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-8 w-0.5 rounded-full bg-linear-to-b from-rose-400 to-amber-300" />
          <div>
            <h2 className="text-2xl font-semibold tracking-wide text-white">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className={`grid ${gridCols[columns]} gap-4 md:gap-5`}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-2/3 w-full rounded-xl" />
                <Skeleton className="mt-3 h-4 w-3/4" />
                <Skeleton className="mt-2 h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid ${gridCols[columns]} gap-4 md:gap-5`}>
            {drakorList.map((drakor, index) => (
              <DrakorCard key={drakor.id} drakor={drakor} priority={index < 6} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
