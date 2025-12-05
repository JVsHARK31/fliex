'use client';

import { useState } from 'react';
import { FiX, FiMaximize, FiMinimize } from 'react-icons/fi';

interface VideoPlayerProps {
  title: string;
  videoUrl?: string;
  onClose: () => void;
}

export default function VideoPlayer({ title, videoUrl, onClose }: VideoPlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Demo trailer URL (YouTube embed)
  const demoVideoUrl = videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ';

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`relative w-full ${isFullscreen ? 'h-full' : 'max-w-6xl'} bg-black rounded-lg overflow-hidden shadow-2xl`}>
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center justify-between">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold truncate pr-4">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close player"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Video Container */}
        <div className={`relative ${isFullscreen ? 'h-full' : 'aspect-video'} bg-black`}>
          <iframe
            src={demoVideoUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6">
          <p className="text-white/80 text-sm sm:text-base">
            🎬 Demo Player - Dalam versi production, video akan diambil dari streaming service
          </p>
        </div>
      </div>
    </div>
  );
}

