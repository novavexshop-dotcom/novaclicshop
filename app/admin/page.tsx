'use client';

import React from 'react';
import { products } from '@/src/lib/products';
import { toast } from 'sonner';

export default function AdminPage() {
  const totalProducts = products.length;
  const offers = products.filter(p => p.isOffer).length;
  const lowStock = products.filter(p => p.stock < 20).length;

  return (
    <div className="app-main container" style={{ paddingTop: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>Panel Admin <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>(Demo)</span></h1>
        <button className="btn-primary" onClick={() => toast('Funcionalidad de agregar producto (demo)')}><i className="fa-solid fa-plus"></i> Nuevo Producto</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="sidebar-card"><strong>{totalProducts}</strong><div style={{ color: 'var(--text-secondary)' }}>Productos</div></div>
        <div className="sidebar-card"><strong>{offers}</strong><div style={{ color: 'var(--text-secondary)' }}>En Oferta</div></div>
        <div className="sidebar-card"><strong>{lowStock}</strong><div style={{ color: 'var(--text-secondary)' }}>Stock Bajo</div></div>
        <div className="sidebar-card"><strong>12</strong><div style={{ color: 'var(--text-secondary)' }}>Pedidos Hoy (demo)</div></div>
      </div>

      <div className="checkout-form-container">
        <h3 style={{ marginTop: 0 }}>Productos Actuales (Vista Demo)</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '6px 4px' }}>ID</th>
                <th>Nombre</th>
                <th>Cat / Sub</th>
                <th>Precio</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 8).map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 4px', color: 'var(--text-secondary)' }}>{p.id}</td>
                  <td>{p.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{p.category} / {p.subcategory}</td>
                  <td>S/ {p.price}</td>
                  <td style={{ color: p.stock < 20 ? '#f66' : 'inherit' }}>{p.stock}</td>
                  <td>
                    <button onClick={() => toast.info(`Editar ${p.name} (demo)`)} style={{ fontSize: 12, background: 'none', border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: 4, cursor: 'pointer' }}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: '1rem' }}>Admin completo (crear/editar/eliminar + pedidos + reportes) se implementará con Supabase backend.</p>
      </div>
    </div>
  );
}
