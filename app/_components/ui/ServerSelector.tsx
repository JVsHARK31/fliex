'use client';

import { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

interface Server {
  name: string;
  url: string;
  description: string;
}

interface ServerSelectorProps {
  movieId: string;
  onSelectServer: (url: string) => void;
}

export default function ServerSelector({ movieId, onSelectServer }: ServerSelectorProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Daftar embed servers yang proven work dengan IMDB ID
  const servers: Server[] = [
    {
      name: 'VidSrc.xyz',
      url: `https://vidsrc.xyz/embed/movie/${movieId}`,
      description: 'Fast & Reliable',
    },
    {
      name: 'VidSrc.to',
      url: `https://vidsrc.to/embed/movie/${movieId}`,
      description: 'HD Quality',
    },
    {
      name: 'VidSrc.me',
      url: `https://vidsrc.me/embed/movie?imdb=${movieId}`,
      description: 'Multi-Source',
    },
    {
      name: 'SuperEmbed',
      url: `https://multiembed.mov/?video_id=${movieId}&tmdb=1`,
      description: 'Auto-Select',
    },
    {
      name: '2Embed',
      url: `https://www.2embed.cc/embed/${movieId}`,
      description: 'Multiple Servers',
    },
  ];

  const handleSelectServer = (index: number) => {
    setSelectedIndex(index);
    onSelectServer(servers[index].url);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white text-sm font-medium"
        title="Ganti Server"
      >
        <FiRefreshCw size={16} />
        <span className="hidden sm:inline">Server {selectedIndex + 1}</span>
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[90]" 
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl min-w-[240px] overflow-hidden z-[91]">
            <div className="p-2">
              <p className="text-white text-xs font-semibold mb-2 px-2">
                Pilih Server Streaming:
              </p>
              {servers.map((server, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectServer(index)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    index === selectedIndex
                      ? 'bg-netflix-red text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="font-medium">{server.name}</div>
                  <div className="text-xs opacity-70">{server.description}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

