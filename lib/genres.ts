// Genre definitions untuk filter
export const GENRES = [
  { id: 'action', name: 'Action', emoji: '💥' },
  { id: 'adventure', name: 'Adventure', emoji: '🗺️' },
  { id: 'animation', name: 'Animation', emoji: '🎨' },
  { id: 'comedy', name: 'Comedy', emoji: '😂' },
  { id: 'crime', name: 'Crime', emoji: '🔫' },
  { id: 'documentary', name: 'Documentary', emoji: '📽️' },
  { id: 'drama', name: 'Drama', emoji: '🎭' },
  { id: 'family', name: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { id: 'fantasy', name: 'Fantasy', emoji: '🧙‍♂️' },
  { id: 'history', name: 'History', emoji: '📜' },
  { id: 'horror', name: 'Horror', emoji: '😱' },
  { id: 'music', name: 'Music', emoji: '🎵' },
  { id: 'mystery', name: 'Mystery', emoji: '🔍' },
  { id: 'romance', name: 'Romance', emoji: '❤️' },
  { id: 'scifi', name: 'Sci-Fi', emoji: '🚀' },
  { id: 'thriller', name: 'Thriller', emoji: '😨' },
  { id: 'war', name: 'War', emoji: '⚔️' },
  { id: 'western', name: 'Western', emoji: '🤠' },
];

export function getGenreById(id: string) {
  return GENRES.find(genre => genre.id === id);
}

export function getGenreName(id: string): string {
  const genre = getGenreById(id);
  return genre ? genre.name : id;
}

export function getGenreEmoji(id: string): string {
  const genre = getGenreById(id);
  return genre ? genre.emoji : '🎬';
}

