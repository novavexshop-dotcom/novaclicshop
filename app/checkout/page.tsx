'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/src/lib/cart-store';
import { formatPrice, generateOrderId, buildWhatsAppMessage } from '@/src/lib/utils';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
    yapeOp: '',
  });
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = getTotalPrice();
  const total = subtotal; // free shipping always

  if (items.length === 0) {
    return (
      <div className="app-main container" style={{ maxWidth: 620, paddingTop: '2rem' }}>
        <p>Tu carrito está vacío.</p>
        <button className="btn-primary" onClick={() => router.push('/productos')}>Ir al catálogo</button>
      </div>
    );
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id === 'cust-name' ? 'name' : id === 'cust-phone' ? 'phone' : id === 'cust-address' ? 'address' : id === 'cust-notes' ? 'notes' : 'yapeOp']: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona una imagen');
      return;
    }
    const url = URL.createObjectURL(file);
    setScreenshotPreview(url);
  };

  const removeScreenshot = () => {
    if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    setScreenshotPreview(null);
    // reset file input
    const input = document.getElementById('yape-screenshot') as HTMLInputElement;
    if (input) input.value = '';
  };

  const copyYape = async () => {
    const ok = await navigator.clipboard.writeText('984048211').catch(() => false);
    if (ok) toast.success('Número copiado al portapapeles');
    else toast.error('No se pudo copiar');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.yapeOp.trim()) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }
    if (!/^\d{9}$/.test(form.phone)) {
      toast.error('El celular debe tener 9 dígitos');
      return;
    }
    if (!/^\d{8}$/.test(form.yapeOp)) {
      toast.error('El número de operación debe tener exactamente 8 dígitos');
      return;
    }

    setSubmitting(true);

    const orderId = generateOrderId();

    // Build message and open WhatsApp
    const waMessage = buildWhatsAppMessage({
      id: orderId,
      customerName: form.name.trim(),
      customerPhone: form.phone.trim(),
      customerAddress: form.address.trim(),
      yapeOpNumber: form.yapeOp,
      total,
      items,
    });

    const waUrl = `https://wa.me/51984048211?text=${encodeURIComponent(waMessage)}`;

    // Success flow
    clearCart();
    if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);

    // Navigate to success with details
    const params = new URLSearchParams({
      orderId,
      name: form.name.trim(),
      op: form.yapeOp,
      total: total.toFixed(2),
    });

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    router.push(`/success?${params.toString()}`);
  };

  return (
    <div className="app-main container">
      <button className="btn-back" onClick={() => router.back()}>
        <i className="fa-solid fa-arrow-left"></i> Volver
      </button>

      <div className="checkout-title">
        <h2>Completar Pedido (Pago por Yape)</h2>
        <p>Por favor ingresa tus datos y sube tu comprobante de pago para procesar la orden.</p>
      </div>

      <div className="checkout-grid">
        {/* Form */}
        <div className="checkout-form-container">
          <form id="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3><i className="fa-regular fa-user"></i> Datos de Envío</h3>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="cust-name">Nombre Completo *</label>
                  <input type="text" id="cust-name" required placeholder="Ej: Juan Pérez Díaz" value={form.name} onChange={handleInput} />
                </div>
                <div className="form-group">
                  <label htmlFor="cust-phone">Celular *</label>
                  <input type="tel" id="cust-phone" required placeholder="Ej: 999888777" pattern="[0-9]{9}" maxLength={9} value={form.phone} onChange={handleInput} />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="cust-district">Distrito de Entrega *</label>
                  <select id="cust-district" disabled value="Santa Lucía" style={{ width: '100%', height: 43, background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '0 14px' }}>
                    <option value="Santa Lucía">Santa Lucía (Único disponible)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="cust-address">Dirección Exacta (Calle, Nro, etc.) *</label>
                  <input type="text" id="cust-address" required placeholder="Ej: Jr. Comercio 123" value={form.address} onChange={handleInput} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cust-notes">Notas del Pedido (Opcional)</label>
                <textarea id="cust-notes" placeholder="Ej: Tocar el timbre de madera, dejar en recepción, etc." value={form.notes} onChange={handleInput} />
              </div>
            </div>

            {/* Yape section - exact structure from template */}
            <div className="form-section yape-payment-section">
              <h3><i className="fa-solid fa-wallet"></i> Instrucciones de Pago</h3>

              <div className="yape-instruction-box">
                <div className="yape-qr-wrapper">
                  <div className="qr-placeholder">
                    <img 
                      src="/products/yape-qr.jpg" 
                      alt="QR Yape NovaClicShop" 
                      style={{ width: '140px', height: '140px', borderRadius: 8 }} 
                    />
                    <p style={{ marginTop: '4px', fontSize: '10px' }}>Escanea para pagar</p>
                  </div>
                </div>

                <div className="yape-text-instructions">
                  <p className="yape-step"><strong>1. Escanea el código QR</strong> desde tu aplicación Yape o envía directamente al número de celular:</p>
                  <div className="yape-phone-copy">
                    <span className="phone-number" id="yape-phone-display">984 048 211</span>
                    <button type="button" className="btn-copy" id="btn-copy-yape" onClick={copyYape}>
                      <i className="fa-regular fa-copy"></i> Copiar
                    </button>
                  </div>
                  <p className="yape-titular">Titular: <strong>NovaClicShop</strong></p>
                  <p className="yape-step"><strong>2. Realiza el pago</strong> por el monto total de tu pedido.</p>
                  <p className="yape-step"><strong>3. Escribe el número de operación</strong> de 8 dígitos abajo (subir captura es opcional).</p>
                </div>
              </div>

              <div className="yape-inputs">
                <div className="form-group">
                  <label htmlFor="yape-screenshot">Subir Captura del Pago (Opcional)</label>
                  <div className="file-upload-wrapper">
                    <input type="file" id="yape-screenshot" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                    <div className="file-upload-btn" onClick={() => document.getElementById('yape-screenshot')?.click()}>
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      <span>Seleccionar imagen de comprobante</span>
                    </div>
                    <div className={`file-preview-container ${screenshotPreview ? 'has-image' : ''}`} id="screenshot-preview-container">
                      {screenshotPreview && (
                        <>
                          <img id="screenshot-preview" src={screenshotPreview} alt="Comprobante" />
                          <button type="button" className="btn-remove-preview" id="btn-remove-screenshot" onClick={removeScreenshot}>
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="yape-op-number">Número de Operación (8 dígitos) *</label>
                  <input type="text" id="yape-op-number" required placeholder="Ej: 13579246" maxLength={8} pattern="\d{8}" value={form.yapeOp} onChange={handleInput} />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-submit-order" id="btn-confirm-order" disabled={submitting}>
              <i className="fa-solid fa-circle-check"></i> {submitting ? 'Procesando...' : 'Finalizar Compra por Yape'}
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="checkout-summary-container">
          <div className="summary-box">
            <h3>Resumen del Pedido</h3>

            <div className="summary-items" id="checkout-summary-items">
              {items.map((item) => (
                <div key={item.productId} className="summary-row" style={{ fontSize: 13.5 }}>
                  <span>{item.name} ×{item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span id="checkout-subtotal">{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span className="free-shipping">Gratis</span>
              </div>
              <hr />
              <div className="summary-row total-row">
                <span>Total</span>
                <span id="checkout-total">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
