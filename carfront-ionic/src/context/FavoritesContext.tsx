import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { Preferences } from '@capacitor/preferences';
import { Car } from '../api/cars';

interface FavoritesContextValue {
  favorites: Car[];
  toggleFavorite: (car: Car) => Promise<void>;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);
const FAVORITES_KEY = 'carapp_favorites';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Car[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        let storedValue: string | null = null;
        try {
          const stored = await Preferences.get({ key: FAVORITES_KEY });
          storedValue = stored.value;
        } catch {
          storedValue = localStorage.getItem(FAVORITES_KEY);
        }
        if (storedValue) {
          setFavorites(JSON.parse(storedValue));
        }
      } catch (err) {
        console.error('Favorite load error', err);
      }
    };

    loadFavorites();
  }, []);

  const persist = async (list: Car[]) => {
    setFavorites(list);
    try {
      await Preferences.set({ key: FAVORITES_KEY, value: JSON.stringify(list) });
    } catch {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
    }
  };

  const toggleFavorite = useCallback(
    async (car: Car) => {
      const exists = favorites.some((item) => item._id === car._id);
      const updated = exists
        ? favorites.filter((item) => item._id !== car._id)
        : [...favorites, car];
      await persist(updated);
    },
    [favorites],
  );

  const isFavorite = useCallback(
    (id: string) => favorites.some((item) => item._id === id),
    [favorites],
  );

  const clearFavorites = useCallback(async () => {
    await persist([]);
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    }),
    [clearFavorites, favorites, isFavorite, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }
  return ctx;
};

