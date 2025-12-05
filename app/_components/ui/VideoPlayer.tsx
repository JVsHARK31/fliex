'use client';

import { useState, useEffect } from 'react';
import { FiX, FiExternalLink, FiYoutube, FiPlay, FiAlertCircle } from 'react-icons/fi';
import { getLK21StreamingUrl } from '@/lib/lk21-api';

interface VideoPlayerProps {
  title: string;
  movieId?: string;
  videoUrl?: string;
  onClose: () => void;
}

export default function VideoPlayer({ title, movieId, videoUrl, onClose }: VideoPlayerProps) {
  const [selectedOption, setSelectedOption] = useState<'stream' | 'trailer' | 'info'>('stream');
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [isLoadingStream, setIsLoadingStream] = useState(true);

  useEffect(() => {
    async function loadStream() {
      if (movieId) {
        try {
          setIsLoadingStream(true);
          const url = await getLK21StreamingUrl(movieId);
          setStreamUrl(url);
        } catch (error) {
          console.error('Error loading stream:', error);
          setStreamUrl(null);
        } finally {
          setIsLoadingStream(false);
        }
      } else {
        setIsLoadingStream(false);
      }
    }
    loadStream();
  }, [movieId]);

  // Generate YouTube search URL untuk trailer
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' official trailer')}`;
  
  // Generate IMDB URL
  const imdbUrl = movieId ? `https://www.imdb.com/title/${movieId}` : null;
  
  // Streaming platform links
  const streamingLinks = [
    { name: 'Netflix', url: `https://www.netflix.com/search?q=${encodeURIComponent(title)}`, color: 'bg-red-600' },
    { name: 'Disney+', url: `https://www.disneyplus.com/search?q=${encodeURIComponent(title)}`, color: 'bg-blue-600' },
    { name: 'Prime Video', url: `https://www.primevideo.com/search?phrase=${encodeURIComponent(title)}`, color: 'bg-cyan-600' },
    { name: 'Apple TV+', url: `https://tv.apple.com/search?term=${encodeURIComponent(title)}`, color: 'bg-gray-700' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-4xl bg-netflix-darkGray rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-black/90 p-4 sm:p-6 flex items-center justify-between border-b border-gray-800">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold truncate pr-4">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedOption('stream')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                selectedOption === 'stream'
                  ? 'bg-netflix-red text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <FiPlay size={18} />
              <span>Streaming</span>
            </button>
            <button
              onClick={() => setSelectedOption('trailer')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                selectedOption === 'trailer'
                  ? 'bg-netflix-red text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <FiYoutube size={18} />
              <span>Trailer</span>
            </button>
            <button
              onClick={() => setSelectedOption('info')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedOption === 'info'
                  ? 'bg-netflix-red text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Platform
            </button>
          </div>

          {/* Stream Tab */}
          {selectedOption === 'stream' && (
            <div className="space-y-4">
              {isLoadingStream ? (
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red mb-4 mx-auto"></div>
                    <p className="text-white">Memuat player...</p>
                  </div>
                </div>
              ) : streamUrl ? (
                <>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={streamUrl}
                      title={title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      referrerPolicy="origin"
                    />
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-green-200 text-sm">
                      ✅ <strong>Streaming aktif!</strong> Jika video tidak muncul, coba refresh atau pilih tab lain.
                    </p>
                  </div>
                </>
              ) : (
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                  <div className="text-center p-6">
                    <FiAlertCircle className="mx-auto mb-4 text-yellow-500" size={48} />
                    <h3 className="text-white text-lg font-bold mb-2">
                      Stream Tidak Tersedia
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Coba tab &ldquo;Trailer&rdquo; atau &ldquo;Platform&rdquo; untuk opsi lain
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info Tab */}
          {selectedOption === 'info' && (
            <div className="space-y-6">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-200 text-sm">
                  ⚠️ <strong>Catatan:</strong> Untuk menonton film lengkap, silakan gunakan platform streaming resmi di bawah ini.
                </p>
              </div>

              {/* Streaming Platforms */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">
                  🎬 Tonton di Platform Resmi:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {streamingLinks.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${platform.color} text-white px-6 py-4 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-between group shadow-lg`}
                    >
                      <span>{platform.name}</span>
                      <FiExternalLink className="group-hover:translate-x-1 transition-transform" size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* IMDB Link */}
              {imdbUrl && (
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">
                    📊 Informasi Lengkap:
                  </h3>
                  <a
                    href={imdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-500 text-black px-6 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all flex items-center justify-between group shadow-lg"
                  >
                    <span>Lihat di IMDB</span>
                    <FiExternalLink className="group-hover:translate-x-1 transition-transform" size={18} />
                  </a>
                </div>
              )}

              {/* Alternative Info */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-2">💡 Tips:</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Gunakan platform resmi untuk kualitas terbaik dan mendukung pembuat film</li>
                  <li>• Cek tab &ldquo;Trailer&rdquo; untuk menonton cuplikan di YouTube</li>
                  <li>• Beberapa platform menawarkan free trial</li>
                </ul>
              </div>
            </div>
          )}

          {/* Trailer Tab */}
          {selectedOption === 'trailer' && (
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                <p className="text-gray-300 text-sm">
                  🎥 Menampilkan hasil pencarian trailer di YouTube untuk <strong className="text-white">{title}</strong>
                </p>
              </div>

              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(title + ' official trailer')}`}
                  title={`${title} Trailer`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <FiYoutube size={20} />
                  <span>Buka di YouTube</span>
                  <FiExternalLink size={16} />
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

