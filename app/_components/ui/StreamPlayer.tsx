'use client';

import { useState, useEffect } from 'react';
import { FiX, FiMaximize, FiMinimize, FiAlertCircle } from 'react-icons/fi';
import { getLK21StreamingUrl } from '@/lib/lk21-api';

interface StreamPlayerProps {
  title: string;
  movieId: string;
  onClose: () => void;
}

export default function StreamPlayer({ title, movieId, onClose }: StreamPlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStreamUrl() {
      try {
        setIsLoading(true);
        const url = await getLK21StreamingUrl(movieId);
        
        if (url) {
          setStreamUrl(url);
          setError(null);
        } else {
          setError('Streaming URL tidak tersedia');
        }
      } catch (err) {
        console.error('Error loading stream:', err);
        setError('Gagal memuat video');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStreamUrl();
  }, [movieId]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className={`relative w-full ${isFullscreen ? 'h-full' : 'max-w-6xl'} bg-black rounded-lg overflow-hidden shadow-2xl`}>
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/95 to-transparent p-3 sm:p-4 flex items-center justify-between">
          <h2 className="text-white text-sm sm:text-base md:text-lg font-bold truncate pr-4 max-w-[70%]">
            {title}
          </h2>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <FiMinimize size={18} /> : <FiMaximize size={18} />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Video Container */}
        <div className={`relative ${isFullscreen ? 'h-full' : 'aspect-video'} bg-netflix-darkGray`}>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red mb-4 mx-auto"></div>
                <p className="text-white text-base sm:text-lg">Memuat player...</p>
              </div>
            </div>
          ) : error || !streamUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <FiAlertCircle className="mx-auto mb-4 text-netflix-red" size={64} />
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">
                  Video Tidak Tersedia
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-6">
                  {error || 'Maaf, video untuk film ini sedang tidak tersedia.'}
                </p>
                <button
                  onClick={onClose}
                  className="bg-netflix-red text-white px-6 py-3 rounded font-semibold hover:bg-opacity-90 transition-all"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <iframe
              src={streamUrl}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="origin"
            />
          )}
        </div>

        {/* Controls Hint */}
        {streamUrl && !isLoading && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-4 pointer-events-none">
            <p className="text-white/60 text-xs sm:text-sm">
              💡 Tekan ESC untuk keluar | Klik icon ⛶ untuk fullscreen
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

