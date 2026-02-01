import type { Metadata } from 'next';
import { TrendingPageContent } from './TrendingPageContent';

export const metadata: Metadata = {
  title: 'Trending Movies',
  description: 'Discover the most trending movies right now',
};

export default function TrendingPage() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <div className="mb-10 flex flex-col items-start gap-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1.5 rounded-full bg-linear-to-b from-rose-500 to-rose-600" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Trending Movies</h1>
        </div>
        <p className="text-gray-400 ml-5">What everyone is watching right now</p>
      </div>
      <TrendingPageContent />
    </div>
  );
}
