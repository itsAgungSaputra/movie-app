export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'TBA';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'TBA';
  }
}

export function formatYear(dateString: string | null | undefined): string {
  if (!dateString) return 'TBA';
  
  try {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  } catch {
    return 'TBA';
  }
}

export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function formatVoteAverage(vote: number | null | undefined): string {
  if (vote === null || vote === undefined) return 'N/A';
  return vote.toFixed(1);
}

export function formatVoteCount(count: number | null | undefined): string {
  if (!count) return '0';
  
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getYearRange(startYear: number = 1900): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  
  for (let year = currentYear + 2; year >= startYear; year--) {
    years.push(year);
  }
  
  return years;
}
