# TheMoviesStream - Fliex

A modern, Netflix-inspired movie and TV series streaming platform built with Next.js 14, TypeScript, and Tailwind CSS.

![TheMoviesStream](https://img.shields.io/badge/TheMoviesStream-2025-red)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🎬 Features

- ✅ **Browse Movies & Series** - Explore trending content by categories
- ✅ **Genre Filtering** - 18 genres including Action, Comedy, Horror, Sci-Fi, etc.
- ✅ **Search Functionality** - Find movies and series by title or keyword
- ✅ **Video Player** - Built-in player with fullscreen support
- ✅ **My List** - Save your favorite movies and series (localStorage)
- ✅ **Responsive Design** - Optimized for mobile, tablet, and desktop
- ✅ **Server-Side Rendering** - Fast performance with Next.js SSR
- ✅ **Beautiful UI** - Netflix-inspired interface with smooth animations

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/JVsHARK31/fliex.git
cd fliex
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (optional for API):
```env
NEXT_PUBLIC_RAPIDAPI_KEY=your_api_key_here
NEXT_PUBLIC_RAPIDAPI_HOST=streaming-availability.p.rapidapi.com
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Browse Content
- **Home**: View trending movies and series
- **Movies**: Browse movie catalog
- **Series**: Browse TV series catalog
- **Genre**: Filter by 18 different genres

### Search
- Use the search bar in header
- Search by movie/series title
- Results show instantly

### My List
- Click "+ My List" to save favorites
- Access from header icon or navigation
- Synced with localStorage

### Watch Content
- Click "Putar" (Play) button
- Fullscreen video player
- YouTube embed demo

## 📁 Project Structure

```
fliex/
├── app/
│   ├── _components/ui/        # Reusable UI components
│   ├── genre/                 # Genre pages
│   ├── movie/[id]/           # Movie detail page
│   ├── series/[id]/          # Series detail page
│   ├── search/               # Search page
│   ├── mylist/               # My List page
│   └── layout.tsx            # Root layout
├── lib/
│   ├── api.ts                # API service layer
│   ├── types.ts              # TypeScript types
│   ├── genres.ts             # Genre definitions
│   └── mockData.ts           # Demo data
├── store/
│   └── useAppStore.ts        # Zustand store
└── public/
    └── logo.webp             # App logo
```

## 🎨 Features Breakdown

### 1. Homepage
- Hero banner with featured content
- Multiple content rows (Trending, Popular, etc.)
- Smooth horizontal scrolling
- Responsive design

### 2. Genre Browse
- 18 genre categories with emojis
- Beautiful grid layout
- Click to view genre-specific content

### 3. Search
- Real-time search results
- Debounced input (500ms)
- Search by title, overview, or genre
- Empty state with CTA

### 4. Movie/Series Detail
- Full details (cast, directors, rating)
- Streaming options
- Related content
- Play button integration

### 5. Video Player
- Modal fullscreen player
- Close & maximize controls
- YouTube embed support
- Smooth animations

### 6. My List
- Save/remove favorites
- Badge counter in header
- Persistent storage (localStorage)
- Grid layout display

## 🔧 Configuration

### Tailwind Custom Colors
```js
colors: {
  netflix: {
    red: '#E50914',
    black: '#141414',
    darkGray: '#181818',
    gray: '#2F2F2F',
  },
}
```

### Environment Variables
```env
NEXT_PUBLIC_RAPIDAPI_KEY=      # RapidAPI key (optional)
NEXT_PUBLIC_RAPIDAPI_HOST=     # API host (optional)
```

## 📱 Responsive Breakpoints

```
xs:  475px   (Extra Small)
sm:  640px   (Small - Mobile)
md:  768px   (Medium - Tablet)
lg:  1024px  (Large - Laptop)
xl:  1280px  (Extra Large - Desktop)
```

## 🎭 Available Genres

💥 Action | 🗺️ Adventure | 🎨 Animation | 😂 Comedy | 🔫 Crime | 📽️ Documentary | 🎭 Drama | 👨‍👩‍👧‍👦 Family | 🧙‍♂️ Fantasy | 📜 History | 😱 Horror | 🎵 Music | 🔍 Mystery | ❤️ Romance | 🚀 Sci-Fi | 😨 Thriller | ⚔️ War | 🤠 Western

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod
```

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - Copyright © 2025 TheMoviesStream

## 👨‍💻 Author

**JVsHARK31**
- GitHub: [@JVsHARK31](https://github.com/JVsHARK31)

## 🙏 Acknowledgments

- Next.js Team for the amazing framework
- Vercel for hosting
- RapidAPI for streaming data API
- TMDB for movie images

---

**Built with ❤️ using Next.js & TypeScript**
