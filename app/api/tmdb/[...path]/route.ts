import { NextRequest, NextResponse } from 'next/server';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  
  if (!TMDB_API_KEY) {
    return NextResponse.json(
      { error: 'TMDB API key is not configured' },
      { status: 500 }
    );
  }

  const path = resolvedParams.path.join('/');
  const searchParams = request.nextUrl.searchParams;
  
  // Build the TMDB URL
  const tmdbUrl = new URL(`${TMDB_BASE_URL}/${path}`);
  tmdbUrl.searchParams.set('api_key', TMDB_API_KEY);
  tmdbUrl.searchParams.set('language', 'en-US');
  
  // Forward all query params
  searchParams.forEach((value, key) => {
    if (key !== 'api_key') {
      tmdbUrl.searchParams.set(key, value);
    }
  });

  try {
    const response = await fetch(tmdbUrl.toString(), {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `TMDB API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('TMDB API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from TMDB' },
      { status: 500 }
    );
  }
}
