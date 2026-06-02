# 🚀 NOVACLICSHOP - TIENDA VIRTUAL

## 📋 INFORMACIÓN DEL PROYECTO

**Framework:** Next.js 16.2.6 + TypeScript + React 19 + Tailwind CSS v4

---

## 🎨 DISEÑO GLOBAL (CSS VARIABLES)

Está en `app/globals.css`. Usar estas variables en TODOS los componentes:

```css
:root {
  --bg-primary: #080c14;      /* Fondo oscuro principal */
  --bg-secondary: #0f1626;    /* Fondo secundario */
  --bg-tertiary: #17223b;     /* Fondo terciario */
  --accent-cyan: #00f2fe;     /* Acento principal */
  --accent-purple: #9b51e0;   /* Acento púrpura */
  --accent-rose: #ff2a5f;     /* Acento rosa */
  --accent-yape: #7a1593;     /* Color Yape */
  --text-main: #f1f5f9;       /* Texto principal */
  --text-muted: #94a3b8;      /* Texto secundario */
  --border-color: rgba(255, 255, 255, 0.08);
  --font-primary: 'Outfit', sans-serif;
  --font-heading: 'Rajdhani', sans-serif;
}
```

**Animaciones disponibles:**
- `fadeIn` - Aparición con opacidad
- `slideInLeft` - Entra desde izquierda
- `slideInRight` - Entra desde derecha
- `slideInUp` - Entra desde abajo
- `scaleUp` - Aparece aumentando tamaño
- `pulseGlow` - Efecto brillo pulsante
- `bounce` - Rebota

---

## 📊 DATOS - PRODUCTS ARRAY (24 ITEMS)

