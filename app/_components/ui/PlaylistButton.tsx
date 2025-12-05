'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiCheck } from 'react-icons/fi';
import { Show } from '@/lib/types';
import { useAppStore } from '@/store/useAppStore';

interface PlaylistButtonProps {
  show: Show;
  variant?: 'icon' | 'full';
  size?: 'sm' | 'md' | 'lg';
}

export default function PlaylistButton({ show, variant = 'icon', size = 'md' }: PlaylistButtonProps) {
  const { addToMyList, removeFromMyList, isInMyList } = useAppStore();
  const [inList, setInList] = useState(false);

  useEffect(() => {
    setInList(isInMyList(show.id));
  }, [show.id, isInMyList]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inList) {
      removeFromMyList(show.id);
      setInList(false);
    } else {
      addToMyList(show);
      setInList(true);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base',
  };

  const iconSize = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggle}
        className={`${sizeClasses[size]} bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all border border-white/40 active:scale-95`}
        aria-label={inList ? 'Remove from My List' : 'Add to My List'}
        title={inList ? 'Remove from My List' : 'Add to My List'}
      >
        {inList ? (
          <FiCheck size={iconSize[size]} className="text-green-400" />
        ) : (
          <FiPlus size={iconSize[size]} className="text-white" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 ${sizeClasses[size]} bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded transition-all border border-white/40 active:scale-95 font-medium`}
    >
      {inList ? (
        <>
          <FiCheck size={iconSize[size]} className="text-green-400" />
          <span className="text-white">Tersimpan</span>
        </>
      ) : (
        <>
          <FiPlus size={iconSize[size]} className="text-white" />
          <span className="text-white">My List</span>
        </>
      )}
    </button>
  );
}

