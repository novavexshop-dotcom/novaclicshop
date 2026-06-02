# 🚀 PROMPT PARA GROCK - NovaClicShop V2

## Objetivo
Crear una **tienda virtual e-commerce moderna** con Next.js 16.2.6, Tailwind CSS 4, React 19 y tema oscuro estilo AgentAI.

---

## 📋 ESTRUCTURA REQUERIDA

```
novaclicshopv2/
├── app/
│   ├── layout.tsx              (Layout global con dark theme)
│   ├── page.tsx                (Homepage con animaciones)
│   ├── globals.css             (Estilos globales)
│   ├── products/
│   │   └── page.tsx            (Catálogo de productos)
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx        (Detalle de producto)
│   ├── cart/
│   │   └── page.tsx            (Carrito de compras)
│   ├── checkout/
│   │   └── page.tsx            (Proceso de compra)
│   ├── login/
│   │   └── page.tsx            (Login)
│   ├── register/
│   │   └── page.tsx            (Registro)
│   └── admin/
│       └── page.tsx            (Panel admin)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── product/
│   │   │   └── ProductCard.tsx
│   │   └── ui/
│   │       └── (componentes UI reutilizables)
│   ├── contexts/
│   │   ├── AuthContext.tsx     (Autenticación)
│   │   └── CartContext.tsx     (Carrito global)
│   └── lib/
│       └── (funciones utilitarias)
├── public/
│   └── (imágenes y assets)
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## 🎨 DISEÑO - TEMA OSCURO AGENTAI

### Paleta de Colores
```css
--red: #e03030              (Rojo principal - botones, acentos)
--red-bright: #ff4040       (Rojo hover - estados interactivos)
--red-glow: rgba(224,48,48,0.35)  (Sombra roja)
--red-dim: #b02020          (Rojo oscuro)

--bg: #080808               (Fondo principal - casi negro)
--bg2: #0f0f0f              (Fondo secundario - ligeramente más claro)
--bg3: #141414              (Fondo terciario)
--card: #111111             (Fondo de tarjetas)
--border: rgba(255,255,255,0.07)  (Bordes sutiles)

--text: #f0f0f0             (Texto principal - gris claro)
--muted: rgba(255,255,255,0.45)   (Texto secundario)

