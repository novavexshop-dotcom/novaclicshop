'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/src/lib/cart-store';

export default function CarritoPage() {
  const router = useRouter();
  const { openCart } = useCartStore();

  useEffect(() => {
    // Prefer the slide-in cart experience
    openCart();
    // Redirect home so the sidebar is visible in context
    router.replace('/');
  }, [openCart, router]);

  return (
    <div className="app-main container" style={{ padding: '3rem 1rem' }}>
      <p>Redirigiendo al carrito lateral...</p>
    </div>
  );
}
