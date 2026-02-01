import { HorizontalCardsSkeleton } from '@/components/ui';

export default function HomeLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="h-[70vh] min-h-125 w-full animate-pulse bg-gray-800" />
      
      <div className="container mx-auto space-y-12 px-4 py-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-700" />
            <HorizontalCardsSkeleton count={10} />
          </div>
        ))}
      </div>
    </>
  );
}
