import Link from 'next/link';

export default function MovieNotFound() {
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
          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
        />
      </svg>
      <h1 className="mb-4 text-3xl font-bold text-white">Movie Not Found</h1>
      <p className="mb-8 text-gray-400">
        The movie you're looking for doesn't exist or has been removed.
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
