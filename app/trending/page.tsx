import type { Metadata } from 'next';
import { TrendingPageContent } from './TrendingPageContent';

export const metadata: Metadata = {
  title: 'Trending Movies',
  description: 'Discover the most trending movies right now',
};

export default function TrendingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-10 text-4xl font-bold tracking-tight text-white">Trending Movies</h1>
      <TrendingPageContent />
    </div>
  );
}
