import { Suspense } from 'react';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 bg-[#0A0A0A] text-[#F4F4F5] flex items-center justify-center">
        <div className="text-[#71717A]">Cargando catálogo...</div>
      </div>
    }>
      {children}
    </Suspense>
  );
}
