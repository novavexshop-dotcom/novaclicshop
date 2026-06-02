'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ArrowLeft, CreditCard, Smartphone, Wallet } from 'lucide-react';

type PaymentMethod = 'yape' | 'card' | 'paypal';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('yape');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    // Yape
    yapeOperation: '',
    // Card (mock)
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const shipping = 0; // Free in Santa Lucía for now
  const total = cartTotal + shipping;

  if (cart.length === 0 && !orderNumber) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] pt-20">
        <div className="max-w-2xl mx-auto px-8 py-20 text-center">
          <h1 className="text-4xl font-semibold tracking-[-1.5px] mb-4">No tienes productos</h1>
          <p className="text-[#71717A] mb-8">Agrega algo al carrito primero.</p>
          <Link href="/products" className="btn-primary px-8 py-3">Ir al catálogo</Link>
        </div>
      </div>
    );
  }

  if (orderNumber) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] pt-20">
        <div className="max-w-2xl mx-auto px-8 py-16">
          <div className="card p-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#22C55E]/20 flex items-center justify-center mb-6">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-[-1.5px] mb-3">¡Pedido recibido!</h1>
            <p className="text-[#71717A] mb-6">Gracias por tu compra. Te contactaremos pronto.</p>

            <div className="bg-[#141414] rounded-xl p-6 mb-8 text-left">
              <div className="text-sm text-[#71717A]">Número de pedido</div>
              <div className="text-3xl font-mono tracking-widest text-[#3B82F6]">{orderNumber}</div>
            </div>

            <div className="text-sm text-[#71717A] mb-8">
              Método de pago: <span className="text-white capitalize">{paymentMethod}</span><br />
              Total pagado: <span className="text-white">S/ {total}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-secondary px-8 py-3">Seguir comprando</Link>
              <Link href="/" className="btn-primary px-8 py-3">Volver al inicio</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    if (paymentMethod === 'yape' && !formData.yapeOperation) {
      alert('Ingresa el número de operación de Yape (8 dígitos).');
      return;
    }

    if (paymentMethod === 'card' && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv)) {
      alert('Completa los datos de la tarjeta.');
      return;
    }

    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      const fakeOrder = 'NC-' + Date.now().toString().slice(-8);

      // Save order to localStorage for the admin to see
      const newOrder = {
        id: fakeOrder,
        date: new Date().toISOString(),
        total,
        paymentMethod,
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes,
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        status: 'Pendiente de pago',
      };

      // Save locally
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

      // Also try Supabase (map to table columns)
      if (isSupabaseConfigured) {
        (async () => {
          try {
            const dbOrder = {
              id: newOrder.id,
              created_at: newOrder.date,
              total: newOrder.total,
              payment_method: newOrder.paymentMethod,
              status: newOrder.status,
              customer: newOrder.customer,
              items: newOrder.items,
            };
            await supabase.from('orders').insert(dbOrder);
          } catch (e) {
            console.warn('Could not save order to Supabase yet');
          }
        })();
      }

      setOrderNumber(fakeOrder);
      clearCart();
      setIsSubmitting(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] pt-20">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-[#71717A] hover:text-white mb-6">
          <ArrowLeft size={16} /> Volver al carrito
        </Link>

        <h1 className="text-5xl font-semibold tracking-[-2px] mb-8">Finalizar compra</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-7 space-y-8">
              {/* Contact Info */}
              <div className="card p-8">
                <h3 className="font-semibold text-xl mb-6">Datos de contacto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1.5">Nombre completo *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Teléfono (9 dígitos) *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      maxLength={9}
                      className="input"
                      placeholder="993042155"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="card p-8">
                <h3 className="font-semibold text-xl mb-6">Dirección de entrega</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1.5">Distrito</label>
                    <input
                      type="text"
                      value="Santa Lucía"
                      disabled
                      className="input bg-[#1F1F1F] cursor-not-allowed"
                    />
                    <p className="text-xs text-[#71717A] mt-1">Por ahora solo entregamos en Santa Lucía.</p>
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Dirección exacta *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="Av. Principal 123, Urb. Los Rosales"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Notas del pedido (opcional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="input resize-y min-h-[80px]"
                      placeholder="Dejar en portería, llamar al llegar, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="card p-8">
                <h3 className="font-semibold text-xl mb-6">Método de pago</h3>

                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('yape')}
                    className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3 rounded-full border transition ${
                      paymentMethod === 'yape' ? 'bg-[#3B82F6] text-white border-[#3B82F6]' : 'border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <Smartphone size={18} /> Yape
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3 rounded-full border transition ${
                      paymentMethod === 'card' ? 'bg-[#3B82F6] text-white border-[#3B82F6]' : 'border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <CreditCard size={18} /> Tarjeta
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3 rounded-full border transition ${
                      paymentMethod === 'paypal' ? 'bg-[#3B82F6] text-white border-[#3B82F6]' : 'border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <Wallet size={18} /> PayPal
                  </button>
                </div>

                {/* Yape */}
                {paymentMethod === 'yape' && (
                  <div className="space-y-4 bg-[#141414] p-5 rounded-2xl">
                    <p className="text-sm text-[#71717A]">
                      Realiza el pago a <span className="text-white font-medium">993 042 155</span> (Yape) y coloca el número de operación de 8 dígitos.
                    </p>
                    <div>
                      <label className="block text-sm mb-1.5">Número de operación Yape (8 dígitos) *</label>
                      <input
                        type="text"
                        name="yapeOperation"
                        value={formData.yapeOperation}
                        onChange={handleInputChange}
                        maxLength={8}
                        className="input font-mono tracking-widest"
                        placeholder="12345678"
                      />
                    </div>
                    <div className="text-xs text-[#71717A]">
                      (Opcional) Puedes subir una foto del voucher después de confirmar el pedido.
                    </div>
                  </div>
                )}

                {/* Card */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 bg-[#141414] p-5 rounded-2xl">
                    <div>
                      <label className="block text-sm mb-1.5">Número de tarjeta</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        className="input font-mono"
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1.5">Vencimiento (MM/AA)</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          maxLength={5}
                          className="input font-mono"
                          placeholder="12/28"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1.5">CVV</label>
                        <input
                          type="text"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          maxLength={4}
                          className="input font-mono"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-[#71717A]">Pago simulado para pruebas.</p>
                  </div>
                )}

                {/* PayPal */}
                {paymentMethod === 'paypal' && (
                  <div className="bg-[#141414] p-5 rounded-2xl text-center">
                    <p className="text-sm">Serás redirigido a PayPal para completar el pago.</p>
                    <p className="text-xs text-[#71717A] mt-1">(Simulado en esta versión)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="card p-8 sticky top-24">
                <h3 className="font-semibold text-xl mb-6">Resumen del pedido</h3>

                <div className="space-y-4 mb-6 max-h-64 overflow-auto pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="pr-4">
                        {item.name} <span className="text-[#71717A]">× {item.quantity}</span>
                      </div>
                      <div className="font-medium tabular-nums">S/ {(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span className="text-[#71717A]">Subtotal</span>
                    <span>S/ {cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#71717A]">Envío</span>
                    <span className="text-[#22C55E]">Gratis (Santa Lucía)</span>
                  </div>
                  <div className="flex justify-between text-xl font-semibold pt-2 border-t border-white/10">
                    <span>Total a pagar</span>
                    <span>S/ {total}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="btn-primary w-full mt-8 py-4 text-lg disabled:opacity-70"
                >
                  {isSubmitting ? 'Procesando...' : 'Confirmar pedido y pagar'}
                </button>

                <p className="text-center text-xs text-[#71717A] mt-4">
                  Al confirmar aceptas nuestros términos. Pago contra entrega o digital.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
