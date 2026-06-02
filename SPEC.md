# NOVACLICSHOP - TIENDA VIRTUAL

## INFORMACIÓN DEL PROYECTO

**Framework:** Next.js 16.2.6 + TypeScript + React 19 + Tailwind CSS v4  
**Comando:** `npm run dev`

---

## 🎨 DISEÑO GLOBAL

Usar variables CSS de `app/globals.css`:

```css
--bg-primary: #080c14
--bg-secondary: #0f1626
--bg-tertiary: #17223b
--accent-cyan: #00f2fe
--accent-purple: #9b51e0
--accent-rose: #ff2a5f
--text-main: #f1f5f9
--text-muted: #94a3b8
```

**Animaciones:** fadeIn, slideInLeft, slideInRight, slideInUp, scaleUp, pulseGlow, bounce

---

## 📊 PRODUCTOS (24 ITEMS)

24 productos distribuidos en 3 categorías con estructura:
```javascript
{ id, name, price, category, image, isNew, isPromo, subcategory, stock, features[], description }
```

---

## 📱 PÁGINAS A CREAR (7)

### 1. `/products` - CATÁLOGO
- Grid responsivo (4 cols desktop, 2 tablet, 1 mobile)
- Filtros: categoría, subcategoría, precio
- Búsqueda en vivo
- Ordenamiento
- Badges NEW/-15%
- Agregar a carrito

### 2. `/product/[id]` - DETALLE
- Galería de imágenes
- Especificaciones técnicas
- Selector cantidad
- Stock indicator
- Productos relacionados
- Breadcrumb

### 3. `/checkout` - PAGO
- Resumen carrito
- Formulario (Nombre, Email, Teléfono, Dirección, Notas)
- Totales (subtotal, envío, total)
- Instrucciones pago
- Validaciones

### 4. `/login` - LOGIN
- Email, Contraseña
- Recuérdame
- Olvidé contraseña
- Link a Registrarse

### 5. `/register` - REGISTRO
- Formulario de registro
- Validaciones
- Términos y condiciones

### 6. `/cart` - CARRITO (Página completa)
- Lista de items
- Editar cantidad
- Eliminar items
- Totales
- Proceder al pago

### 7. `/admin` - DASHBOARD
- Estadísticas
- Tabla de órdenes
- Gráficos mock

---

## 🎯 REQUISITOS

**Cada página DEBE tener:**

```javascript
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
```

- CSS inline con variables globales
- Responsive (@media queries)
- Animaciones suaves (0.3s)
- useState para estado
- useEffect para efectos
- PRODUCTS array importado (si necesita)
- Links entre páginas
- Validaciones de formularios
- FontAwesome icons
- Badges (NEW, -15%)

---

## 🔗 RUTAS

- `/` - Home
- `/products` - Catálogo
- `/product/prod-01` - Detalle
- `/checkout` - Pago
- `/cart` - Carrito
- `/login` - Login
- `/register` - Registro
- `/admin` - Admin

---

## 💾 DATOS

**PRODUCTS array:** 24 items con estructura completa  
**CSS Variables:** Disponibles en `app/globals.css`  
**Icons:** FontAwesome 6.4.0 (CDN)  
**Images:** `https://via.placeholder.com/`

---

## ✅ CREAR TODAS LAS 7 PÁGINAS CON:

- Diseño completo (inline CSS)
- Datos funcionales
- Interactividad (estado, handlers)
- Responsive
- Animaciones
- Consistencia con HOME

Después nosotros haremos mejoras.
