import { CardGridSkeleton } from '@/components/ui';

export default function TrendingLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 h-10 w-64 animate-pulse rounded bg-gray-700" />
      <div className="mb-6 h-10 w-48 animate-pulse rounded bg-gray-700" />
      <CardGridSkeleton count={20} />
    </div>
  );
}
