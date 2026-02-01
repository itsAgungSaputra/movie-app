import Link from 'next/link';

export default function TVShowNotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <svg
        className="mb-6 h-24 w-24 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      <h1 className="mb-4 text-3xl font-bold text-white">TV Show Not Found</h1>
      <p className="mb-8 text-gray-400">
        The TV show you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
      >
        Go Home
      </Link>
    </div>
  );
}
