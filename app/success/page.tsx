'use client';

import React, { Suspense } from 'react';

export const dynamic = 'force-dynamic';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId') || 'NCS-9843-2026';
  const clientName = searchParams.get('name') || 'Cliente';
  const opNumber = searchParams.get('op') || '00000000';
  const total = searchParams.get('total') || '0.00';

  return (
    <div className="app-main container" style={{ maxWidth: 580 }}>
      <div id="view-success" className="app-view active">
        <div className="success-card">
          <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
          <h2>¡Pedido Recibido con Éxito!</h2>
          <p className="success-msg">
            Estamos validando tu pago por Yape. Una vez verificado el número de operación, procederemos con el despacho de tu pedido.
          </p>

          <div className="order-details-box">
            <h3>Detalle del Pedido</h3>
            <div className="order-info-row">
              <span>Código de Pedido:</span>
              <strong id="success-order-id">{orderId}</strong>
            </div>
            <div className="order-info-row">
              <span>Cliente:</span>
              <span id="success-client-name">{clientName}</span>
            </div>
            <div className="order-info-row">
              <span>Número de Operación:</span>
              <span id="success-op-number">{opNumber}</span>
            </div>
            <div className="order-info-row">
              <span>Total Pagado:</span>
              <strong className="success-total" id="success-order-total">S/ {total}</strong>
            </div>
          </div>

          <div className="success-actions">
            <Link href="/" className="btn-primary" id="btn-success-home">
              Seguir Comprando
            </Link>
            <a
              href="https://wa.me/51984048211"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <i className="fa-brands fa-whatsapp"></i> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="app-main container">Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
