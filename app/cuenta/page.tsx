'use client';

import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CuentaPage() {
  return (
    <div className="app-main container" style={{ paddingTop: '1.5rem', maxWidth: 860 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="logo-icon" style={{ width: 48, height: 48 }}><i className="fa-solid fa-user"></i></div>
        <div>
          <h1 style={{ margin: 0 }}>Mi Cuenta</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Bienvenido, Cliente Demo</p>
        </div>
      </div>

      <div className="layout-wrapper" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <aside style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 12, border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <li><a href="#" onClick={() => toast.info('Sección de perfil (demo)')} style={{ display: 'block', padding: '8px 12px', borderRadius: 8, background: 'var(--bg-tertiary)' }}>Perfil</a></li>
            <li><a href="#" onClick={() => toast.info('Historial de pedidos (demo)')} style={{ display: 'block', padding: '8px 12px', borderRadius: 8 }}>Mis Pedidos</a></li>
            <li><a href="#" onClick={() => toast.info('Direcciones guardadas (demo)')} style={{ display: 'block', padding: '8px 12px', borderRadius: 8 }}>Direcciones</a></li>
            <li><Link href="/logout" style={{ display: 'block', padding: '8px 12px', borderRadius: 8, color: '#f66' }}>Cerrar Sesión</Link></li>
          </ul>
        </aside>

        <section className="checkout-form-container">
          <h3>Información Personal (Demo)</h3>
          <div className="form-group-row">
            <div className="form-group"><label>Nombre</label><input defaultValue="Cliente Demo" readOnly /></div>
            <div className="form-group"><label>Celular</label><input defaultValue="984 048 211" readOnly /></div>
          </div>
          <div className="form-group"><label>Email</label><input defaultValue="demo@novaclicshop.com" readOnly /></div>
          <div className="form-group"><label>Distrito</label><input defaultValue="Santa Lucía, Puno" readOnly /></div>

          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: '1rem' }}>
            El historial completo de pedidos, tracking y edición de perfil se activará cuando conectemos Supabase Auth.
          </p>
          <Link href="/productos" className="btn-primary" style={{ display: 'inline-flex', marginTop: '0.5rem' }}>Seguir comprando</Link>
        </section>
      </div>
    </div>
  );
}
