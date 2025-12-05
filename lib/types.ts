// TypeScript Type Definitions untuk API Response

export interface StreamingOption {
  service: {
    id: string;
    name: string;
    imageSet: {
      lightThemeImage: string;
      darkThemeImage: string;
    };
  };
  type: string;
  link: string;
  quality?: string;
  audios?: Array<{
    language: string;
  }>;
  subtitles?: Array<{
    language: string;
  }>;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Director {
  id: string;
  name: string;
}

export interface Cast {
  id: string;
  name: string;
}

export interface Show {
  id: string;
  title: string;
  overview: string;
  releaseYear?: number;
  firstAirYear?: number;
  lastAirYear?: number;
  originalTitle: string;
  genres: Genre[];
  directors?: Director[];
  cast?: Cast[];
  rating?: number;
  imageSet: {
    verticalPoster: {
      w240: string;
      w360: string;
      w480: string;
      w600: string;
      w720: string;
    };
    horizontalPoster: {
      w360: string;
      w480: string;
      w720: string;
      w1080: string;
      w1440: string;
    };
    verticalBackdrop?: {
      w240: string;
      w360: string;
      w480: string;
      w600: string;
      w720: string;
    };
    horizontalBackdrop?: {
      w360: string;
      w480: string;
      w720: string;
      w1080: string;
      w1440: string;
    };
  };
  streamingOptions?: {
    [country: string]: StreamingOption[];
  };
  showType: 'movie' | 'series';
  seasonCount?: number;
  episodeCount?: number;
}

export interface ShowDetails extends Show {
  tagline?: string;
  creators?: Array<{
    id: string;
    name: string;
  }>;
  runtime?: number;
}

export interface APIResponse {
  shows: Show[];
  hasMore: boolean;
  nextCursor?: string;
}

export interface SearchResponse {
  shows: Show[];
  hasMore: boolean;
  nextCursor?: string;
}

