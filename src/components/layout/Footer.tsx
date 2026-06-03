'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container footer-content">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <i className="fa-solid fa-microchip"></i>
            <h2>NovaClic<span>Shop</span></h2>
          </div>
          <p>
            Tu tienda virtual de confianza especializada en componentes Arduino, robótica, repuestos y accesorios
            tecnológicos de calidad premium para celulares y laptops.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="social-icon" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="social-icon" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
            <a href="#" className="social-icon" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>

        <div className="footer-col links-col">
          <h3>Categorías</h3>
          <ul>
            <li><Link href="/productos?category=arduino">Arduino y Robótica</Link></li>
            <li><Link href="/productos?category=celular">Accesorios Celular</Link></li>
            <li><Link href="/productos?category=computadora">Accesorios Computadora</Link></li>
            <li><Link href="/productos?filter=ofertas">Ofertas Especiales</Link></li>
          </ul>
        </div>

        <div className="footer-col links-col">
          <h3>Servicio al Cliente</h3>
          <ul>
            <li><a href="#">¿Cómo Comprar?</a></li>
            <li><Link href="/terminos">Términos y Condiciones</Link></li>
            <li><Link href="/privacidad">Política de Privacidad</Link></li>
            <li><a href="#">Libro de Reclamaciones</a></li>
          </ul>
        </div>

        <div className="footer-col contact-col">
          <h3>Información de Contacto</h3>
          <p><i className="fa-solid fa-location-dot"></i> Barrio 8 de Octubre, Santa Lucía, Puno</p>
          <p><i className="fa-solid fa-phone"></i> +51 984 048 211</p>
          <p><i className="fa-solid fa-envelope"></i> rolando20vilca@gmail.com</p>
          <div className="payment-badges">
            <span className="badge-yape">Yape</span>
            <span className="badge-efectivo">Efectivo</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; 2026 NovaClicShop. Todos los derechos reservados. Diseñado con ❤️ para makers peruanos.</p>
        </div>
      </div>
    </footer>
  );
}
