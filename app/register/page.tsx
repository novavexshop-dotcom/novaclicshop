'use client';

import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function RegisterPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Demo: Cuenta creada (simulada). Ahora puedes usar el checkout completo.');
  };

  return (
    <div className="app-main container" style={{ maxWidth: 420, paddingTop: '2rem' }}>
      <div className="checkout-form-container" style={{ margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="logo-icon" style={{ margin: '0 auto 0.5rem', width: 56, height: 56, fontSize: 28 }}>
            <i className="fa-solid fa-microchip"></i>
          </div>
          <h2 style={{ margin: 0 }}>Crear Cuenta</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Únete a NovaClicShop</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" placeholder="Juan Pérez" required defaultValue="Cliente Demo" />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input type="text" placeholder="Díaz" required defaultValue="Demo" />
            </div>
          </div>
          <div className="form-group">
            <label>Correo</label>
            <input type="email" placeholder="tu@correo.com" required defaultValue="demo@novaclicshop.com" />
          </div>
          <div className="form-group">
            <label>Celular</label>
            <input type="tel" placeholder="984048211" required defaultValue="984048211" maxLength={9} />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="Mínimo 6 caracteres" required defaultValue="demo123" />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Crear Cuenta
          </button>
        </form>

        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: 13 }}>
          ¿Ya tienes cuenta? <Link href="/login" style={{ color: 'var(--accent)' }}>Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
