import { PRODUCTS, Product } from './products';
import { supabase, isSupabaseConfigured } from './supabase';

// ============================================================
// MAPPERS: DB (snake_case) <-> App (camelCase)
// ============================================================

function mapDbRowToProduct(row: any): Product {
  if (!row) return row;
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    category: row.category,
    image: row.image || 'https://via.placeholder.com/600x450/141414/3B82F6?text=Producto',
    images: Array.isArray(row.images) ? row.images : (row.images ? JSON.parse(row.images) : []),
    isNew: row.is_new ?? row.isNew ?? false,
    isPromo: row.is_promo ?? row.isPromo ?? false,
    subcategory: row.subcategory || 'general',
    stock: Number(row.stock ?? 0),
    features: Array.isArray(row.features) ? row.features : (row.features ? JSON.parse(row.features) : []),
    description: row.description || '',
    rating: row.rating != null ? Number(row.rating) : 4.5,
    reviews: row.reviews != null ? Number(row.reviews) : 0,
    originalPrice: row.original_price ?? row.originalPrice ?? undefined,
  };
}

function mapProductToDb(product: Product): any {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image,
    images: product.images || [],
    is_new: product.isNew,
    is_promo: product.isPromo,
    subcategory: product.subcategory,
    stock: product.stock,
    features: product.features || [],
    description: product.description,
    rating: product.rating ?? 4.5,
    reviews: product.reviews ?? 0,
    original_price: product.originalPrice ?? null,
  };
}

// Helper to get the current product list.
// Priority: Supabase (if configured) > localStorage admin edits > static PRODUCTS
export async function getProducts(): Promise<Product[]> {
  // 1. Try Supabase first (real database)
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped = data.map(mapDbRowToProduct);
        // Keep localStorage in sync so getProductsSync() and other tabs see the DB data
        if (typeof window !== 'undefined') {
          try { localStorage.setItem('adminProducts', JSON.stringify(mapped)); } catch {}
        }
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to localStorage/static', e);
    }
  }

  // 2. Fallback to localStorage (admin edits done in browser)
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('adminProducts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // localStorage ya está en formato camelCase del app
          return parsed;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // 3. Last resort: static data
  return PRODUCTS;
}

// Synchronous version for places that can't be async yet (homepage, etc.)
// It will use localStorage or static (Supabase will be loaded on client mount if needed)
export function getProductsSync(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('adminProducts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
  }
  return PRODUCTS;
}

// Export mappers for Admin panel (when doing direct Supabase upserts)
export { mapDbRowToProduct, mapProductToDb };

export function getProductById(id: string): Product | undefined {
  const all = getProductsSync();
  return all.find(p => p.id === id);
}