```javascript
const PRODUCTS = [
  // ARDUINO (8)
  { id: "ard-01", name: "Placa Arduino UNO", price: 49.00, category: "arduino", image: "https://via.placeholder.com/200?text=Arduino+UNO", isNew: true, isPromo: false, subcategory: "placas", stock: 15, features: ["Microcontrolador ATmega328", "16 MHz", "14 pines digitales"], description: "La placa Arduino UNO es perfecta para principiantes en electrónica." },
  { id: "ard-02", name: "Resistencias (Pack 100)", price: 5.50, category: "arduino", image: "https://via.placeholder.com/200?text=Resistencias", isNew: false, isPromo: true, subcategory: "sensores", stock: 50, features: ["Múltiples valores", "1/4W", "Tolerancia 5%"], description: "Pack de 100 resistencias variadas para tus proyectos." },
  { id: "ard-03", name: "Sensor de Temperatura DHT11", price: 12.99, category: "arduino", image: "https://via.placeholder.com/200?text=DHT11", isNew: false, isPromo: false, subcategory: "sensores", stock: 20, features: ["Temperatura 0-50°C", "Humedad 20-80%", "Salida digital"], description: "Sensor de temperatura y humedad confiable para proyectos IoT." },
  { id: "ard-04", name: "Servomotor SG90", price: 8.75, category: "arduino", image: "https://via.placeholder.com/200?text=Servomotor", isNew: false, isPromo: false, subcategory: "actuadores", stock: 12, features: ["Rango 180°", "4.8V", "Compatible Arduino"], description: "Servo motor compacto ideal para robótica básica." },
  { id: "ard-05", name: "Pantalla LCD 16x2", price: 14.50, category: "arduino", image: "https://via.placeholder.com/200?text=LCD+16x2", isNew: true, isPromo: false, subcategory: "placas", stock: 8, features: ["16 caracteres x 2 líneas", "Interfaz I2C", "Retro iluminación"], description: "Display LCD para mostrar información en tus proyectos." },
  { id: "ard-06", name: "Módulo Bluetooth HC-05", price: 18.99, category: "arduino", image: "https://via.placeholder.com/200?text=HC-05", isNew: false, isPromo: false, subcategory: "sensores", stock: 10, features: ["Rango 100m", "Tasa baud 9600", "Alimentación 5V"], description: "Módulo Bluetooth para comunicación inalámbrica." },
  { id: "ard-07", name: "Regulador de Voltaje LM7805", price: 2.50, category: "arduino", image: "https://via.placeholder.com/200?text=LM7805", isNew: false, isPromo: false, subcategory: "placas", stock: 30, features: ["Salida 5V", "Corriente 1A", "Protección térmica"], description: "Regulador de voltaje lineal de 5V." },
  { id: "ard-08", name: "Sensor Ultrasónico HC-SR04", price: 16.99, category: "arduino", image: "https://via.placeholder.com/200?text=HC-SR04", isNew: true, isPromo: false, subcategory: "sensores", stock: 6, features: ["Rango 2-400cm", "Ángulo 15°", "Precisión ±3mm"], description: "Sensor ultrasónico para medir distancias." },

  // CELULAR (8)
  { id: "cel-01", name: "Cargador Samsung 25W", price: 35.00, category: "celular", image: "https://via.placeholder.com/200?text=Cargador+Samsung", isNew: false, isPromo: false, subcategory: "carga", stock: 25, features: ["USB-C", "Fast Charge", "Compatible Samsung"], description: "Cargador rápido original Samsung de 25W." },
  { id: "cel-02", name: "Audífonos Bluetooth Inalámbricos", price: 45.99, category: "celular", image: "https://via.placeholder.com/200?text=Audifonos+BT", isNew: true, isPromo: false, subcategory: "audio-cel", stock: 18, features: ["Batería 20h", "Bluetooth 5.0", "Cancelación ruido"], description: "Audífonos inalámbricos con cancelación de ruido activa." },
  { id: "cel-03", name: "Cable USB-C 2 metros", price: 12.50, category: "celular", image: "https://via.placeholder.com/200?text=Cable+USB-C", isNew: false, isPromo: true, subcategory: "carga", stock: 40, features: ["2 metros", "Carga rápida", "Datos 480Mbps"], description: "Cable USB-C de calidad para carga y transferencia." },
  { id: "cel-04", name: "Soporte Móvil Ajustable", price: 15.75, category: "celular", image: "https://via.placeholder.com/200?text=Soporte+Movil", isNew: false, isPromo: false, subcategory: "proteccion", stock: 22, features: ["360° rotación", "Aluminio", "Universal"], description: "Soporte ajustable para smartphone de cualquier tamaño." },
  { id: "cel-05", name: "Trípode para Celular", price: 28.50, category: "celular", image: "https://via.placeholder.com/200?text=Tripode+Celular", isNew: false, isPromo: false, subcategory: "proteccion", stock: 14, features: ["Altura 130cm", "Peso máx 1kg", "Bluetooth remoto"], description: "Trípode para celular con soporte y control remoto." },
  { id: "cel-06", name: "Protector de Pantalla Vidrio Templado", price: 8.99, category: "celular", image: "https://via.placeholder.com/200?text=Vidrio+Templado", isNew: false, isPromo: false, subcategory: "proteccion", stock: 50, features: ["0.3mm grosor", "Dureza 9H", "Anti huella"], description: "Protector de pantalla de vidrio templado anti huella." },
  { id: "cel-07", name: "Funda TPU Transparente", price: 9.99, category: "celular", image: "https://via.placeholder.com/200?text=Funda+TPU", isNew: false, isPromo: true, subcategory: "proteccion", stock: 35, features: ["Material TPU", "Ajuste perfecto", "Transparente"], description: "Funda protectora TPU transparente para smartphone." },
  { id: "cel-08", name: "PowerBank 20000mAh", price: 32.50, category: "celular", image: "https://via.placeholder.com/200?text=PowerBank", isNew: true, isPromo: false, subcategory: "carga", stock: 11, features: ["20000mAh", "USB-C", "Carga rápida 18W"], description: "Batería externa de 20000mAh para cargar tus dispositivos." },

  // COMPUTADORA (8)
  { id: "com-01", name: "Teclado Mecánico RGB", price: 89.99, category: "computadora", image: "https://via.placeholder.com/200?text=Teclado+Mecanico", isNew: true, isPromo: false, subcategory: "perifericos", stock: 7, features: ["Switches mecánicos", "RGB 16.8M", "Programable"], description: "Teclado mecánico RGB profesional para gaming." },
  { id: "com-02", name: "Mouse Gamer Óptico", price: 42.75, category: "computadora", image: "https://via.placeholder.com/200?text=Mouse+Gamer", isNew: false, isPromo: false, subcategory: "perifericos", stock: 16, features: ["3200 DPI", "USB", "6 botones"], description: "Mouse óptico ergonómico para gamer y profesionales." },
  { id: "com-03", name: "Audífonos Gamer con Micrófono", price: 54.50, category: "computadora", image: "https://via.placeholder.com/200?text=Audifonos+Gamer", isNew: false, isPromo: false, subcategory: "audio-pc", stock: 13, features: ["Sonido 7.1", "Micrófono desmontable", "Memoria de espuma"], description: "Audífonos gamer con sonido surround y micrófono." },
  { id: "com-04", name: "Refrigerador Laptop 5 Ventiladores", price: 48.99, category: "computadora", image: "https://via.placeholder.com/200?text=Cooler+Laptop", isNew: false, isPromo: true, subcategory: "almacenamiento", stock: 9, features: ["5 ventiladores", "Puerto USB", "Ajustable"], description: "Cooler para laptop con 5 ventiladores." },
  { id: "com-05", name: "Memoria USB 3.0 64GB", price: 18.50, category: "computadora", image: "https://via.placeholder.com/200?text=USB+64GB", isNew: false, isPromo: false, subcategory: "almacenamiento", stock: 28, features: ["USB 3.0", "64GB", "Lectura 100MB/s"], description: "Memoria USB 3.0 de 64GB con transferencia rápida." },
  { id: "com-06", name: "Hub USB 7 Puertos", price: 22.75, category: "computadora", image: "https://via.placeholder.com/200?text=Hub+USB", isNew: false, isPromo: false, subcategory: "almacenamiento", stock: 19, features: ["7 puertos USB", "Alimentación externa", "USB 3.0"], description: "Hub USB de 7 puertos con alimentación externa." },
  { id: "com-07", name: "Cámara Web 1080P", price: 35.00, category: "computadora", image: "https://via.placeholder.com/200?text=Webcam+1080p", isNew: true, isPromo: false, subcategory: "perifericos", stock: 12, features: ["Full HD 1080P", "Micrófono", "USB plug & play"], description: "Cámara web Full HD 1080P para videoconferencias." },
  { id: "com-08", name: "Mousepad Gaming Grande", price: 19.99, category: "computadora", image: "https://via.placeholder.com/200?text=Mousepad+Gaming", isNew: false, isPromo: false, subcategory: "almacenamiento", stock: 24, features: ["30x80cm", "Superficie suave", "Base antideslizante"], description: "Mousepad extra grande para gaming de precisión." }
];
```

