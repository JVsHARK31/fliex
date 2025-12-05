'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Show } from '@/lib/types';
import { FiPlay } from 'react-icons/fi';
import VideoPlayer from './VideoPlayer';
import PlaylistButton from './PlaylistButton';

interface MovieCardProps {
  show: Show;
}

export default function MovieCard({ show }: MovieCardProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const posterUrl = show.imageSet?.verticalPoster?.w240 || '/placeholder.jpg';
  const year = show.releaseYear || show.firstAirYear || 'N/A';
  const detailUrl = show.showType === 'movie' ? `/movie/${show.id}` : `/series/${show.id}`;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPlayer(true);
  };

  return (
    <>
      {showPlayer && (
        <VideoPlayer
          title={show.title}
          onClose={() => setShowPlayer(false)}
        />
      )}
      
      <div 
        className="group block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={detailUrl}>
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-netflix-gray transition-all duration-300 group-hover:scale-105 group-hover:z-10 group-hover:shadow-2xl group-hover:ring-2 group-hover:ring-white/20">
            <Image
              src={posterUrl}
              alt={show.title}
              fill
              sizes="(max-width: 640px) 40vw, (max-width: 768px) 30vw, (max-width: 1024px) 25vw, 15vw"
              className="object-cover"
              loading="lazy"
            />
            
            {/* Desktop Overlay on hover */}
            <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-col justify-between p-3 z-20">
              {/* Top Actions */}
              <div className="flex justify-end gap-2">
                <PlaylistButton show={show} variant="icon" size="sm" />
              </div>
              
              {/* Bottom Info */}
              <div className="w-full">
                <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2 drop-shadow-lg">
                  {show.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
                  <span className="bg-white/30 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20">{year}</span>
                  {show.rating && (
                    <span className="flex items-center bg-green-500/30 backdrop-blur-sm px-2 py-0.5 rounded border border-green-500/30">
                      ⭐ {show.rating.toFixed(1)}
                    </span>
                  )}
                </div>
                <button
                  onClick={handlePlayClick}
                  className="w-full flex items-center justify-center gap-1 bg-white text-black px-3 py-1.5 rounded text-xs font-semibold hover:bg-opacity-90 transition-all shadow-lg"
                >
                  <FiPlay size={14} />
                  <span>Putar</span>
                </button>
              </div>
            </div>

            {/* Mobile: Always show title */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2">
              <div className="flex items-start justify-between gap-1 mb-1">
                <h3 className="text-white font-medium text-[10px] xs:text-xs line-clamp-2 leading-tight flex-1">
                  {show.title}
                </h3>
                <PlaylistButton show={show} variant="icon" size="sm" />
              </div>
              {show.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-[9px] xs:text-[10px] text-yellow-400">⭐</span>
                  <span className="text-[9px] xs:text-[10px] text-gray-300">{show.rating.toFixed(1)}</span>
                </div>
              )}
              <button
                onClick={handlePlayClick}
                className="w-full flex items-center justify-center gap-1 bg-white/90 text-black px-2 py-1 rounded text-[10px] xs:text-xs font-semibold hover:bg-white transition-all mt-1"
              >
                <FiPlay size={12} />
                <span>Putar</span>
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

