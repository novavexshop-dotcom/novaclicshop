'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { Product } from '@/src/lib/types';
import { useCartStore } from '@/src/lib/cart-store';
import { useFavoritesStore } from '@/src/lib/favorites-store';
import { formatPrice } from '@/src/lib/utils';
import { toast } from 'sonner';

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const [qty, setQty] = useState(1);
  const { addItem, openCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const fav = isFavorite(product.id);

  const handleAdd = () => {
    addItem(product.id, qty);
    openCart(); // abre el carrito directamente al agregar
  };

  const handleFav = () => {
    toggleFavorite(product.id);
    toast(fav ? 'Eliminado de favoritos' : 'Agregado a favoritos');
  };

  return (
    <div className="product-detail-container" id="product-detail-content">
      <div className="detail-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="detail-info">
        <h1>{product.name}</h1>

        <div className="detail-price">
          {formatPrice(product.price)}
          {product.originalPrice && <span className="original">{formatPrice(product.originalPrice)}</span>}
        </div>

        <div className="detail-meta">
          <span>Stock: <strong className="stock">{product.stock} unidades</strong></span>
          {product.rating && <span>★ {product.rating}</span>}
          <span style={{ color: 'var(--text-secondary)' }}>{product.category}</span>
        </div>

        <p className="detail-description">{product.description}</p>

        <div className="qty-selector">
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Cantidad:</span>
          <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(Math.min(product.stock, qty + 1))}>+</button>
        </div>

        <div className="detail-actions">
          <button className="btn-primary" onClick={handleAdd} style={{ padding: '12px 26px', fontSize: 15 }}>
            <i className="fa-solid fa-cart-plus"></i> Agregar al carrito
          </button>

          <button
            onClick={handleFav}
            style={{
              padding: '0 18px',
              border: '1px solid var(--border-color)',
              background: fav ? '#3f1f1f' : 'transparent',
              color: fav ? '#ef4444' : 'var(--text-primary)',
              borderRadius: 999,
              fontSize: 15,
              cursor: 'pointer',
            }}
            title={fav ? 'Quitar favorito' : 'Agregar a favoritos'}
          >
            <i className={fav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
          </button>
        </div>

        <div style={{ marginTop: '1.6rem', fontSize: 13, color: 'var(--text-secondary)' }}>
          <strong>Envío gratis</strong> a todo el distrito de Santa Lucía. Pago con Yape o efectivo.
        </div>
      </div>
    </div>
  );
}
