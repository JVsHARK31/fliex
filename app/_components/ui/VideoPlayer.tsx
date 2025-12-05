'use client';

import { useState, useEffect } from 'react';
import { FiX, FiMaximize, FiMinimize, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { getVideoSources, getPrimaryVideoUrl, VideoSource } from '@/lib/videoSources';

interface VideoPlayerProps {
  title: string;
  movieId?: string;
  videoUrl?: string;
  onClose: () => void;
}

export default function VideoPlayer({ title, movieId, videoUrl, onClose }: VideoPlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [availableSources, setAvailableSources] = useState<VideoSource[]>([]);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [showSourceSelector, setShowSourceSelector] = useState(false);

  useEffect(() => {
    // Generate embed URL berdasarkan movieId atau videoUrl
    if (videoUrl) {
      setEmbedUrl(videoUrl);
      setIsLoading(false);
    } else if (movieId) {
      // Get all available sources
      const sources = getVideoSources(movieId, title);
      setAvailableSources(sources);
      
      // Set primary source
      const primaryUrl = getPrimaryVideoUrl(movieId);
      setEmbedUrl(primaryUrl);
      setIsLoading(false);
    } else {
      // Fallback: Tampilkan pesan tidak ada video
      setIsLoading(false);
    }
  }, [movieId, videoUrl, title]);

  const switchSource = (index: number) => {
    if (availableSources[index]) {
      setEmbedUrl(availableSources[index].url);
      setCurrentSourceIndex(index);
      setShowSourceSelector(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className={`relative w-full ${isFullscreen ? 'h-full' : 'max-w-6xl'} bg-black rounded-lg overflow-hidden shadow-2xl`}>
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/95 to-transparent p-3 sm:p-4 flex items-center justify-between">
          <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold truncate pr-4 max-w-[60%]">
            {title}
          </h2>
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Source Selector */}
            {availableSources.length > 1 && (
              <div className="relative">
                <button
                  onClick={() => setShowSourceSelector(!showSourceSelector)}
                  className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Change source"
                  title="Ganti Server"
                >
                  <FiRefreshCw size={18} className="sm:w-5 sm:h-5" />
                </button>
                
                {showSourceSelector && (
                  <div className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl min-w-[200px] overflow-hidden">
                    <div className="p-2">
                      <p className="text-white text-xs font-semibold mb-2 px-2">Pilih Server:</p>
                      {availableSources.map((source, index) => (
                        <button
                          key={index}
                          onClick={() => switchSource(index)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            index === currentSourceIndex
                              ? 'bg-netflix-red text-white'
                              : 'text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {source.name} {source.quality && `(${source.quality})`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <FiMinimize size={18} className="sm:w-5 sm:h-5" /> : <FiMaximize size={18} className="sm:w-5 sm:h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close player"
            >
              <FiX size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Video Container */}
        <div className={`relative ${isFullscreen ? 'h-full' : 'aspect-video'} bg-netflix-darkGray`}>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red mb-4 mx-auto"></div>
                <p className="text-white text-lg">Loading player...</p>
              </div>
            </div>
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="origin"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <FiAlertCircle className="mx-auto mb-4 text-netflix-red" size={64} />
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">
                  Video Tidak Tersedia
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-6">
                  Maaf, video untuk film ini sedang tidak tersedia. Silakan coba film lain atau coba lagi nanti.
                </p>
                <button
                  onClick={onClose}
                  className="bg-netflix-red text-white px-6 py-3 rounded font-semibold hover:bg-opacity-90 transition-all"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Overlay */}
        {embedUrl && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-3 sm:p-4 md:p-6 pointer-events-none">
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-xs sm:text-sm">
                💡 Tip: Tekan ESC untuk keluar dari fullscreen
              </p>
              {availableSources.length > 1 && (
                <p className="text-white/50 text-xs hidden sm:block">
                  {availableSources.length} server tersedia
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

