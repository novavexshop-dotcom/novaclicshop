# 📖 GUÍA PASO A PASO - NovaClicShopV2

## Paso 1: Crear el proyecto Next.js base

Abre terminal en `c:\Users\VICTUS\Desktop\novaclicshopv2\` y ejecuta:

```bash
npx create-next-app@latest . --typescript --tailwind --app --no-git
```

Responde:
- Use ESLint? → **Yes**
- Use Tailwind CSS? → **Yes**
- Use TypeScript? → **Yes**
- Use src/ directory? → **No**
- Use App Router? → **Yes**

Resultado: Crea estructura base con `app/`, `public/`, `package.json`, etc.

---

## Paso 2: Instalar dependencias

```bash
npm install lucide-react
npm install -D @types/node @types/react
```

---

## Paso 3: Usar el GROCK_PROMPT.md

1. Abre Grock en tu navegador o IDE
2. Copia TODO el contenido de `GROCK_PROMPT.md`
3. Pega en Grock con el mensaje:

```
Eres un experto en Next.js 16, React 19, TypeScript y Tailwind CSS 4.

Tengo un proyecto e-commerce llamado NovaClicShop V2 que debo crear desde cero.

[PEGA AQUÍ TODO EL CONTENIDO DEL GROCK_PROMPT.md]

Por favor:
1. Crea todos los archivos de la estructura indicada
2. Implementa el layout global con tema oscuro
3. Crea Header, Footer y ProductCard
4. Implementa los Contextos (AuthContext y CartContext)
5. Crea todas las páginas listadas
6. Agrega animaciones suaves
7. Asegúrate que sea responsive
8. Todo debe compilar sin errores TypeScript
9. El build debe completar correctamente

Devuelve el código en bloques que pueda copiar directamente.
```

---

## Paso 4: Copiar archivos de Grock

Grock te dará los archivos. Copia cada uno en la carpeta correcta:

- `app/layout.tsx` → Raíz en `app/`
- `app/page.tsx` → Raíz en `app/`
- `src/components/layout/Header.tsx` → `src/components/layout/`
- etc.

---

## Paso 5: Verificar estructura

Después de copiar, tu carpeta debe verse así:

```
novaclicshopv2/
├── app/
│   ├── layout.tsx ✓
│   ├── page.tsx ✓
│   ├── products/
│   │   └── page.tsx ✓
│   ├── cart/
│   │   └── page.tsx ✓
│   └── globals.css
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx ✓
│   │   │   └── Footer.tsx ✓
│   │   └── product/
│   │       └── ProductCard.tsx ✓
│   └── contexts/
│       ├── AuthContext.tsx ✓
│       └── CartContext.tsx ✓
├── package.json
├── tsconfig.json
└── GROCK_PROMPT.md
```

---

## Paso 6: Verificar y compilar

```bash
cd c:\Users\VICTUS\Desktop\novaclicshopv2
npm run dev
```

Debe mostrar:
```
> Local:        http://localhost:3000
```

---

## Paso 7: Verificar en navegador

1. Abre http://localhost:3000
2. Deberías ver:
   - ✅ Página de inicio con tema oscuro
   - ✅ Header con navegación
   - ✅ Animación medusa (opcional en hero)
   - ✅ Footer con links
   - ✅ Todo en color rojo y negro

---

## 🆘 Si algo falla

### Error: "Module not found"
```bash
npm install
npm run dev
```

### Error: TypeScript
Asegúrate que tsconfig.json tiene:
```json
{
  "compilerOptions": {
    "strict": true,
    "lib": ["ES2020", "dom", "dom.iterable"]
  }
}
```

### Error: Tailwind no funciona
Verifica `tailwind.config.ts` tenga:
```typescript
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
}
```

### Build falla
```bash
npm run build
# Si hay errores, revisalos y corrígelos uno por uno
```

---

## 📝 Checklist Final

- [ ] Carpeta `novaclicshopv2` creada
- [ ] `GROCK_PROMPT.md` guardado
- [ ] Proyecto Next.js inicializado
- [ ] Dependencias instaladas (lucide-react)
- [ ] Prompt enviado a Grock
- [ ] Archivos copiados correctamente
- [ ] `npm run dev` funciona
- [ ] http://localhost:3000 se carga
- [ ] Tema oscuro visible
- [ ] Header con navegación funciona
- [ ] Carrito muestra badge
- [ ] Páginas de productos cargan

---

## 🎯 Resultado Final

Una tienda e-commerce completamente funcional con:
- ✅ 15+ productos
- ✅ Carrito de compras
- ✅ Autenticación (login/register)
- ✅ Checkout
- ✅ Tema oscuro AgentAI
- ✅ Animaciones suaves
- ✅ Responsive design
- ✅ Sin errores

---

**¡Listo para comenzar! 🚀**

---

## Paso 8: Conectar Supabase (Base de datos real para productos y pedidos)

Ya tienes el archivo `.env.local` con tu URL y key.

### 1. Abre el schema SQL
Abre el archivo:
`supabase/schema.sql`

Copia **TODO** el contenido (incluyendo los comentarios de instrucciones al inicio).

### 2. Ejecuta en Supabase Dashboard
1. Entra a: https://supabase.com/dashboard/project/fajnvwmhbjaxmproapqz
2. En el menú izquierdo haz clic en **SQL Editor**
3. Haz clic en **+ New query**
4. Borra cualquier cosa que esté en el editor.
5. Pega todo el contenido de `supabase/schema.sql`
6. Presiona el botón **Run** (o Ctrl + Enter)
7. Espera el mensaje de **Success**. Deberías ver que se crearon las tablas `products` y `orders` + policies.

### 3. Carga los productos iniciales desde el Admin
1. Reinicia el servidor de desarrollo (Ctrl+C y `npm run dev` otra vez, o usa el comando de kill en terminal si es necesario).
2. Ve a: http://localhost:3000/admin
3. Contraseña: `admin123` (o `1234`)
4. Una vez dentro, en la pestaña **Productos**, haz clic en el botón:
   **"Cargar 24 productos iniciales"**
5. Confirma. Esto hará UPSERT a la tabla de Supabase.

### 4. Verifica que funciona
- Ve a http://localhost:3000/products  (haz hard refresh: Ctrl + Shift + R)
- Deberías ver los 24 productos (puedes filtrar, buscar, etc.)
- Ve al home, los "Productos destacados" y "Nuevos lanzamientos" también deben venir de la base de datos.
- En Supabase Dashboard → **Table Editor** → selecciona la tabla `products` y verifica que hay filas.

### 5. Prueba el flujo de admin
- En /admin puedes:
  - Editar stock, precio (inline)
  - Activar/desactivar "Nuevo" u "Oferta"
  - Agregar nuevo producto
  - Eliminar
- Los cambios deben aparecer en el catálogo después de refrescar (o al volver a entrar al admin se recarga de Supabase).

### Notas importantes
- Por ahora usamos una policy permisiva ("Dev - Allow anon manage products") para que el admin funcione desde el navegador sin login real de Supabase. Esto es temporal para desarrollo.
- Los pedidos del checkout también se guardan en la tabla `orders`.
- Más adelante (producción) agregaremos autenticación real de usuarios y políticas más estrictas + Storage para imágenes de productos.

---

## Próximos pasos recomendados (después de Supabase)
- Probar checkout completo (Yape simulado) y ver el pedido en /admin → pestaña Pedidos
- Agregar más productos desde el admin
- Preparar deploy (Vercel) + dominio
- (Futuro) Auth real + tabla de usuarios + app móvil

**¡Ahora tu tienda tiene base de datos real y el admin controla el catálogo!**
