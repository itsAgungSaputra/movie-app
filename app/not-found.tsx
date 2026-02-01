import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 text-8xl font-bold text-red-500">404</h1>
      <h2 className="mb-4 text-3xl font-bold text-white">Page Not Found</h2>
      <p className="mb-8 max-w-md text-gray-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
        >
          Go Home
        </Link>
        <Link
          href="/search"
          className="rounded-lg border border-gray-600 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
        >
          Search
        </Link>
      </div>
    </div>
  );
}
