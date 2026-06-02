'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080c14] text-[#f1f5f9]">
      <Header />

      <div className="max-w-3xl mx-auto px-8 pt-32 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#94a3b8] hover:text-white mb-12">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>

        <h1 className="text-7xl font-semibold tracking-[-3.2px] mb-8">Sobre NovaClic</h1>
        
        <div className="prose prose-invert max-w-none text-xl text-[#94a3b8] space-y-7">
          <p>
            NovaClic nace de la necesidad de contar con una tienda especializada en tecnología de calidad en el Perú. 
            No vendemos todo. Seleccionamos productos que realmente funcionan y que duran.
          </p>
          <p>
            Trabajamos con makers, estudiantes de ingeniería, profesionales y entusiastas que buscan herramientas 
            confiables para sus proyectos, sin complicaciones ni productos de baja calidad.
          </p>
        </div>

        <div className="mt-16 pt-10 border-t border-white/10 text-sm text-[#94a3b8]">
          Más información próximamente.
        </div>
      </div>
    </div>
  );
}
