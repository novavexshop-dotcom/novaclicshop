'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/lib/products';
import { getProducts, getProductsSync } from '@/lib/getProducts';
import ProductCard from '@/components/product/ProductCard';
import { Search, X } from 'lucide-react';

// Forzar renderizado dinámico porque usamos useSearchParams
export const dynamic = 'force-dynamic';

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'newest';

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const [allProducts, setAllProducts] = useState<Product[]>(getProductsSync());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [showOffersOnly, setShowOffersOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [isLoading, setIsLoading] = useState(false);

  // Load products (from Supabase if configured, otherwise localStorage/static)
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    getProducts().then((products) => {
      if (mounted) {
        setAllProducts(products);
        setIsLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  // Leer parámetros de la URL (para que la búsqueda desde el Header funcione)
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }

    const urlCategory = searchParams.get('category');
    if (urlCategory && ['arduino', 'celular', 'computadora'].includes(urlCategory)) {
      setSelectedCategory(urlCategory);
    }
  }, [searchParams]);

  const categories = [
    { id: 'arduino', label: 'Arduino & Electrónica' },
    { id: 'celular', label: 'Celulares & Accesorios' },
    { id: 'computadora', label: 'Computadoras & Gaming' },
  ];

  // Get available subcategories for the selected category (or all if none selected)
  const availableSubcategories = useMemo(() => {
    let filtered = allProducts;
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    const subs = Array.from(new Set(filtered.map(p => p.subcategory)));
    return subs.sort();
  }, [selectedCategory, allProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    // Search filter - busca en todo (nombre, descripción, features, subcategoría y categoría)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const words = q.split(/\s+/).filter(Boolean);

      result = result.filter(p => {
        const catLabel = categories.find(c => c.id === p.category)?.label.toLowerCase() || '';
        const searchable = [
          p.name,
          p.description,
          p.subcategory,
          catLabel,
          ...p.features
        ].join(' ').toLowerCase();

        // Coincide con la frase completa
        if (searchable.includes(q)) return true;

        // O si todas las palabras de la búsqueda están presentes (útil para búsquedas multi-palabra)
        return words.every(word => searchable.includes(word));
      });
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Subcategory filter (multi)
    if (selectedSubcategories.length > 0) {
      result = result.filter(p => selectedSubcategories.includes(p.subcategory));
    }

    // Offers only
    if (showOffersOnly) {
      result = result.filter(p => p.isPromo);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'relevance':
      default:
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSubcategories, showOffersOnly, sortBy]);

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedSubcategories([]);
    setShowOffersOnly(false);
    setSortBy('relevance');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedSubcategories.length > 0 || showOffersOnly || sortBy !== 'relevance';

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] pt-20">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-semibold tracking-[-2px] mb-2">Catálogo</h1>
          <p className="text-[#71717A]">Encuentra lo que necesitas. Catálogo en crecimiento.</p>
        </div>

        {/* Filters Bar - Más limpio y ordenado (inspirado en tiendas como Temu) */}
        <div className="mb-8 space-y-4">
          {/* Search - Más prominente y con botón para limpiar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos (nombre, descripción, características, subcategoría...)"
              className="input w-full bg-[#141414] border-white/10 pl-11 pr-10 text-base"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white"
                aria-label="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Main Categories + Ofertas - Fila limpia */}
          <div className="flex flex-wrap items-center gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  const newCat = selectedCategory === cat.id ? null : cat.id;
                  setSelectedCategory(newCat);
                  setSelectedSubcategories([]); // reset subs al cambiar categoría
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#3B82F6] text-white border-[#3B82F6]'
                    : 'border-white/15 hover:border-white/30 bg-[#141414] text-[#F4F4F5]'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <button
              onClick={() => setShowOffersOnly(!showOffersOnly)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all border flex items-center gap-2 whitespace-nowrap ${
                showOffersOnly
                  ? 'bg-[#F59E0B] text-[#0A0A0A] border-[#F59E0B]'
                  : 'border-white/15 hover:border-white/30 bg-[#141414] text-[#F4F4F5]'
              }`}
            >
              En oferta
            </button>

            {/* Sort - movido aquí para que esté más ordenado */}
            <div className="ml-auto flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="input bg-[#141414] border-white/10 text-sm py-2 min-w-[200px] font-medium"
              >
                <option value="relevance">Relevancia</option>
                <option value="price-low">Precio: menor → mayor</option>
                <option value="price-high">Precio: mayor → menor</option>
                <option value="newest">Más nuevos primero</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/5 flex items-center gap-1.5 transition"
                >
                  Limpiar todo <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Subcategorías - Solo cuando hay categoría seleccionada (más limpio) */}
          {selectedCategory && availableSubcategories.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-widest text-[#71717A] mb-2 font-mono">Filtrar por subcategoría</div>
              <div className="flex flex-wrap gap-2">
                {availableSubcategories.map(sub => (
                  <button
                    key={sub}
                    onClick={() => toggleSubcategory(sub)}
                    className={`px-4 py-1.5 text-sm rounded-full border transition ${
                      selectedSubcategories.includes(sub)
                        ? 'bg-white text-[#0A0A0A] border-white'
                        : 'border-white/15 hover:border-white/40 text-[#F4F4F5] bg-[#141414]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Nota de futuro */}
          <div className="text-xs text-[#71717A]">
            Más categorías y subcategorías se agregarán pronto.
          </div>
        </div>

        {/* Results count + resumen de filtros */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 text-sm gap-2 text-[#71717A]">
          <div>
            <span className="font-medium text-[#F4F4F5]">{filteredAndSortedProducts.length}</span> productos
            {selectedCategory && ` • ${categories.find(c => c.id === selectedCategory)?.label}`}
            {selectedSubcategories.length > 0 && ` • ${selectedSubcategories.join(' + ')}`}
            {showOffersOnly && ` • Solo ofertas`}
          </div>
          {searchQuery && (
            <div className="text-xs">Resultados para “{searchQuery}”</div>
          )}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12 text-[#71717A]">Cargando productos...</div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-white/10 rounded-2xl">
            <p className="text-xl mb-2">No encontramos productos</p>
            <p className="text-[#71717A] mb-6">Prueba con otra búsqueda o categoría.</p>
            <button onClick={clearFilters} className="btn-secondary">
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
