'use client';

import { useState } from 'react';
import { FiPlay } from 'react-icons/fi';
import VideoPlayer from '@/app/_components/ui/VideoPlayer';

interface PlayButtonProps {
  title: string;
  movieId: string;
}

export default function PlayButton({ title, movieId }: PlayButtonProps) {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      {showPlayer && (
        <VideoPlayer
          title={title}
          movieId={movieId}
          onClose={() => setShowPlayer(false)}
        />
      )}
      <button
        onClick={() => setShowPlayer(true)}
        className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-opacity-80 transition-all"
      >
        <FiPlay size={20} />
        <span>Putar</span>
      </button>
    </>
  );
}

