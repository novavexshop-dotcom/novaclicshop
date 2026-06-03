'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (cat?: string, target?: string) => {
    if (target === 'home' && pathname === '/') return true;
    if (target === 'ofertas' && pathname === '/productos' && searchParams.get('filter') === 'ofertas') return true;
    if (cat && pathname === '/productos') {
      return searchParams.get('category') === cat;
    }
    return false;
  };

  return (
    <nav className="nav-bar">
      <div className="container nav-container">
        <ul className="nav-links">
          <li>
            <Link
              href="/"
              className={`nav-link ${isActive(undefined, 'home') ? 'active' : ''}`}
              data-target="home"
            >
              🏠 Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/productos?category=arduino"
              className={`nav-link ${isActive('arduino') ? 'active' : ''}`}
              data-category="arduino"
            >
              <i className="fa-solid fa-diagram-project"></i> Arduino
            </Link>
          </li>
          <li>
            <Link
              href="/productos?category=celular"
              className={`nav-link ${isActive('celular') ? 'active' : ''}`}
              data-category="celular"
            >
              <i className="fa-solid fa-mobile-screen"></i> Accesorios Celular
            </Link>
          </li>
          <li>
            <Link
              href="/productos?category=computadora"
              className={`nav-link ${isActive('computadora') ? 'active' : ''}`}
              data-category="computadora"
            >
              <i className="fa-solid fa-laptop"></i> Accesorios Computadora
            </Link>
          </li>
          <li>
            <Link
              href="/productos?filter=ofertas"
              className={`nav-link ${isActive(undefined, 'ofertas') ? 'active' : ''}`}
              data-target="ofertas"
            >
              🔥 Ofertas
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
