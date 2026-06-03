'use client';

/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductDetail from '@/src/components/product/ProductDetail';
import { getProductById, products } from '@/src/lib/products';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = parseInt(params.id as string, 10);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="app-main container" style={{ paddingTop: '2rem' }}>
        <button className="btn-back" onClick={() => router.back()}>
          <i className="fa-solid fa-arrow-left"></i> Volver
        </button>
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h2>Producto no encontrado</h2>
          <p style={{ color: 'var(--text-secondary)' }}>El producto que buscas no existe o fue removido.</p>
          <Link href="/productos" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
            Ver catálogo completo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-main container">
      <div className="layout-wrapper" style={{ gridTemplateColumns: '1fr' }}>
        <section className="content-viewport">
          <div id="view-detail" className="app-view active">
            <button className="btn-back" id="btn-back-to-catalog" onClick={() => router.back()}>
              <i className="fa-solid fa-arrow-left"></i> Volver a la lista
            </button>

            <ProductDetail product={product} />

            {/* Related simple */}
            <div style={{ marginTop: '3rem' }}>
              <div className="section-title-wrapper">
                <h2 className="section-title" style={{ fontSize: '1.15rem' }}>También te puede interesar</h2>
                <div className="title-line"></div>
              </div>
              <div className="products-grid">
                {products
                  .filter((p) => p.id !== product.id && p.category === product.category)
                  .slice(0, 4)
                  .map((p) => (
                    <Link key={p.id} href={`/productos/${p.id}`} className="product-card" style={{ maxWidth: 180 }}>
                      <div className="image-wrap" style={{ aspectRatio: '1.1' }}>
                        <img src={p.image} alt={p.name} />
                      </div>
                      <div className="info" style={{ padding: '0.6rem 0.7rem' }}>
                        <div className="name" style={{ fontSize: 13.5 }}>{p.name}</div>
                        <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 13.5 }}>{(p.price).toFixed(2)} S/</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
