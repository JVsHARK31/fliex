import * as cheerio from 'cheerio';
import axios from 'axios';
import { Show, ShowDetails } from './types';
import { mockMovies, mockSeries } from './mockData';

// Base URLs
const LK21_URL = process.env.LK21_URL || 'https://tv.lk21official.live';
const ND_URL = process.env.ND_URL || 'https://tv.nontondrama.lol';

// Axios instance with User-Agent to avoid simple blocks
const client = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
});

/**
 * Helper to map LK21 structure to our Show interface
 */
function mapLK21ToShow(element: cheerio.Cheerio<any>, $: cheerio.CheerioAPI, type: 'movie' | 'series' = 'movie'): Show {
  const link = $(element).find('h2.entry-title a');
  const rawId = link.attr('href');
  // Extract slug as ID (remove domain)
  const id = rawId ? rawId.replace(/\/$/, '').split('/').pop() || '' : '';
  
  const title = link.text().trim();
  const posterUrl = $(element).find('img').attr('src') || '';
  const ratingText = $(element).find('.gmr-rating-item').text().trim();
  const yearText = $(element).find('.gmr-movie-on').text().trim(); // Adjust selector based on actual site

  // Use 'https:' prefix if missing
  const fullPosterUrl = posterUrl.startsWith('//') ? `https:${posterUrl}` : posterUrl;

  return {
    id,
    title,
    overview: '', // List view usually has no overview
    releaseYear: parseInt(yearText) || new Date().getFullYear(),
    firstAirYear: parseInt(yearText) || new Date().getFullYear(),
    originalTitle: title,
    genres: [], // List view usually has no genres details
    rating: parseFloat(ratingText) || 0,
    imageSet: {
      verticalPoster: {
        w240: fullPosterUrl,
        w360: fullPosterUrl,
        w480: fullPosterUrl,
        w600: fullPosterUrl,
        w720: fullPosterUrl,
      },
      horizontalPoster: {
        w360: fullPosterUrl,
        w480: fullPosterUrl,
        w720: fullPosterUrl,
        w1080: fullPosterUrl,
        w1440: fullPosterUrl,
      },
    },
    showType: type,
  };
}

/**
 * Get trending shows by scraping LK21 homepage
 */
export async function getTrending(
  type: 'movie' | 'series',
  country: string = 'us'
): Promise<Show[]> {
  try {
    // Use NontonDrama for series, LK21 for movies
    const url = type === 'series' ? ND_URL : LK21_URL;
    const { data } = await client.get(url);
    const $ = cheerio.load(data);
    const shows: Show[] = [];

    // Standard WP theme selector for movies
    $('article.item-infinite').each((i, el) => {
      if (i < 20) {
        shows.push(mapLK21ToShow($(el), $, type));
      }
    });

    if (shows.length === 0) {
      console.warn('No shows found via scraping, falling back to mock data');
      return type === 'movie' ? mockMovies : mockSeries;
    }

    return shows;
  } catch (error) {
    console.error(`Error scraping trending ${type}:`, error);
    return type === 'movie' ? mockMovies : mockSeries;
  }
}

/**
 * Search shows by keyword using scraping
 */
export async function searchByKeyword(
  query: string,
  country: string = 'us'
): Promise<Show[]> {
  try {
    const url = `${LK21_URL}/?s=${encodeURIComponent(query)}`;
    const { data } = await client.get(url);
    const $ = cheerio.load(data);
    const shows: Show[] = [];

    $('article.item-infinite').each((i, el) => {
      shows.push(mapLK21ToShow($(el), $));
    });

    if (shows.length === 0) {
       // Fallback to mock data search if scraping fails or yields no results
        const allMockData = [...mockMovies, ...mockSeries];
        return allMockData.filter(show => 
          show.title.toLowerCase().includes(query.toLowerCase()) ||
          show.originalTitle.toLowerCase().includes(query.toLowerCase())
        );
    }

    return shows;
  } catch (error) {
    console.error(`Error searching for "${query}":`, error);
    
    // Fallback to mock data search
    const allMockData = [...mockMovies, ...mockSeries];
    return allMockData.filter(show => 
      show.title.toLowerCase().includes(query.toLowerCase()) ||
      show.originalTitle.toLowerCase().includes(query.toLowerCase())
    );
  }
}

/**
 * Get details by scraping the detail page
 */
export async function getDetails(id: string): Promise<ShowDetails | null> {
  try {
    // Try fetching from LK21 (assuming ID is the slug)
    const url = `${LK21_URL}/${id}`; 
    const { data } = await client.get(url);
    const $ = cheerio.load(data);

    const title = $('h1.entry-title').text().trim();
    const posterUrl = $('.gmr-movie-data img').attr('src') || '';
    const fullPosterUrl = posterUrl.startsWith('//') ? `https:${posterUrl}` : posterUrl;
    const overview = $('.entry-content p').first().text().trim();
    const ratingText = $('.gmr-rating-value').text().trim();
    
    // Get genres
    const genres = $('.gmr-movie-genre a').map((i, el) => ({
      id: $(el).text().toLowerCase(),
      name: $(el).text()
    })).get();

    if (!title) return null;

    return {
      id,
      title,
      originalTitle: title,
      overview,
      releaseYear: new Date().getFullYear(), // Simplified
      genres,
      rating: parseFloat(ratingText) || 0,
      imageSet: {
        verticalPoster: {
          w240: fullPosterUrl,
          w360: fullPosterUrl,
          w480: fullPosterUrl,
          w600: fullPosterUrl,
          w720: fullPosterUrl,
        },
        horizontalPoster: {
          w360: fullPosterUrl,
          w480: fullPosterUrl,
          w720: fullPosterUrl,
          w1080: fullPosterUrl,
          w1440: fullPosterUrl,
        },
      },
      showType: 'movie', 
    };

  } catch (error) {
    console.error(`Error fetching details for ${id}:`, error);
    
    // Fallback to mock data
    const allMockData = [...mockMovies, ...mockSeries];
    const mock = allMockData.find(s => s.id === id);
    return mock ? { ...mock } : null;
  }
}

/**
 * Get shows by genre
 */
export async function getShowsByGenre(
  genre: string,
  type: 'movie' | 'series' = 'movie',
  country: string = 'us'
): Promise<Show[]> {
  try {
    // URL pattern: https://tv.lk21official.live/genre/action/
    const url = `${LK21_URL}/genre/${genre.toLowerCase()}`;
    const { data } = await client.get(url);
    const $ = cheerio.load(data);
    const shows: Show[] = [];

    $('article.item-infinite').each((i, el) => {
      shows.push(mapLK21ToShow($(el), $, type));
    });

    return shows;
  } catch (error) {
    console.error(`Error fetching genre ${genre}:`, error);
    return type === 'movie' ? mockMovies : mockSeries;
  }
}

/**
 * Get shows by filters (mapped to recent/trending)
 */
export async function getShowsByFilters(filters: any): Promise<Show[]> {
  // Reuse getTrending logic for simplicity in this scraping implementation
  return getTrending(filters.showType || 'movie');
}