---

## 📱 PÁGINAS A CREAR (7 TOTAL)

### 1. `app/products/page.tsx` - CATÁLOGO CON FILTROS
**Descripción:** Mostrar todos los productos con:
- Grid responsivo (4 columnas desktop, 2 móvil)
- Sidebar con filtros (categoría, subcategoría, precio)
- Barra de búsqueda en vivo
- Ordenamiento (precio, nombre, destacados)
- Badges NEW/-15% en productos
- Hover effects
- Carrito flotante

**Funcionalidades:**
```javascript
- Filtrar por categoría (arduino, celular, computadora)
- Filtrar por subcategoría
- Rango de precio (slider)
- Búsqueda por nombre
- Ordenar: Featured, Precio ASC/DESC, Nombre
- Total de resultados
- "No encontramos productos" si vacío
- Agregar a carrito (contador badge)
```

---

### 2. `app/product/[id]/page.tsx` - DETALLE PRODUCTO
**Descripción:** Página de producto individual con:
- Galería de imágenes (placeholder + zoom)
- Información completa
- Especificaciones técnicas
- Stock indicator
- Selector de cantidad
- Botón "Agregar al carrito"
- Botón "Agregar a favoritos"
- Comentarios/Reviews (mock)
- Productos relacionados

**Datos a mostrar:**
```javascript
- Nombre, Precio, Categoría
- Descripción larga
- Features/Especificaciones
- Stock (En stock/Agotado)
- Calificación (estrellas)
- Selector cantidad (1-99)
- Total = precio × cantidad
- Breadcrumb navigation
```

---

### 3. `app/checkout/page.tsx` - CARRITO Y PAGO
**Descripción:** Checkout completo con:
- Resumen del carrito (lista de items)
- Formulario: Nombre, Email, Teléfono, Dirección
- Cálculo de totales (subtotal, envío gratis, total)
- Instrucciones Yape con QR placeholder
- Campo número de operación (8 dígitos)
- Upload captura pago (opcional)
- Botón "Finalizar Compra"
- Validaciones de formulario

**Formulario campos:**
```javascript
- Nombre Completo *
- Email *
- Teléfono (9 dígitos) *
- Distrito: Santa Lucía (deshabilitado)
- Dirección exacta *
- Notas pedido (opcional)
- Número Yape (8 dígitos) *
- Captura pago (opcional image upload)
```

