import { HorizontalCardsSkeleton } from '@/components/ui';

export default function HomeLoading() {
  return (
    <>
      {/* Hero skeleton with shimmer */}
      <div className="relative h-[70vh] min-h-100 md:h-[80vh] md:min-h-140 w-full overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] to-transparent" />
        
        {/* Content skeleton */}
        <div className="container absolute bottom-20 left-0 right-0 mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            {/* Poster skeleton */}
            <div className="hidden lg:block h-96 w-64 rounded-2xl bg-white/5 animate-pulse" />
            
            {/* Info skeleton */}
            <div className="flex-1 space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-16 rounded-lg bg-white/10 animate-pulse" />
                <div className="h-8 w-24 rounded-full bg-white/5 animate-pulse" />
                <div className="h-8 w-28 rounded-full bg-white/5 animate-pulse" />
              </div>
              <div className="h-14 w-3/4 rounded-lg bg-white/10 animate-pulse" />
              <div className="h-20 w-full max-w-xl rounded-lg bg-white/5 animate-pulse" />
              <div className="flex gap-4 pt-2">
                <div className="h-12 w-36 rounded-xl bg-rose-500/20 animate-pulse" />
                <div className="h-12 w-32 rounded-xl bg-white/5 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto space-y-12 px-4 py-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-rose-500/30" />
              <div className="h-7 w-48 animate-pulse rounded-lg bg-white/10" />
            </div>
            <HorizontalCardsSkeleton count={10} />
          </div>
        ))}
      </div>
    </>
  );
}
