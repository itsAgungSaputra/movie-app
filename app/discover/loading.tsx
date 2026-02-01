import { CardGridSkeleton } from '@/components/ui';

export default function DiscoverLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 h-10 w-64 animate-pulse rounded bg-gray-700" />
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="h-16 w-48 animate-pulse rounded bg-gray-700" />
        <div className="h-16 w-32 animate-pulse rounded bg-gray-700" />
        <div className="h-16 w-40 animate-pulse rounded bg-gray-700" />
      </div>
      <CardGridSkeleton count={20} />
    </div>
  );
}
