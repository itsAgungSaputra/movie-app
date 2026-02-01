interface RatingBadgeProps {
  rating: number | null | undefined;
  size?: 'sm' | 'md' | 'lg';
}

export function RatingBadge({ rating, size = 'md' }: RatingBadgeProps) {
  if (rating === null || rating === undefined) {
    return null;
  }

  const ratingValue = rating.toFixed(1);
  const numericRating = parseFloat(ratingValue);
  
  const getColor = () => {
    if (numericRating >= 7) return 'bg-emerald-500/90 text-emerald-50 shadow-emerald-500/30';
    if (numericRating >= 5) return 'bg-amber-500/90 text-amber-50 shadow-amber-500/30';
    return 'bg-rose-500/90 text-rose-50 shadow-rose-500/30';
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-1 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1',
    lg: 'text-sm px-3 py-1.5 gap-1.5',
  };

  return (
    <div
      className={`inline-flex items-center rounded-lg font-bold backdrop-blur-sm shadow-lg ${getColor()} ${sizeClasses[size]}`}
    >
      <svg
        className={size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-3.5 w-3.5' : 'h-4 w-4'}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span>{ratingValue}</span>
    </div>
  );
}
