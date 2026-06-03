'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from 'react';
import { useFavoritesStore } from '@/src/lib/favorites-store';
import { useCartStore } from '@/src/lib/cart-store';
import { formatPrice } from '@/src/lib/utils';
import { Product } from '@/src/lib/types';

export default function FavoritesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { getFavoriteProducts, toggleFavorite, clearFavorites } = useFavoritesStore();
  const { addItem, openCart } = useCartStore();

  const favProducts: Product[] = getFavoriteProducts();

  // Listen for global open event dispatched from Header
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener('open-favorites', openHandler);
    return () => window.removeEventListener('open-favorites', openHandler);
  }, []);

  const handleAdd = (p: Product) => {
    addItem(p.id, 1);
    // cierra favoritos y abre el carrito directamente (sin notificación)
    setIsOpen(false);
    setTimeout(() => {
      openCart();
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 95,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          width: '92%',
          maxWidth: '520px',
          maxHeight: '78vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fa-solid fa-heart" style={{ color: '#ef4444' }}></i> Mis Favoritos ({favProducts.length})
          </h3>
          <button onClick={() => setIsOpen(false)} style={{ fontSize: 22, background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ padding: '1rem', overflowY: 'auto', flex: 1 }}>
          {favProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-secondary)' }}>
              <i className="fa-regular fa-heart" style={{ fontSize: 42, marginBottom: 10 }}></i>
              <p>No tienes productos favoritos aún.</p>
              <p style={{ fontSize: 13 }}>Agrega corazones en las tarjetas de productos.</p>
            </div>
          ) : (
            favProducts.map((p) => (
              <div key={p.id} style={{ display: 'flex', gap: '0.9rem', padding: '0.6rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <img src={p.image} alt={p.name} style={{ width: 62, height: 62, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border-color)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14.5 }}>{p.name}</div>
                  <div style={{ color: 'var(--accent)', fontWeight: 600 }}>{formatPrice(p.price)}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
                  <button
                    onClick={() => handleAdd(p)}
                    className="btn-primary"
                    style={{ fontSize: 12, padding: '5px 12px' }}
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => toggleFavorite(p.id)}
                    style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {favProducts.length > 0 && (
          <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={clearFavorites}
              style={{ background: 'transparent', color: '#888', fontSize: 13, border: 'none', cursor: 'pointer' }}
            >
              Limpiar favoritos
            </button>
            <button onClick={() => setIsOpen(false)} className="btn-primary" style={{ fontSize: 13, padding: '7px 16px' }}>
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
