'use client';

import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] pt-20 flex items-center justify-center">
      <div className="max-w-md w-full px-8">
        <h1 className="text-3xl font-semibold tracking-[-1px] mb-6 text-center">Crear Cuenta</h1>
        
        <div className="card p-8">
          <p className="text-center text-[#71717A] mb-6">Registro estará disponible pronto.</p>
          
          <div className="space-y-3">
            <Link href="/login" className="btn-primary w-full text-center block py-3">Ya tengo cuenta</Link>
            <Link href="/" className="btn-secondary w-full text-center block py-3">Volver al inicio</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
