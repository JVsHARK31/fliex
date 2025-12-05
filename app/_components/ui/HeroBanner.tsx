'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Show } from '@/lib/types';
import { FiPlay, FiInfo } from 'react-icons/fi';
import VideoPlayer from './VideoPlayer';
import PlaylistButton from './PlaylistButton';

interface HeroBannerProps {
  show: Show;
}

export default function HeroBanner({ show }: HeroBannerProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const backdropUrl = show.imageSet?.horizontalBackdrop?.w1440 || show.imageSet?.horizontalPoster?.w1440 || '/placeholder.jpg';
  const detailUrl = show.showType === 'movie' ? `/movie/${show.id}` : `/series/${show.id}`;

  return (
    <>
      {showPlayer && (
        <VideoPlayer
          title={show.title}
          onClose={() => setShowPlayer(false)}
        />
      )}
    <div className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backdropUrl}
          alt={show.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient Overlays - Enhanced for mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end px-4 sm:px-6 md:px-8 lg:px-16 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
        <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl w-full">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl leading-tight">
            {show.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-white mb-2 sm:mb-3 md:mb-4">
            {show.rating && (
              <span className="flex items-center font-semibold text-green-400 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded border border-green-400/30">
                ⭐ {show.rating.toFixed(1)}
              </span>
            )}
            <span className="bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded border border-white/20">{show.releaseYear || show.firstAirYear}</span>
            {show.showType === 'series' && show.seasonCount && (
              <span className="hidden sm:inline bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded border border-white/20">{show.seasonCount} Season{show.seasonCount > 1 ? 's' : ''}</span>
            )}
          </div>

          {/* Overview - Hidden on very small screens */}
          <p className="hidden sm:block text-white text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-5 line-clamp-2 md:line-clamp-3 drop-shadow-lg leading-relaxed max-w-2xl">
            {show.overview || 'Tidak ada deskripsi tersedia.'}
          </p>

          {/* Genres */}
          {show.genres && show.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-5 md:mb-6">
              {show.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm rounded-full border border-white/30 shadow-lg"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setShowPlayer(true)}
              className="flex items-center justify-center gap-2 bg-white text-black px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-semibold hover:bg-opacity-90 transition-all shadow-xl active:scale-95"
            >
              <FiPlay size={18} className="sm:w-5 sm:h-5" />
              <span>Putar</span>
            </button>
            <Link
              href={detailUrl}
              className="flex items-center justify-center gap-2 bg-white/30 backdrop-blur-sm text-white px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-semibold hover:bg-white/40 transition-all shadow-xl border border-white/40 active:scale-95"
            >
              <FiInfo size={18} className="sm:w-5 sm:h-5" />
              <span>Info</span>
            </Link>
            <PlaylistButton show={show} variant="full" size="md" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

