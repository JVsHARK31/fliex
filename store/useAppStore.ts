import { create } from 'zustand';
import { Show } from '@/lib/types';

interface AppState {
  myList: Show[];
  addToMyList: (show: Show) => void;
  removeFromMyList: (showId: string) => void;
  isInMyList: (showId: string) => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  myList: [],
  
  addToMyList: (show) => {
    set((state) => ({
      myList: [...state.myList, show],
    }));
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('myList', JSON.stringify([...get().myList, show]));
    }
  },
  
  removeFromMyList: (showId) => {
    set((state) => ({
      myList: state.myList.filter((show) => show.id !== showId),
    }));
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const newList = get().myList.filter((show) => show.id !== showId);
      localStorage.setItem('myList', JSON.stringify(newList));
    }
  },
  
  isInMyList: (showId) => {
    return get().myList.some((show) => show.id === showId);
  },
}));

// Initialize from localStorage
if (typeof window !== 'undefined') {
  const savedList = localStorage.getItem('myList');
  if (savedList) {
    try {
      const parsedList = JSON.parse(savedList);
      useAppStore.setState({ myList: parsedList });
    } catch (error) {
      console.error('Error loading myList from localStorage:', error);
    }
  }
}

