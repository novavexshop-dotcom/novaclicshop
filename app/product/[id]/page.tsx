'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { getProductById, getProductsSync } from '@/lib/getProducts';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params['id'] as string;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <p className="text-2xl mb-4">Producto no encontrado</p>
          <Link href="/products" className="btn-secondary">Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  const allImages = [product.image, ...(product.images || [])].filter(Boolean);
  const currentImage = allImages.includes(selectedImage) ? selectedImage : (allImages[0] || product.image);

  const maxQty = product.stock;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  // Related products (same category, exclude self)
  const related = getProductsSync()
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] pt-20">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-[#71717A] hover:text-white mb-8">
          <ArrowLeft size={16} /> Volver al catálogo
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image + gallery for multiple reference photos (different colors/brands) */}
          <div>
            <div className="bg-[#141414] rounded-3xl overflow-hidden border border-white/10 aspect-square flex items-center justify-center mb-3">
              <img 
                src={currentImage} 
                alt={product.name} 
                className="max-h-[480px] object-contain" 
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border ${selectedImage === img ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]' : 'border-white/10'}`}
                  >
                    <img src={img} alt={`vista ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="uppercase text-xs tracking-[3px] text-[#3B82F6] mb-2 font-mono">{product.category}</div>
            <h1 className="text-5xl font-semibold tracking-[-1.8px] mb-4">{product.name}</h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-semibold">S/ {product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-[#71717A] line-through">S/ {product.originalPrice}</span>
              )}
            </div>

            {product.isNew && <span className="badge mb-6 inline-block">Nuevo</span>}
            {product.isPromo && <span className="badge bg-[#F59E0B] text-[#0A0A0A] mb-6 inline-block">Oferta</span>}

            <p className="text-lg text-[#71717A] mb-8 leading-relaxed">{product.description}</p>

            <div className="mb-8">
              <div className="text-sm text-[#3B82F6] mb-3 tracking-widest">CARACTERÍSTICAS</div>
              <ul className="space-y-2 text-[#F4F4F5]">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#3B82F6] mt-1">•</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity selector with nice controls */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-sm text-[#71717A]">Cantidad</div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 active:scale-95 transition"
                >
                  <Minus size={16} />
                </button>
                <div className="w-12 text-center font-mono text-lg font-semibold tabular-nums border border-white/10 py-1 rounded">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 active:scale-95 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="text-xs text-[#71717A]">Máx. {maxQty}</div>
            </div>

            <button 
              onClick={handleAdd}
              disabled={added}
              className="btn-primary w-full md:w-auto px-10 py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-80"
            >
              <ShoppingCart size={20} /> 
              {added ? '¡Agregado al carrito!' : 'Agregar al carrito'}
            </button>

            <p className="text-xs text-[#71717A] mt-4">Envío disponible solo en Santa Lucía por el momento.</p>

            {/* Stock visual */}
            <div className="mt-3 text-xs text-[#71717A]">
              {product.stock > 5 ? 'En stock' : product.stock > 0 ? 'Pocas unidades' : 'Agotado temporalmente'}
            </div>
          </div>
        </div>

        {/* Related Products - more integration and polish */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="text-2xl font-semibold tracking-[-0.5px]">También te puede gustar</h3>
              <Link href={`/products?category=${product.category}`} className="text-sm text-[#3B82F6] hover:underline">Ver más en esta categoría</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((rel, index) => (
                <motion.div 
                  key={rel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/product/${rel.id}`} className="card p-4 block group">
                    <div className="aspect-[16/10] bg-[#1F1F1F] rounded-xl overflow-hidden mb-4">
                      <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <div className="font-medium text-sm mb-1 line-clamp-2">{rel.name}</div>
                    <div className="text-lg font-semibold">S/ {rel.price}</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
