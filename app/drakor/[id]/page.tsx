import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDrakorDetails, getDrakorCredits, getDrakorRecommendations } from '@/lib/tmdb';
import { getBackdropUrl, getImageUrl } from '@/utils/image';
import { formatDate, formatVoteAverage } from '@/utils/format';
import { GenreList, CastList, HorizontalScroll } from '@/components/ui';
import { DrakorCard } from '@/components/drakor';

interface DrakorPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DrakorPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const drakorId = parseInt(resolvedParams.id, 10);
  
  if (isNaN(drakorId)) {
    return { title: 'K-Drama Not Found' };
  }

  try {
    const drakor = await getDrakorDetails(drakorId);
    return {
      title: `${drakor.name} | K-Drama`,
      description: drakor.overview,
      openGraph: {
        title: drakor.name,
        description: drakor.overview,
        images: drakor.backdrop_path
          ? [{ url: getBackdropUrl(drakor.backdrop_path, 'w1280') }]
          : [],
      },
    };
  } catch {
    return { title: 'K-Drama Not Found' };
  }
}

export default async function DrakorDetailPage({ params }: DrakorPageProps) {
  const resolvedParams = await params;
  const drakorId = parseInt(resolvedParams.id, 10);

  if (isNaN(drakorId)) {
    notFound();
  }

  try {
    const [drakor, credits, recommendations] = await Promise.all([
      getDrakorDetails(drakorId),
      getDrakorCredits(drakorId),
      getDrakorRecommendations(drakorId, 1),
    ]);

    return (
      <article className="min-h-screen">
        {/* Backdrop Section - elegant minimal */}
        <section className="relative h-[60vh] min-h-120 w-full overflow-hidden md:h-[70vh]">
          <div className="absolute inset-0">
            <Image
              src={getBackdropUrl(drakor.backdrop_path, 'original')}
              alt={drakor.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Minimal elegant overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/30" />
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 lg:px-6">
          <div className="-mt-44 relative z-10 flex flex-col gap-12 md:flex-row">
            {/* Poster with elegant frame */}
            <div className="mx-auto shrink-0 md:mx-0">
              <div className="relative">
                {/* Elegant border frame */}
                <div className="absolute -inset-1 rounded-2xl bg-linear-to-b from-white/20 via-transparent to-white/10" />
                
                <div className="relative h-100 w-67 overflow-hidden rounded-xl shadow-2xl shadow-black/50">
                  <Image
                    src={getImageUrl(drakor.poster_path, 'w780')}
                    alt={drakor.name}
                    fill
                    priority
                    sizes="268px"
                    className="object-cover"
                  />
                  {/* K-Drama badge */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-md bg-black/40 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md ring-1 ring-white/10">
                      K-Drama
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info - clean typography */}
            <div className="flex-1 py-6">
              {/* Korean title */}
              {drakor.original_name && drakor.original_name !== drakor.name && (
                <p className="mb-2 text-base font-light tracking-wider text-gray-400">
                  {drakor.original_name}
                </p>
              )}
              
              <h1 className="mb-4 text-3xl font-semibold tracking-wide text-white md:text-4xl lg:text-5xl">
                {drakor.name}
              </h1>
              
              {drakor.tagline && (
                <p className="mb-6 text-base italic text-gray-400/80">"{drakor.tagline}"</p>
              )}

              {/* Meta info - minimal style */}
              <div className="mb-6 flex flex-wrap items-center gap-4">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium text-white">{formatVoteAverage(drakor.vote_average)}</span>
                </div>
                
                <span className="h-4 w-px bg-gray-700" />
                
                <span className="text-sm text-gray-400">
                  {formatDate(drakor.first_air_date)}
                </span>
                
                {drakor.number_of_episodes > 0 && (
                  <>
                    <span className="h-4 w-px bg-gray-700" />
                    <span className="text-sm text-gray-400">
                      {drakor.number_of_episodes} Episode{drakor.number_of_episodes !== 1 ? 's' : ''}
                    </span>
                  </>
                )}
                
                <span className="h-4 w-px bg-gray-700" />
                
                <span className="text-sm text-gray-400">
                  🇰🇷 South Korea
                </span>
              </div>

              {/* Genres */}
              <div className="mb-6">
                <GenreList genres={drakor.genres} />
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
                  Synopsis
                </h2>
                <p className="leading-relaxed text-gray-300/90">
                  {drakor.overview || 'No synopsis available.'}
                </p>
              </div>

              {/* Additional Info Grid - minimal cards */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {drakor.status && (
                  <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/5">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">Status</h3>
                    <p className="mt-1 text-sm font-medium text-white">{drakor.status}</p>
                  </div>
                )}
                {drakor.type && (
                  <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/5">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">Type</h3>
                    <p className="mt-1 text-sm font-medium text-white">{drakor.type}</p>
                  </div>
                )}
                {drakor.networks && drakor.networks.length > 0 && (
                  <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/5">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">Network</h3>
                    <p className="mt-1 text-sm font-medium text-white">
                      {drakor.networks[0].name}
                    </p>
                  </div>
                )}
                {drakor.episode_run_time && drakor.episode_run_time.length > 0 && (
                  <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/5">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">Runtime</h3>
                    <p className="mt-1 text-sm font-medium text-white">
                      {drakor.episode_run_time[0]} min
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Cast Section */}
        {credits.cast.length > 0 && (
          <section className="mt-16">
            <div className="container mx-auto px-4 lg:px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-6 w-0.5 rounded-full bg-linear-to-b from-rose-400 to-amber-300" />
                <h2 className="text-lg font-medium tracking-wide text-white">Cast</h2>
              </div>
              <CastList cast={credits.cast.slice(0, 12)} />
            </div>
          </section>
        )}

        {/* Recommendations */}
        {recommendations.results.length > 0 && (
          <section className="mt-16 pb-16">
            <div className="container mx-auto px-4 lg:px-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-6 w-0.5 rounded-full bg-linear-to-b from-rose-400 to-amber-300" />
                <h2 className="text-lg font-medium tracking-wide text-white">You May Also Like</h2>
              </div>
              <HorizontalScroll>
                {recommendations.results.slice(0, 12).map((rec, index) => (
                  <div key={rec.id} className="shrink-0 w-40 md:w-44">
                    <DrakorCard drakor={rec} priority={index < 4} />
                  </div>
                ))}
              </HorizontalScroll>
            </div>
          </section>
        )}

        {/* Back button - minimal */}
        <div className="container mx-auto px-4 lg:px-6 pb-16">
          <Link
            href="/drakor"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to K-Drama
          </Link>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
