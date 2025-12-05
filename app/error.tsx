'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-netflix-red mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Terjadi Kesalahan
        </h2>
        <p className="text-gray-400 mb-8">
          Maaf, terjadi kesalahan saat memuat halaman ini. Silakan coba lagi.
        </p>
        <button
          onClick={reset}
          className="bg-netflix-red text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-80 transition-all"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}

