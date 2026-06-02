'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#3B82F6]" />
          <span className="font-semibold text-2xl tracking-[-1.2px]">NovaClicShop</span>
        </Link>

        {/* Search Bar - Core of any real e-commerce */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="input w-full pl-10 pr-4 py-2.5 bg-[#141414] border border-white/10 text-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3B82F6]/70" size={18} />
          </div>
        </form>

        {/* Desktop Navigation - Clean e-commerce style */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/products" className="hover:text-[#3B82F6] transition-colors">Catálogo</Link>
          <Link href="/about" className="hover:text-[#3B82F6] transition-colors">Sobre nosotros</Link>
          <Link href="/contact" className="hover:text-[#3B82F6] transition-colors">Contacto</Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Account */}
          <Link 
            href="/login" 
            className="hidden md:flex items-center gap-2 px-4 py-2 text-sm rounded-full hover:bg-white/5 transition-colors"
          >
            <User size={18} />
            <span className="hidden lg:inline">Cuenta</span>
          </Link>

          {/* Cart - Important in e-commerce */}
          <Link 
            href="/cart" 
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#3B82F6] text-white text-[10px] font-mono flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu + Search */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0A0A]">
          <div className="px-6 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="input w-full pl-10"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3B82F6]/70" size={18} />
              </div>
            </form>
          </div>
          <nav className="flex flex-col px-6 pb-6 text-base gap-1">
            <Link href="/products" className="py-3 border-b border-white/10" onClick={() => setMobileMenuOpen(false)}>Catálogo</Link>
            <Link href="/about" className="py-3 border-b border-white/10" onClick={() => setMobileMenuOpen(false)}>Sobre nosotros</Link>
            <Link href="/contact" className="py-3 border-b border-white/10" onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
            <div className="pt-4 flex gap-4">
              <Link href="/login" className="flex-1 text-center py-2.5 border border-white/20 rounded-full" onClick={() => setMobileMenuOpen(false)}>Iniciar sesión</Link>
              <Link href="/register" className="flex-1 text-center py-2.5 bg-[#3B82F6] text-white rounded-full" onClick={() => setMobileMenuOpen(false)}>Crear cuenta</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
