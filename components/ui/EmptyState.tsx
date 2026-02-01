interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: 'search' | 'movie' | 'tv';
}

export function EmptyState({ 
  title = 'No results found',
  message = 'Try adjusting your search or filters.',
  icon = 'search'
}: EmptyStateProps) {
  const icons = {
    search: (
      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    movie: (
      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
    tv: (
      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 p-12 text-center backdrop-blur-sm ring-1 ring-white/10">
      <div className="mb-4 text-gray-500">{icons[icon]}</div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-gray-400">{message}</p>
    </div>
  );
}
