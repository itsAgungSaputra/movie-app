import type { Metadata } from 'next';
import { SearchPageContent } from './SearchPageContent';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for movies and TV shows',
};

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <div className="mb-10 flex flex-col items-start gap-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1.5 rounded-full bg-linear-to-b from-rose-500 to-rose-600" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Search</h1>
        </div>
        <p className="text-gray-400 ml-5">Find your favorite movies and TV shows</p>
      </div>
      <SearchPageContent />
    </div>
  );
}