---

### 4. `app/login/page.tsx` - LOGIN
**Descripción:** Página de inicio de sesión
- Formulario: Email, Contraseña
- "Recuérdame"
- "Olvidé mi contraseña"
- Link a Registrarse
- Validaciones

---

### 5. `app/register/page.tsx` - REGISTRO
**Descripción:** Página de registro
- Formulario: Nombre, Email, Contraseña, Confirmar
- Términos y condiciones (checkbox)
- Validaciones de contraseña
- Link a Login

---

### 6. `app/cart/page.tsx` - CARRITO (Página completa)
**Descripción:** Ver carrito en página (no solo sidebar)
- Lista de items con edición
- Cantidad ajustable
- Botón eliminar por item
- Subtotal, envío, total
- Botón "Proceder al pago"
- "Seguir comprando" link
- Carrito vacío message

---

### 7. `app/admin/page.tsx` - DASHBOARD (Básico)
**Descripción:** Panel administrativo básico
- Estadísticas (total ventas, productos, pedidos)
- Tabla de órdenes recientes
- Gráficos mock
- Gestión básica

---

## 📐 ESTRUCTURA DE CARPETAS

```
app/
├── page.tsx ✅ (HOME - YA EXISTE)
├── products/
│   └── page.tsx (CREAR)
├── product/
│   └── [id]/
│       └── page.tsx (CREAR)
├── checkout/
│   └── page.tsx (CREAR)
├── login/
│   └── page.tsx (CREAR)
├── register/
│   └── page.tsx (CREAR)
├── cart/
│   └── page.tsx (CREAR)
└── admin/
    └── page.tsx (CREAR)

src/
├── components/ (Componentes reutilizables)
├── contexts/ (AuthContext, CartContext)
└── lib/ (Utilidades)
```

---

## 🎯 REQUISITOS TÉCNICOS

**Todos los archivos DEBEN tener:**

1. **Header:**
   ```javascript
   'use client';
   import { useState, useEffect } from 'react';
   import Link from 'next/link';
   ```

2. **Estructura CSS:**
   - Usar variables globales de `app/globals.css`
   - Inline `<style>` tags con diseño
   - Animaciones suaves (0.3s transitions)

3. **Responsivo:**
   - Desktop: 4 columnas grid
   - Tablet (1024px): 2 columnas
   - Mobile (768px): 1 columna
   - Usar `@media` queries

4. **Componentes:**
   - Importar PRODUCTS array en cada página que lo necesite
   - Usar `useState` para estado local
   - Usar `useEffect` para efectos

5. **Navegación:**
   - Breadcrumb en detalle producto
   - Links entre páginas con `<Link href="">`

---

## 🔗 CONEXIONES

**URL base:** `http://localhost:3000`

**Rutas:**
- `/` - Home
- `/products` - Catálogo
- `/product/ard-01` - Detalle (ejemplo)
- `/checkout` - Pago
- `/cart` - Carrito
- `/login` - Inicio sesión
- `/register` - Registro
- `/admin` - Admin

---

## 💾 DATOS A USAR

**Usar siempre:**
- `PRODUCTS` array (24 items)
- Variables CSS (--bg-primary, --accent-cyan, etc)
- FontAwesome icons (mediante CDN en layout.tsx)
- Images placeholder: `https://via.placeholder.com/`

---

## ✅ CHECKLIST FINAL

Cuando crees cada página:
- [ ] `'use client'` en la parte superior
- [ ] Importar PRODUCTS (si lo necesita)
- [ ] Usar variables CSS globales
- [ ] Responsive design (mobile-first)
- [ ] Animaciones suaves
- [ ] Estado con useState
- [ ] Validaciones de formularios
- [ ] Links entre páginas
- [ ] Badges (NEW, -15%)
- [ ] Totales y cálculos correctos
- [ ] FontAwesome icons
- [ ] Mensajes de error/éxito (toast o alert)

---

## 🚀 INSTRUCCIÓN FINAL

**Por favor crear TODAS las 7 páginas con:**
- Diseño completo (inline CSS)
- Datos funcionales (PRODUCTS array)
- Interactividad (estado, click handlers)
- Responsive
- Animaciones
- Consistencia con HOME (app/page.tsx)

**Después de crear, nosotros haremos mejoras.**

---

*Proyecto: NovaCliShop - Tienda de Electrónica*  
*Creado: 1 Junio 2026*
