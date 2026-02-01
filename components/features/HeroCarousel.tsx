'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/types/tmdb';
import { getBackdropUrl, getImageUrl } from '@/utils/image';
import { formatYear } from '@/utils/format';
import { RatingBadge } from '@/components/ui';

interface HeroCarouselProps {
  movies: Movie[];
  autoPlayInterval?: number;
}

export function HeroCarousel({ movies, autoPlayInterval = 6000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slidesCount = Math.min(movies.length, 5); // Max 5 slides
  const slides = movies.slice(0, slidesCount);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % slidesCount);
  }, [currentIndex, slidesCount, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + slidesCount) % slidesCount);
  }, [currentIndex, slidesCount, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <section 
      className="relative h-[70vh] min-h-100 md:h-[80vh] md:min-h-140 lg:h-[85vh] lg:min-h-160 w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Slides */}
      {slides.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 will-change-[opacity,transform] backface-hidden ${
            index === currentIndex 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{
            transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1), transform 800ms cubic-bezier(0.4, 0, 0.2, 1)',
            transform: index === currentIndex ? 'scale(1) translateZ(0)' : 'scale(1.05) translateZ(0)',
          }}
        >
          <Image
            src={getBackdropUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center md:object-top"
          />
        </div>
      ))}

      {/* Gradient Overlays - adjusted for mobile */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0f] via-[#0a0a0f]/90 to-[#0a0a0f]/40 md:via-[#0a0a0f]/85 md:to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0f]/80 md:from-[#0a0a0f]/70 to-transparent h-32 md:h-40" />

      {/* Main Content */}
      <div className="container relative mx-auto flex h-full items-end pb-20 md:pb-24 lg:pb-28 px-4 lg:px-6">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:gap-12 xl:gap-16 w-full">
          {/* Poster with Slide Animation - hidden on mobile/tablet */}
          <div className="hidden lg:block shrink-0">
            <div className="relative">
              {slides.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`${index === currentIndex ? 'relative' : 'absolute inset-0'} will-change-[opacity,transform] backface-hidden ${
                    index === currentIndex
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                  style={{
                    transition: 'opacity 600ms cubic-bezier(0.19, 1, 0.22, 1), transform 600ms cubic-bezier(0.19, 1, 0.22, 1)',
                    transform: index === currentIndex 
                      ? 'translate3d(0, 0, 0) scale(1)' 
                      : 'translate3d(0, 32px, 0) scale(0.95)',
                  }}
                >
                  <div className="relative h-80 w-52 lg:h-96 lg:w-64 xl:h-105 xl:w-70 overflow-hidden rounded-xl lg:rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10">
                    <Image
                      src={getImageUrl(movie.poster_path, 'w500')}
                      alt={movie.title}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1280px) 280px, 256px"
                      className="object-cover"
                    />
                    {/* Poster Shine Effect */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info with Slide Animation */}
          <div className="max-w-full md:max-w-xl lg:max-w-2xl flex-1">
            {slides.map((movie, index) => (
              <div
                key={movie.id}
                className={`${index === currentIndex ? 'relative' : 'absolute'} will-change-[opacity,transform] backface-hidden ${
                  index === currentIndex
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  transition: 'opacity 600ms cubic-bezier(0.19, 1, 0.22, 1), transform 600ms cubic-bezier(0.19, 1, 0.22, 1)',
                  transform: index === currentIndex 
                    ? 'translate3d(0, 0, 0)' 
                    : 'translate3d(-32px, 0, 0)',
                }}
              >
                {index === currentIndex && (
                  <div className="space-y-3 md:space-y-4 lg:space-y-6">
                    {/* Meta badges */}
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <RatingBadge rating={movie.vote_average} size="lg" />
                      <span className="rounded-full bg-white/10 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium text-white/80 backdrop-blur-sm">
                        {formatYear(movie.release_date)}
                      </span>
                      <span className="rounded-full bg-rose-500/20 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium text-rose-400 backdrop-blur-sm">
                        #{index + 1} Trending
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight md:leading-none">
                      {movie.title}
                    </h1>
                    
                    {/* Overview */}
                    <p className="line-clamp-2 md:line-clamp-3 text-sm md:text-base lg:text-lg leading-relaxed text-gray-300/90">
                      {movie.overview}
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-1 md:pt-2">
                      <Link
                        href={`/movie/${movie.id}`}
                        className="group inline-flex items-center gap-2 md:gap-3 rounded-lg md:rounded-xl bg-linear-to-r from-rose-500 to-rose-600 px-5 py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-base lg:text-lg font-bold text-white shadow-lg shadow-rose-500/25"
                        style={{
                          transition: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 200ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02) translateZ(0)';
                          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(244, 63, 94, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) translateZ(0)';
                          e.currentTarget.style.boxShadow = '';
                        }}
                      >
                        <svg className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" style={{ transition: 'transform 200ms ease' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        View Details
                      </Link>
                      <Link
                        href="/discover"
                        className="hidden sm:inline-flex items-center gap-2 rounded-lg md:rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-4 text-sm md:text-base lg:text-lg font-medium text-white backdrop-blur-sm"
                        style={{
                          transition: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 200ms ease, border-color 200ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02) translateZ(0)';
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) translateZ(0)';
                          e.currentTarget.style.backgroundColor = '';
                          e.currentTarget.style.borderColor = '';
                        }}
                      >
                        Explore More
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows - positioned at bottom corners, not blocking content */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-4 md:left-6 flex items-center gap-2 z-10">
        <button
          onClick={goToPrev}
          className="pointer-events-auto group flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          style={{
            transition: 'background-color 200ms ease, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '';
            e.currentTarget.style.borderColor = '';
          }}
          aria-label="Previous slide"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="pointer-events-auto group flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          style={{
            transition: 'background-color 200ms ease, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '';
            e.currentTarget.style.borderColor = '';
          }}
          aria-label="Next slide"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicators - centered, works on all screens */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative h-1.5 md:h-2 rounded-full focus:outline-none ${
              index === currentIndex 
                ? 'w-8 md:w-10 bg-rose-500' 
                : 'w-1.5 md:w-2 bg-white/30 hover:bg-white/50'
            }`}
            style={{
              transition: 'width 400ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 300ms ease',
            }}
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Progress bar for active slide */}
            {index === currentIndex && isAutoPlaying && (
              <span 
                className="absolute inset-0 rounded-full bg-white/40 origin-left animate-progress"
                style={{ animationDuration: `${autoPlayInterval}ms` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter - hidden on mobile */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 right-4 md:right-6 hidden md:flex items-center gap-1.5 md:gap-2 text-white/60">
        <span className="text-xl md:text-2xl font-bold text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="text-base md:text-lg">/</span>
        <span className="text-base md:text-lg">{String(slidesCount).padStart(2, '0')}</span>
      </div>

      {/* Thumbnail Preview - improved styling, hidden on smaller screens */}
      <div className="absolute bottom-20 md:bottom-24 lg:bottom-28 right-4 md:right-6 hidden lg:flex items-center gap-2 xl:gap-3 p-2 rounded-xl bg-black/20 backdrop-blur-sm">
        {slides.map((movie, index) => (
          <button
            key={movie.id}
            onClick={() => goToSlide(index)}
            className={`relative overflow-hidden rounded-md lg:rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 ${
              index === currentIndex
                ? 'h-12 w-20 lg:h-14 lg:w-24 xl:h-16 xl:w-28 ring-2 ring-rose-500 z-10'
                : 'h-10 w-16 lg:h-12 lg:w-20 xl:h-14 xl:w-24'
            }`}
            style={{
              opacity: index === currentIndex ? 1 : 0.6,
              filter: index === currentIndex ? 'none' : 'grayscale(50%)',
              transform: index === currentIndex ? 'scale(1.05) translateZ(0)' : 'scale(1) translateZ(0)',
              transition: 'opacity 300ms ease, filter 300ms ease, transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            onMouseEnter={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.filter = 'grayscale(0%)';
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.opacity = '0.6';
                e.currentTarget.style.filter = 'grayscale(50%)';
              }
            }}
          >
            <Image
              src={getBackdropUrl(movie.backdrop_path, 'w300')}
              alt={movie.title}
              fill
              sizes="(min-width: 1280px) 112px, 96px"
              className="object-cover"
            />
            {/* Active indicator overlay */}
            {index === currentIndex && (
              <div className="absolute inset-0 bg-rose-500/10 border-b-2 border-rose-500" />
            )}
          </button>
        ))}
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 lg:h-40 bg-linear-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  );
}
