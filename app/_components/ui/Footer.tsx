import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-netflix-black border-t border-netflix-gray mt-8 sm:mt-12 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-10 md:py-12">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <Image
              src="/logo.webp"
              alt="TheMoviesStream Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-netflix-red text-base sm:text-lg md:text-xl font-bold">TheMoviesStream</span>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  Account
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  Media Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  Investor Relations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  Jobs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  Ways to Watch
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  Cookie Preferences
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  Corporate Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
          <p>&copy; 2025 TheMoviesStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