--font-display: 'Syne'      (Titulares)
--font-body: 'DM Sans'      (Cuerpo)
```

### Animaciones
```css
fadeInUp: 0.6s ease
slideInDown: 0.6s ease
slideIn: 0.3s ease
glow: pulso de opacidad
pulseGlow: 1.5s ease-in-out infinite
```

---

## 📦 DEPENDENCIAS

```json
{
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "tailwindcss": "4.x",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "typescript": "^5",
    "tailwindcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19"
  }
}
```

---

## 🔑 CARACTERÍSTICAS PRINCIPALES

### 1. Header/Navegación
- Logo: "⬡ NovaClicShop"
- Menú con emojis: Inicio (🏠), Productos (🛍️), Arduino (🤖), Celular (📱), Laptop (💻), Contacto (💬)
- Botones: Favoritos ❤️, Carrito 🛒 (con badge), Login 🔐
- Fijo al top, backdrop blur, animación slide-in-down
- Hover en menú: translateY(-2px), color rojo, box-shadow glow
- Active state: background rojo con sombra

### 2. Homepage
- Sección Hero con estadísticas (2M+ clientes, 98% satisfacción, 500+ productos)
- Animación SVG: Medusa con tentáculos animados
- Bento grid mostrando: ubicación, reseñas, marcas
- Sección "Servicios": 3 categorías (Arduino, Accesorios Celular, Accesorios Laptop)
- Call-to-action buttons: "Explorar Catálogo", "Ver Ofertas"

### 3. Página de Productos
- Grid responsivo (3 columnas desktop, 2 tablet, 1 mobile)
- Barra de búsqueda
- Filtros por categoría (sidebar izquierdo)
- Ordenar por: Relevancia, Precio (asc/desc), Nuevos
- ProductCard con: imagen, nombre, precio, rating, botón agregar al carrito
- Hover effects con animaciones
- 15+ productos demo (Arduino, Celular, Laptop)

### 4. Carrito de Compras
- Mostrar items con cantidad, precio unitario, subtotal
- Botones: + / - para cantidad, 🗑️ para eliminar
- Resumen: Subtotal, Envío, Total
- Botón "Ir a Checkout"
- Estado vacío: mensaje + botón "Seguir comprando"

### 5. Checkout
- Formulario multi-step (3 pasos):
  1. Dirección de envío
  2. Método de pago
  3. Resumen y confirmación
- Validación de campos
- Botones: Atrás, Siguiente, Confirmar Compra

### 6. Contextos
**AuthContext:**
- user state (null, { id, email, name, role })
- login(email, password)
- register(email, password, name)
- logout()

**CartContext:**
- cart: array de items { id, name, price, quantity }
- addToCart(product)
- removeFromCart(id)
- updateQuantity(id, quantity)
- clearCart()

### 7. Footer
- Logo + copyright
- Links: Inicio, Productos, Contacto
- Social media (opcional)
- Tema oscuro con bordes sutiles
- Responsive: stacked en mobile

---

## 🛍️ DATOS DE PRUEBA - 15 PRODUCTOS

### Arduino (5)
1. Arduino Uno R3 - $35
2. Arduino Mega 2560 - $45
3. Arduino Nano V3 - $25
4. DHT11 Sensor - $8
5. Relé Module 5V - $6

### Celular (5)
1. Cargador 65W USB-C - $15
2. Cable USB-C - $5
3. Protector de pantalla - $3
4. Funda TPU - $8
5. Power Bank 10000mAh - $20

### Laptop (5)
1. Cable HDMI 2m - $8
2. Hub USB 3.0 (4 puertos) - $25
3. Adaptador HDMI - $12
4. Cooler laptop - $18
5. Mousepad XXL - $10

---

## 🎯 REQUERIMIENTOS TÉCNICOS

✅ TypeScript strict mode
✅ Tailwind CSS 4 con variables CSS
✅ Responsive design (mobile-first)
✅ Animations smooth (0.3s ease)
✅ Dark theme consistente
✅ Context API para estado global
✅ Next.js Image optimization
✅ SEO meta tags básicos
✅ Componentes reutilizables
✅ Error handling

---

## 📝 INSTRUCCIONES PARA GROCK

**Crea un proyecto Next.js con la estructura anterior, incluyendo:**

1. Inicializa con `npx create-next-app@latest novaclicshopv2 --typescript --tailwind`
2. Copia esta estructura de carpetas
3. Implementa app/layout.tsx con dark theme global
4. Crea Header y Footer con CSS-in-JS (sin Tailwind clases, solo CSS variables)
5. Implementa 5+ páginas (home, products, cart, login, product/[id])
6. Crea AuthContext y CartContext
7. Agrega ProductCard component reutilizable
8. Incluye 15 productos demo
9. Animaciones: fadeInUp, slideInDown, hover effects
10. Responsive para móvil (max-width: 900px breakpoint)
11. Sin errores TypeScript
12. Build debe completar sin warnings

**Fecha de entrega:** Hoy
**Framework:** Next.js 16.2.6 + React 19 + Tailwind 4
**Lenguaje:** TypeScript
**Estilo:** Dark theme AgentAI con rojo (#e03030)

---

## 🚀 RESULTADO ESPERADO

Cuando todo esté listo:
```bash
npm run dev  # Debe iniciar sin errores
npm run build  # Debe compilar exitosamente
```

Abrir en navegador: `http://localhost:3000`
- ✅ Homepage con animaciones
- ✅ Navegación funcional
- ✅ Carrito working
- ✅ Dark theme consistente
- ✅ Todas las páginas responsivas

---

## 📞 NOTAS IMPORTANTES

- **No mover `app/`** a `src/` - debe estar en raíz
- **CSS variables** deben estar en `app/layout.tsx` dentro de `<style>` tag
- **Contextos** en `src/contexts/` con useContext hooks
- **Componentes** en `src/components/` organizados por tipo
- **Sin Tailwind clases obsoletas** - usar CSS-in-JS para animaciones complejas
- **Mobile first** - breakpoint principal: 900px

---

**¡Listo! Puedes copiar este prompt completo y enviarlo a Grock.**
