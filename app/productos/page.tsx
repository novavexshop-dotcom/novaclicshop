'use client';

import React, { useMemo, Suspense } from 'react';

export const dynamic = 'force-dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/src/components/product/ProductCard';
import CategorySidebar from '@/src/components/product/CategorySidebar';
import { products } from '@/src/lib/products';
import { SortOption } from '@/src/lib/types';
import { filterAndSortProducts } from '@/src/lib/utils';

function ProductosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Derive filter state directly from URL search params (no local state + no syncing effect)
  const categoryParam = searchParams.get('category');
  const category: 'all' | 'arduino' | 'celular' | 'computadora' =
    (categoryParam === 'arduino' || categoryParam === 'celular' || categoryParam === 'computadora')
      ? categoryParam
      : 'all';

  const subcategory = searchParams.get('subcategory') || undefined;

  const searchTerm = searchParams.get('search') || '';

  const sortParam = searchParams.get('sort') as SortOption | null;
  const sort: SortOption =
    (sortParam === 'price-asc' || sortParam === 'price-desc' || sortParam === 'name-asc')
      ? sortParam
      : 'featured';

  const offerFilter = searchParams.get('filter') === 'ofertas';

  // Update URL when filters change (this drives the derived values on next render)
  const updateFilters = (updates: Partial<{ category: string; subcategory?: string; search: string; sort: string }>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.category !== undefined) {
      if (updates.category === 'all') params.delete('category');
      else params.set('category', updates.category);
      params.delete('subcategory'); // reset sub when top cat changes
    }
    if (updates.subcategory !== undefined) {
      if (!updates.subcategory) params.delete('subcategory');
      else params.set('subcategory', updates.subcategory);
    }
    if (updates.search !== undefined) {
      if (!updates.search) params.delete('search');
      else params.set('search', updates.search);
    }
    if (updates.sort !== undefined) {
      if (updates.sort === 'featured') params.delete('sort');
      else params.set('sort', updates.sort);
    }

    // Remove filter if not offers
    if (updates.category || updates.subcategory) params.delete('filter');

    router.replace(`/productos?${params.toString()}`, { scroll: false });
  };

  // Special offers filter + main list (now purely derived from URL)
  const effectiveProducts = useMemo(() => {
    let base = products;

    if (offerFilter) {
      base = base.filter((p) => p.isOffer);
    }

    return filterAndSortProducts(base, {
      category: category === 'all' ? undefined : category,
      subcategory,
      search: searchTerm,
      sort,
    });
  }, [category, subcategory, searchTerm, sort, offerFilter]);

  const handleCategory = (cat: string) => {
    const validCat = (cat === 'arduino' || cat === 'celular' || cat === 'computadora') ? cat : 'all';
    updateFilters({ category: validCat, subcategory: undefined });
  };

  const handleSubcategory = (sub: string) => {
    updateFilters({ subcategory: sub });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortOption;
    updateFilters({ sort: newSort });
  };

  const clearAllFilters = () => {
    router.replace('/productos');
  };

  const removeFilter = (type: string) => {
    if (type === 'category') {
      updateFilters({ category: 'all', subcategory: undefined });
    }
    if (type === 'subcategory') {
      updateFilters({ subcategory: undefined });
    }
    if (type === 'search') {
      updateFilters({ search: '' });
    }
    if (type === 'ofertas') {
      router.replace('/productos');
    }
  };

  // Active filter tags
  const activeTags: { label: string; type: string }[] = [];
  if (category !== 'all') activeTags.push({ label: category.charAt(0).toUpperCase() + category.slice(1), type: 'category' });
  if (subcategory) activeTags.push({ label: subcategory, type: 'subcategory' });
  if (searchTerm) activeTags.push({ label: `“${searchTerm}”`, type: 'search' });
  if (offerFilter) activeTags.push({ label: 'Ofertas', type: 'ofertas' });

  let title = category === 'all' ? 'Todos los Productos' : 
    category === 'arduino' ? 'Arduino y Robótica' :
    category === 'celular' ? 'Accesorios para Celular' : 'Accesorios para Computadora';

  let subtitle = subcategory 
    ? `Mostrando ${subcategory}` 
    : searchTerm 
      ? `Resultados para “${searchTerm}”` 
      : 'Explora nuestra colección tecnológica';

  if (offerFilter && category === 'all' && !subcategory && !searchTerm) {
    title = 'Ofertas Especiales';
    subtitle = 'Productos en promoción';
  }

  return (
    <div className="app-main container">
      <div className="layout-wrapper">
        <CategorySidebar
          activeCategory={category}
          activeSubcategory={subcategory}
          onSelectCategory={handleCategory}
          onSelectSubcategory={handleSubcategory}
        />

        <section className="content-viewport">
          <div id="view-catalog" className="app-view active">
            <div className="catalog-header">
              <div className="catalog-title-block">
                <h2 id="catalog-title">{title}</h2>
                <p id="catalog-subtitle">{subtitle}</p>
              </div>

              <div className="catalog-filters">
                <label htmlFor="sort-select" style={{ marginRight: 6, fontSize: 13, color: 'var(--text-secondary)' }}>Ordenar por:</label>
                <select
                  id="sort-select"
                  className="sort-select"
                  value={sort}
                  onChange={handleSortChange}
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name-asc">Nombre: A - Z</option>
                </select>
              </div>
            </div>

            {/* Active filters */}
            {activeTags.length > 0 && (
              <div className="active-filters-bar" id="active-filters">
                {activeTags.map((tag, i) => (
                  <span key={i} className="filter-tag">
                    {tag.label}
                    <button onClick={() => removeFilter(tag.type)}>×</button>
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  style={{ fontSize: 12, background: 'transparent', border: '1px solid var(--border-color)', color: '#888', padding: '1px 8px', borderRadius: 999, marginLeft: 4 }}
                >
                  Limpiar todo
                </button>
              </div>
            )}

            {/* Grid */}
            {effectiveProducts.length > 0 ? (
              <div className="products-grid" id="catalog-products-grid">
                {effectiveProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="no-results" id="no-results-view">
                <i className="fa-solid fa-magnifying-glass-minus"></i>
                <h3>No encontramos productos</h3>
                <p>Intenta buscando con otros términos o seleccionando otra categoría.</p>
                <button className="btn-primary" id="btn-clear-filters" onClick={clearAllFilters}>
                  Ver todos los productos
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ProductosPage() {
  return (
    <Suspense fallback={<div className="app-main container">Cargando catálogo...</div>}>
      <ProductosContent />
    </Suspense>
  );
}

