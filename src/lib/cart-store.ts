import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from './types';
import { products } from './products';

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (productId: number, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  // UI
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed (selectors)
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemCount: (productId: number) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (productId, quantity = 1) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        set((state) => {
          const existing = state.items.findIndex((i) => i.productId === productId);

          if (existing !== -1) {
            const updated = [...state.items];
            const newQty = Math.min(updated[existing].quantity + quantity, product.stock);
            updated[existing] = { ...updated[existing], quantity: newQty };
            return { items: updated };
          } else {
            const newItem: CartItem = {
              productId,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: Math.min(quantity, product.stock),
            };
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        const product = products.find((p) => p.id === productId);
        const max = product ? product.stock : 99;

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.min(quantity, max) }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      // Selectors
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      getItemCount: (productId) => {
        const item = get().items.find((i) => i.productId === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'novaclicshop-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // only persist items
    }
  )
);
