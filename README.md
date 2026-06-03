# 📚 Documentación NovaClicShop

## 🚀 ¿Qué es NovaClicShop?

NovaClicShop es una **tienda e-commerce profesional y moderna** especializada en productos electrónicos, Arduino, sensores y accesorios para makers. Ubicada en Puno, Perú, con envíos a todo el país.

**Stack Tecnológico:**
- Next.js 16 (React 19)
- TypeScript 5.3
- Tailwind CSS v4
- Zustand (estado del carrito)
- Supabase (backend, auth, base de datos)
- Lucide React (iconos)
- Sonner (notificaciones - listo)

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura del Proyecto

```
novaclicshop/
├── app/
│   ├── page.tsx                 # Home (hero + stats + categorías)
│   ├── layout.tsx              # Layout global
│   ├── globals.css             # Estilos
│   ├── productos/page.tsx      # Catálogo con filtros
│   ├── carrito/page.tsx        # Carrito de compras
│   ├── checkout/page.tsx       # Checkout con Yape
│   ├── cuenta/page.tsx         # Mi cuenta
│   ├── login/page.tsx          # Login
│   ├── register/page.tsx       # Registro
│   ├── admin/page.tsx          # Admin panel
│   ├── terminos/page.tsx       # Legal
│   └── privacidad/page.tsx     # Privacidad
├── src/
│   ├── components/
│   │   ├── ui/                 # Button, Input, Card, Badge
│   │   ├── layout/             # Navbar, Footer
│   │   └── product/            # ProductCard
│   └── lib/
│       ├── types.ts            # Tipos TypeScript
│       ├── supabase.ts         # Cliente Supabase
│       ├── cart-store.ts       # Zustand store
│       └── utils.ts            # Funciones
└── package.json
```

---

## 🎨 Colores y Diseño

- **Fondo:** `#080808` (Negro profundo)
- **Cards:** `#0A2540` (Azul oscuro)
- **Accent:** `#00D4FF` (Cyan/Turquesa)
- **Texto:** `#f0f0f0` (Blanco suave)

---

## 📊 Características

✅ **Catálogo dinámico** - Filtros, búsqueda, ordenamiento  
✅ **Carrito persistente** - Zustand + localStorage  
✅ **Checkout profesional** - 3 pasos, Yape integrado  
✅ **Tema oscuro** - Dark theme moderno  
✅ **Responsive** - Funciona en móvil, tablet, desktop  
✅ **Legal** - Términos, privacidad, Indecopi  

---

## 🔧 Configuración Supabase

(Opcional por ahora)

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

---

## 💳 Pago Yape

- Número: **+51 984 048 211**
- Confirmación por WhatsApp
- Cálculo automático de IGV y envío

---

## 📞 Contacto

- **Ubicación:** Barrio 8 de Octubre, Santa Lucía, Puno
- **Teléfono:** +51 984 048 211
- **Email:** rolando20vilca@gmail.com

---

**NovaClicShop © 2026** - Todos los derechos reservados

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
