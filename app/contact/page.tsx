'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5]">
      <Header />

      <div className="max-w-3xl mx-auto px-8 pt-32 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#71717A] hover:text-white mb-12">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>

        <h1 className="text-7xl font-semibold tracking-[-3.2px] mb-4">Contacto</h1>
        <p className="text-[#71717A] text-xl mb-12">Estamos empezando en Santa Lucía. Escríbenos, te respondemos personalmente.</p>
        
        <div className="max-w-md space-y-8 text-lg">
          <div>
            <div className="text-[#3B82F6] font-medium mb-2 text-sm tracking-widest">WHATSAPP</div>
            <a href="https://wa.me/51993042155" className="hover:text-[#3B82F6] text-2xl font-semibold" target="_blank">
              993 042 155
            </a>
            <div className="text-[#71717A] text-sm mt-1">Respuesta rápida • Lunes a Sábado</div>
          </div>

          <div>
            <div className="text-[#3B82F6] font-medium mb-2 text-sm tracking-widest">CORREO ELECTRÓNICO</div>
            <a href="mailto:novavexshop@gmail.com" className="hover:text-[#3B82F6] text-2xl font-semibold">
              novavexshop@gmail.com
            </a>
            <div className="text-[#71717A] text-sm mt-1">Respuestas en 24h</div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="text-[#3B82F6] font-medium mb-2 text-sm tracking-widest">UBICACIÓN</div>
            <div className="text-[#F4F4F5]">Santa Lucía, Perú</div>
            <div className="text-[#71717A] text-sm mt-1">Envíos locales por ahora</div>
          </div>
        </div>

        <div className="mt-12 text-sm text-[#71717A]">
          ¿Tienes dudas sobre algún producto? Escríbenos y te ayudamos a elegir.
        </div>
      </div>
    </div>
  );
}
