'use client';

/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Link from 'next/link';
import { Product } from '@/src/lib/types';
import { useCartStore } from '@/src/lib/cart-store';
import { useFavoritesStore } from '@/src/lib/favorites-store';
import { formatPrice } from '@/src/lib/utils';
import { toast } from 'sonner';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem, openCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const fav = isFavorite(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, 1);
    openCart(); // abre el carrito directamente al agregar
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
    if (!fav) {
      toast.success('Agregado a favoritos');
    }
  };

  return (
    <Link href={`/productos/${product.id}`} className="product-card">
      <div className="image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <button
          className={`fav-btn ${fav ? 'active' : ''}`}
          onClick={handleFav}
          aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          title={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <i className={fav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
        </button>

        {product.isOffer && (
          <div style={{ position: 'absolute', top: 8, left: 8, background: '#ef4444', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 4 }}>
            OFERTA
          </div>
        )}
      </div>

      <div className="info">
        <div className="name">{product.name}</div>

        <div className="price-row">
          <span className="price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="actions">
          <button className="btn-add" onClick={handleAdd}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </Link>
  );
}
