export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // for offers
  category: 'arduino' | 'celular' | 'computadora';
  subcategory?: 'placas' | 'sensores' | 'actuadores' | 'carga' | 'audio-cel' | 'proteccion' | 'perifericos' | 'audio-pc' | 'almacenamiento';
  image: string;
  description: string;
  stock: number;
  rating?: number;
  featured?: boolean;
  isOffer?: boolean;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface FavoriteItem {
  productId: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  district: string;
  notes?: string;
  yapeOpNumber: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  date: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export interface FilterState {
  category?: 'arduino' | 'celular' | 'computadora' | 'all';
  subcategory?: string;
  search?: string;
  sort?: SortOption;
}
