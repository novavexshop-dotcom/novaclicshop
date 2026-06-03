'use client';

import React from 'react';

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-content">
        <div className="top-info-left">
          <span>
            <i className="fa-solid fa-clock"></i> Lunes a Sábado: 9:00 AM - 8:00 PM
          </span>
          <span className="separator">|</span>
          <span>
            <i className="fa-solid fa-truck-fast"></i> Envíos a todo el Distrito de Santa Lucía
          </span>
        </div>
        <div className="top-info-right">
          <a
            href="https://wa.me/51984048211"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <i className="fa-brands fa-whatsapp"></i> Soporte: 984 048 211
          </a>
          <span className="separator">|</span>
          <span className="yape-tag">
            <i className="fa-solid fa-mobile-screen-button"></i> Paga con Yape
          </span>
        </div>
      </div>
    </div>
  );
}
