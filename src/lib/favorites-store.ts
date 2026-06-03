import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from './types';
import { products } from './products';

interface FavoritesState {
  favoriteIds: number[];

  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  getFavoriteCount: () => number;
  getFavoriteProducts: () => Product[];
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      toggleFavorite: (productId) => {
        set((state) => {
          if (state.favoriteIds.includes(productId)) {
            return {
              favoriteIds: state.favoriteIds.filter((id) => id !== productId),
            };
          } else {
            return {
              favoriteIds: [...state.favoriteIds, productId],
            };
          }
        });
      },

      isFavorite: (productId) => get().favoriteIds.includes(productId),

      getFavoriteCount: () => get().favoriteIds.length,

      getFavoriteProducts: () => {
        const ids = get().favoriteIds;
        return products.filter((p) => ids.includes(p.id));
      },

      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    {
      name: 'novaclicshop-favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
