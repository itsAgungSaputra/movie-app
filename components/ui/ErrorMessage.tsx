interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ 
  message = 'Something went wrong. Please try again.', 
  onRetry 
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white/3 p-12 text-center ring-1 ring-white/6">
      <svg
        className="mb-4 h-14 w-14 text-rose-500/80"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <p className="mb-5 text-gray-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-500/25 ring-1 ring-rose-400/30 transition-all duration-300 hover:bg-rose-400 hover:shadow-rose-500/35 hover:scale-[1.03] active:scale-100"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
