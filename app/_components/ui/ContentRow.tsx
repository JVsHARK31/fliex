'use client';

import { Show } from '@/lib/types';
import MovieCard from './MovieCard';
import { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ContentRowProps {
  title: string;
  shows: Show[];
}

export default function ContentRow({ title, shows }: ContentRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [shows]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    try {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error('Scroll error:', error);
    }
  };

  if (!shows || shows.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14">
      <h2 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
        {title}
      </h2>

      <div className="relative group mt-2">
        {/* Left Arrow - Hidden on mobile and when can't scroll left */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-0 bottom-0 z-20 w-12 lg:w-16 bg-gradient-to-r from-black via-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center hover:scale-110 active:scale-95"
            aria-label="Scroll left"
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-full p-2 lg:p-3 shadow-xl border border-white/10 hover:border-white/30 transition-all">
              <FiChevronLeft size={28} className="lg:w-8 lg:h-8" />
            </div>
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-8 lg:px-16 py-4 snap-x snap-mandatory scroll-smooth touch-pan-x"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {shows.map((show, index) => (
            <div 
              key={`${show.id}-${index}`} 
              className="flex-none w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] snap-start"
            >
              <MovieCard show={show} />
            </div>
          ))}
        </div>

        {/* Right Arrow - Hidden on mobile and when can't scroll right */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-0 bottom-0 z-20 w-12 lg:w-16 bg-gradient-to-l from-black via-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center hover:scale-110 active:scale-95"
            aria-label="Scroll right"
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-full p-2 lg:p-3 shadow-xl border border-white/10 hover:border-white/30 transition-all">
              <FiChevronRight size={28} className="lg:w-8 lg:h-8" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

