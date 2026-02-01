import type { Metadata } from 'next';
import { SearchPageContent } from './SearchPageContent';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for movies and TV shows',
};

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-10 text-4xl font-bold tracking-tight text-white">Search</h1>
      <SearchPageContent />
    </div>
  );
}
