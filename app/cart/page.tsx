'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { getProductsSync } from '@/lib/getProducts';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const shipping = 0; // Free shipping in Santa Lucía for now
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] pt-20">
        <div className="max-w-2xl mx-auto px-8 py-20 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-[#141414] flex items-center justify-center mb-8">
            <ShoppingCart className="text-[#3B82F6]" size={36} />
          </div>
          <h1 className="text-4xl font-semibold tracking-[-1.5px] mb-4">Tu carrito está vacío</h1>
          <p className="text-[#71717A] text-lg mb-10">
            Aún no has agregado productos. Explora nuestro catálogo y encuentra lo que necesitas.
          </p>
          <Link href="/products" className="btn-primary inline-flex items-center gap-3 px-10 py-4 text-lg">
            Explorar el Catálogo <ArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] pt-20">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="text-5xl font-semibold tracking-[-2px]">Tu carrito</h1>
            <p className="text-[#71717A] mt-1">{cart.length} producto{cart.length !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/products" className="text-sm text-[#3B82F6] hover:underline flex items-center gap-2">
            Seguir comprando <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              <AnimatePresence>
                {cart.map((item) => {
                  const itemSubtotal = item.price * item.quantity;
                  const maxQty = item.stock;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="card p-6 flex flex-col md:flex-row gap-6"
                    >
                      {/* Image */}
                      <Link href={`/product/${item.id}`} className="w-full md:w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-[#1F1F1F]">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform" 
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4">
                          <div>
                            <Link href={`/product/${item.id}`} className="font-semibold text-xl tracking-[-0.3px] hover:text-[#3B82F6] transition-colors">
                              {item.name}
                            </Link>
                            <div className="text-sm text-[#71717A] mt-0.5">{item.category}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-semibold tabular-nums">S/ {itemSubtotal}</div>
                            <div className="text-xs text-[#71717A]">S/ {item.price} c/u</div>
                          </div>
                        </div>

                        {/* Quantity + Remove */}
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 active:scale-95 transition"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus size={16} />
                            </button>
                            <div className="min-w-[42px] text-center font-mono text-lg font-semibold tabular-nums">
                              {item.quantity}
                            </div>
                            <button 
                              onClick={() => updateQuantity(item.id, Math.min(maxQty, item.quantity + 1))}
                              disabled={item.quantity >= maxQty}
                              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus size={16} />
                            </button>
                            <span className="text-xs text-[#71717A] ml-2">de {maxQty}</span>
                          </div>

                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-1.5 text-sm text-[#EF4444] hover:text-red-400 transition"
                          >
                            <Trash2 size={16} /> Quitar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="mt-6 text-right">
              <button 
                onClick={clearCart}
                className="text-sm text-[#71717A] hover:text-[#EF4444] transition"
              >
                Vaciar carrito
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="card p-8 sticky top-24">
              <h3 className="font-semibold text-2xl tracking-[-0.5px] mb-6">Resumen del pedido</h3>

              <div className="space-y-3 text-base mb-6">
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Subtotal</span>
                  <span className="font-medium tabular-nums">S/ {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Envío</span>
                  <span className="font-medium text-[#22C55E]">Gratis (Santa Lucía)</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span className="tabular-nums">S/ {total}</span>
                </div>
              </div>

              <Link 
                href="/checkout" 
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 mb-4"
              >
                Proceder al pago <ArrowRight />
              </Link>

              <p className="text-center text-xs text-[#71717A]">
                Impuestos incluidos • Pago contra entrega o por Yape
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 text-xs text-[#71717A]">
                Los precios y disponibilidad están sujetos a cambios. 
                Envíos actualmente solo en Santa Lucía mientras crecemos.
              </div>
            </div>
          </div>
        </div>

        {/* Recommended / You may like - polish */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold tracking-[-0.5px] mb-6">Te puede interesar</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {getProductsSync()
              .filter(p => !cart.some(c => c.id === p.id))
              .slice(0, 5)
              .map(p => (
                <Link key={p.id} href={`/product/${p.id}`} className="card p-4 group">
                  <div className="aspect-[16/10] bg-[#1F1F1F] rounded-xl overflow-hidden mb-4">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <div className="font-medium text-sm line-clamp-2 mb-1">{p.name}</div>
                  <div className="text-lg font-semibold">S/ {p.price}</div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
