import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-10 text-sm bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-y-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-7 rounded bg-[#3B82F6]" />
            <span className="font-semibold text-xl tracking-[-1px]">NovaClicShop</span>
          </div>
          <p className="text-[#71717A] pr-6">Tienda de tecnología en Santa Lucía. Empezando con productos seleccionados para makers y estudiantes.</p>
        </div>

        <div>
          <div className="font-semibold tracking-wider text-xs mb-5 text-[#71717A]">TIENDA</div>
          <div className="space-y-[13px] text-[#71717A]">
            <div><Link href="/products" className="hover:text-white">Catálogo completo</Link></div>
            <div><Link href="/products?category=arduino" className="hover:text-white">Arduino & Electrónica</Link></div>
            <div><Link href="/products?category=celular" className="hover:text-white">Celulares & Accesorios</Link></div>
            <div><Link href="/products?category=computadora" className="hover:text-white">Gaming & Computación</Link></div>
          </div>
        </div>

        <div>
          <div className="font-semibold tracking-wider text-xs mb-5 text-[#71717A]">EMPRESA</div>
          <div className="space-y-[13px] text-[#71717A]">
            <div><Link href="/about" className="hover:text-white">Sobre nosotros</Link></div>
            <div><Link href="/contact" className="hover:text-white">Contacto</Link></div>
          </div>
        </div>

        <div>
          <div className="font-semibold tracking-wider text-xs mb-5 text-[#71717A]">CONTACTO</div>
          <div className="space-y-[13px] text-[#71717A]">
            <div>WhatsApp: <a href="https://wa.me/51993042155" className="hover:text-white" target="_blank">993 042 155</a></div>
            <div>Correo: <a href="mailto:novavexshop@gmail.com" className="hover:text-white">novavexshop@gmail.com</a></div>
            <div>Atención: Lunes a Sábado</div>
          </div>
        </div>

        <div>
          <div className="font-semibold tracking-wider text-xs mb-5 text-[#71717A]">SOPORTE</div>
          <div className="space-y-[13px] text-[#71717A]">
            <div>Envíos locales en Santa Lucía</div>
            <div>Garantía de 6 meses</div>
            <div>Cambios y devoluciones</div>
          </div>
        </div>
      </div>

      <div className="text-center text-[#52525B] text-xs mt-16 pt-8 border-t border-white/10 tracking-wider">
        © {new Date().getFullYear()} NovaClicShop — Santa Lucía, Perú • Empezando con atención personalizada
      </div>
    </footer>
  );
}
