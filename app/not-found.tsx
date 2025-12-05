import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-netflix-red mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <Link
          href="/"
          className="inline-block bg-netflix-red text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-80 transition-all"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

