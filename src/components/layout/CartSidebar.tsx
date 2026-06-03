'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useEffect } from 'react';
import { useCartStore } from '@/src/lib/cart-store';
import { formatPrice } from '@/src/lib/utils';
import { useRouter } from 'next/navigation';

export default function CartSidebar() {
  const router = useRouter();
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCartStore();

  const total = getTotalPrice();

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <div
        id="cart-overlay"
        className={`cart-sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div id="cart-sidebar" className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h3>
            <i className="fa-solid fa-cart-shopping"></i> Tu Carrito
          </h3>
          <button className="btn-close-cart" id="btn-close-cart" onClick={closeCart}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Items */}
        <div className="cart-items-container" id="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart-state" id="empty-cart">
              <i className="fa-solid fa-basket-shopping"></i>
              <p>Tu carrito está vacío</p>
              <button
                className="btn-primary btn-shop-now"
                id="btn-shop-now"
                onClick={() => {
                  closeCart();
                  router.push('/productos');
                }}
              >
                Comenzar a comprar
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <div className="name">{item.name}</div>
                  <div className="price">{formatPrice(item.price)} c/u</div>

                  <div className="cart-item-qty">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      aria-label="Disminuir"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: 4 }}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.productId)}
                    aria-label="Eliminar"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-sidebar-footer" id="cart-footer">
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Total del Pedido:</span>
                <strong id="cart-total-value">{formatPrice(total)}</strong>
              </div>
              <p className="shipping-info">
                <i className="fa-solid fa-circle-info"></i> Envío gratuito incluido a todo el Distrito de Santa Lucía.
              </p>
            </div>

            <button className="btn-checkout" id="btn-go-to-checkout" onClick={handleCheckout}>
              Proceder al Pago <i className="fa-solid fa-arrow-right"></i>
            </button>

            <button
              onClick={clearCart}
              style={{
                width: '100%',
                marginTop: '8px',
                background: 'transparent',
                color: '#888',
                fontSize: '12.5px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
