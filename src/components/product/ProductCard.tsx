'use client';

import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="card overflow-hidden h-full flex flex-col">
        <div className="relative aspect-[16/11] bg-[#1F1F1F] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]" 
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && <span className="badge">Nuevo</span>}
            {product.isPromo && <span className="badge bg-[#F59E0B] text-[#0A0A0A]">Oferta</span>}
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="text-xs text-[#71717A] tracking-widest mb-1 uppercase font-mono">
            {product.category}
          </div>
          <div className="font-semibold text-[17px] leading-tight tracking-[-0.3px] mb-4 flex-1 line-clamp-2">
            {product.name}
          </div>

          <div className="flex items-baseline justify-between mt-auto">
            <div>
              <span className="text-2xl font-semibold tabular-nums">S/ {product.price}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-[#71717A] line-through">S/ {product.originalPrice}</span>
              )}
            </div>

            <button 
              onClick={handleAddToCart}
              className="text-xs px-4 py-1.5 rounded-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white transition font-medium"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
