'use client';

import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('Demo: Inicio de sesión con Supabase se habilitará pronto. Usa el flujo de compra actual.');
  };

  return (
    <div className="app-main container" style={{ maxWidth: 420, paddingTop: '2rem' }}>
      <div className="checkout-form-container" style={{ margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="logo-icon" style={{ margin: '0 auto 0.5rem', width: 56, height: 56, fontSize: 28 }}>
            <i className="fa-solid fa-microchip"></i>
          </div>
          <h2 style={{ margin: 0 }}>Iniciar Sesión</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Accede a tu cuenta NovaClicShop</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input id="email" type="email" placeholder="tu@correo.com" required defaultValue="demo@novaclicshop.com" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" placeholder="••••••••" required defaultValue="demo123" />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Ingresar
          </button>
        </form>

        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: 13 }}>
          ¿No tienes cuenta? <Link href="/register" style={{ color: 'var(--accent)' }}>Regístrate aquí</Link>
        </div>

        <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>
          <i className="fa-solid fa-info-circle"></i> Autenticación completa con Supabase + historial de pedidos estará disponible pronto.
        </div>
      </div>
    </div>
  );
}
