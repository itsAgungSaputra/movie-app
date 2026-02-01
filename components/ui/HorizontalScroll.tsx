'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener('scroll', checkScrollPosition, { passive: true });
    
    // Check on resize
    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      resizeObserver.disconnect();
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`group/scroll relative ${className}`}>
      {/* Left scroll button */}
      <button
        onClick={() => scroll('left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10 shadow-lg shadow-black/20 transition-all duration-300 ${
          canScrollLeft 
            ? 'opacity-0 group-hover/scroll:opacity-100 hover:bg-black/80 hover:scale-110 hover:border-white/20' 
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transform: canScrollLeft ? 'translateY(-50%) translateX(-20%)' : 'translateY(-50%) translateX(-50%)',
        }}
        aria-label="Scroll left"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right scroll button */}
      <button
        onClick={() => scroll('right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10 shadow-lg shadow-black/20 transition-all duration-300 ${
          canScrollRight 
            ? 'opacity-0 group-hover/scroll:opacity-100 hover:bg-black/80 hover:scale-110 hover:border-white/20' 
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transform: canScrollRight ? 'translateY(-50%) translateX(20%)' : 'translateY(-50%) translateX(50%)',
        }}
        aria-label="Scroll right"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Left fade gradient */}
      <div 
        className={`absolute left-0 top-0 bottom-4 w-16 bg-linear-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Right fade gradient */}
      <div 
        className={`absolute right-0 top-0 bottom-4 w-16 bg-linear-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Scrollable container - hide scrollbar completely */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-5 overflow-x-auto pb-2 scroll-smooth"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {children}
      </div>
    </div>
  );
}
