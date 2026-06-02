# INFORME: Configuración del Modo Administrador y Supabase - NovaClicShop

**Fecha:** 2 de junio de 2026  
**Proyecto:** NovaClicShop v2 - Tienda virtual de electrónica (Arduino, Celulares, Computadoras)  
**Ubicación:** C:\Users\VICTUS\Desktop\novaclicshopv2

---

## 1. Resumen Ejecutivo

Se completó la integración con Supabase como base de datos real para productos y pedidos. El panel de administración permite al dueño (tú) agregar, editar, eliminar productos y gestionar pedidos desde el navegador, con cambios que se reflejan inmediatamente en el sitio público.

**Estado actual:** Funcional. El schema de Supabase se ejecutó exitosamente. El botón "Cargar 24 productos iniciales" sube los datos a Supabase.

---

## 2. Configuración de Supabase

### Credenciales (en .env.local)
- **URL:** https://fajnvwmhbjaxmproapqz.supabase.co
- **Anon Key (publishable):** sb_publishable_9bWRpWY0RXoRb8EhBrFvBA_ERQ7mWXp

**Archivo:** `.env.local` (no subir a git).

### Schema ejecutado
Se copió y ejecutó el contenido completo de `supabase/schema.sql` en el SQL Editor de Supabase (proyecto fajnvwmhbjaxmproapqz).

**Resultado:** "Success. No rows returned" (normal para CREATE TABLE / POLICY).

**Tablas creadas:**
- `products` (con columnas snake_case: is_new, is_promo, etc.)
- `orders`

**Políticas de seguridad (RLS):**
- Lectura pública de productos (catálogo visible para todos).
- Inserción pública de pedidos (checkout).
- **Política temporal de desarrollo ("Dev - Allow anon manage products")**: Permite que el panel Admin (que usa la key pública/anon desde el navegador) pueda hacer INSERT/UPDATE/DELETE en products sin necesidad de login de usuarios Supabase todavía.

**¿Por qué la política "dev" para anon?**
- El panel admin corre 100% en el cliente (browser) usando la anon key de Supabase.
- Sin esta política permisiva temporal, los upserts fallarían por RLS.
- **Importante:** Esta es solo para desarrollo/pruebas mientras el negocio empieza. En producción:
  - Eliminar o endurecer esta política.
  - Implementar autenticación real de Supabase (Auth) + roles de admin.
  - Usar service_role key solo en backend seguro.

**Archivos relacionados:**
- `supabase/schema.sql` (versión completa con instrucciones)
- `supabase/setup-policies.sql` (versión corta solo para políticas, útil si creas tablas visualmente)

---

## 3. Modo Administrador (Panel Admin)

### Ubicación
- Página: `app/admin/page.tsx`
- Acceso: http://localhost:3000/admin (o en producción en tu dominio)

### Autenticación actual (simple por contraseña)
Código en `app/admin/page.tsx`:

```ts
if (password === 'admin123' || password === '1234') {
  setIsAuthenticated(true);
}
```

**Contraseñas:**
- `admin123` (recomendada para uso diario)
- `1234` (alternativa de emergencia)

**¿Por qué contraseña hardcodeada simple?**
- El negocio está empezando ("estamos empezando", Santa Lucía).
- Permite acceso rápido sin configurar Auth completo de Supabase desde el día 1.
- Fácil de cambiar después (puedes mover las contraseñas a variables de entorno).
- **En producción:** Reemplazar por login real con Supabase Auth + tabla de admins, o JWT + middleware.

**Cómo cambiar la contraseña:**
Edita el if en `app/admin/page.tsx` líneas ~134-140.

### Funcionalidades del Admin

**Pestaña Productos:**
- Ver lista de productos (cargados primero desde Supabase si está configurado).
- **Cargar 24 productos iniciales**: Sube el seed desde `src/lib/products.ts` a Supabase vía upsert + guarda en localStorage como respaldo.
- Agregar producto nuevo (formulario).
- Editar inline (stock, toggles Nuevo/Oferta) o modal completo.
- Eliminar.
- Cambios se guardan en Supabase (si conectado) + localStorage.

**Pestaña Pedidos:**
- Lista de pedidos (desde Supabase o localStorage).
- Cambiar estado (Pendiente de pago → Pagado → Enviado → etc.).
- Datos del cliente y productos del pedido.

**Guardado híbrido:**
- Prioridad: Supabase (cuando `isSupabaseConfigured` = true desde .env).
- Fallback: localStorage (`adminProducts`, `orders`).
- Mappers en `src/lib/getProducts.ts` convierten entre snake_case (DB) y camelCase (app).

### Cómo usar para agregar/quitar productos
1. Entra al admin.
2. Usa el formulario "Agregar producto" o el botón de seed inicial.
3. Edita stock/precio directamente en la tabla (se guarda al instante).
4. Cambia badges "Nuevo" / "Oferta" con un clic.
5. Elimina si un producto ya no está disponible.
6. Refresca el catálogo público (/products) con Ctrl+Shift+R para ver cambios.

**Verificación en Supabase:**
- Table Editor → products (ver filas, editar manualmente si quieres).
- Table Editor → orders (ver pedidos del checkout).

---

## 4. Mejoras de UX realizadas en el Panel Admin (junio 2026)

Se mejoró significativamente el panel para que sea más fácil y seguro usarlo sin olvidar qué hace cada cosa:

- **Texto explicativo en casi todos los campos:** Ahora cada input tiene una etiqueta clara + una línea pequeña debajo explicando "para qué sirve" (ej: "Stock: cantidad disponible. 0 = agotado en el sitio", "isNew / Oferta: activa los badges que ven los clientes").
- **Validación en tiempo real:** Al agregar producto, si falta nombre o el precio es 0 o negativo, muestra mensajes rojos específicos debajo del campo ("El nombre es obligatorio", "El precio debe ser mayor a 0"). No deja guardar hasta corregir.
- **Mensajes de estado claros:** Aparece un banner arriba (azul/verde/rojo) que dice si estás conectado a Supabase, si se guardó bien, o si hubo error. Se puede cerrar.
- **Mejor formulario de "Nuevo producto":** Ahora usa labels reales, asteriscos en obligatorios, descripciones de cada campo, y el botón de seed tiene un texto de confirmación más detallado y útil.
- **Modal de edición mejorado:** Labels + explicaciones + nota final recordando que los toggles y stock en la tabla también guardan solos.
- **Encabezados de tabla más informativos:** "Stock (0 = agotado)", "Estado (badges) Nuevo / Oferta".
- **Guía rápida visible:** En la parte superior de "Gestión de Productos" hay un texto azul recordando el flujo.
- **Login con explicación:** Dice explícitamente que es temporal para desarrollo y menciona el informe.
- **Referencia al informe:** En el header del admin aparece un enlace mental al informe en /informes/.

Todo esto hace que sea mucho más difícil "poner mal los datos" y más fácil recordar para qué sirve cada opción.

---

## 5. Mejoras realizadas durante esta sesión (para que no te olvides)

- Schema con política dev anon para admin funcional inmediatamente.
- Mappers (mapDbRowToProduct / mapProductToDb) para compatibilidad DB ↔ App.
- Home y catálogo ahora cargan preferentemente desde Supabase + sincronizan localStorage.
- Admin seed y saves usan los mappers correctamente.
- Órdenes del checkout también se guardan en Supabase (con mapeo).

---

## 5. Pasos recomendados después de esta configuración

1. Verifica que después de "Cargar 24 productos iniciales" aparezcan las filas en Supabase Table Editor.
2. Haz cambios en admin y confirma que se ven en el sitio público.
3. Prueba un pedido completo (carrito → checkout Yape) y verifica que aparezca en admin y en tabla orders.
4. **Próximas mejoras de seguridad:**
   - Mover contraseñas a `.env.local` (NEXT_PUBLIC no, mejor variable de servidor o simple check).
   - Agregar login real con Supabase Auth.
   - Quitar o limitar la política "Dev - Allow anon...".
5. Sube imágenes reales (reemplaza los placeholder.com en los productos).
6. Cuando estés listo para producción: deploy a Vercel + variables de entorno + dominio.

---

## 6. Archivos clave relacionados con Admin + Supabase

- `app/admin/page.tsx` - Todo el panel.
- `src/lib/getProducts.ts` - Lógica de carga + mappers.
- `src/lib/supabase.ts` - Cliente Supabase + isSupabaseConfigured.
- `supabase/schema.sql` - El schema completo que se ejecutó.
- `.env.local` - Tus credenciales (nunca commitear).
- `app/checkout/page.tsx` - Guarda pedidos también en Supabase.
- `informes/INFORME_ADMIN_Y_SUPABASE.md` - Este documento.

---

## 7. Nuevas capacidades: Agregar tus propias Categorías, Subcategorías e Imágenes

A pedido, se agregó soporte completo para que **tú mismo** gestiones:

### Categorías y Subcategorías dinámicas
- Nueva pestaña en el Admin: **"Categorías y Subcategorías"**
- Puedes agregar cualquier categoría que quieras (ej: "herramientas", "kits didácticos", "sensores", "drones", etc.).
- Para cada categoría puedes agregar/eliminar subcategorías (ej: para "arduino" → "placas", "sensores", "kits", "cables").
- Los formularios de "Agregar producto" y "Editar" ahora usan selects dinámicos basados en lo que tú hayas agregado.
- Botones "+ Nueva" dentro de los formularios de producto para agregar al vuelo sin salir de la pestaña.
- Se persisten en localStorage (y se sincronizan con los productos que ya tienes).
- **Importante para Supabase**: El schema original tenía un CHECK constraint que limitaba las categorías. Si vas a usar categorías nuevas, ejecuta esto en SQL Editor:

```sql
ALTER TABLE products 
DROP CONSTRAINT IF EXISTS products_category_check;
```

(Esto quita la restricción para que acepte cualquier texto).

### Imágenes de referencia (upload propio)
- En los formularios de producto (nuevo y editar) ahora tienes:
  - Campo de URL (puedes pegar links externos).
  - Botón **"Subir imagen de referencia"** → selecciona foto de tu PC.
- Además: sección **"Imágenes adicionales de referencia"** donde puedes subir o pegar varias fotos (diferentes colores, marcas, ángulos del mismo tipo de producto).
- La imagen principal + las adicionales se guardan. En la página de detalle del producto aparece una galería de miniaturas para navegar entre ellas con clic.
- La imagen se sube a **Supabase Storage** (bucket llamado "products") y se guarda la URL pública automáticamente.
- Si no tienes el bucket aún:
  1. Ve a Supabase → Storage
  2. "New bucket"
  3. Nombre: `products`
  4. Marca "Public bucket"
  5. Create
- Si Supabase Storage no está disponible, hace fallback a data:URL (solo para pruebas locales).

Esto te da control total: agregas las categorías que tu negocio necesite y subes tus propias fotos de productos/referencias (ej: varios cargadores del mismo tipo pero diferente marca/color).

### Scroll con rueda del ratón en el Admin (mejora de usabilidad)
- El formulario "Agregar producto" tiene un área interna con scroll (max-h 55vh + overflow-y-auto) para que puedas usar la rueda del mouse cómodamente sin que la página se vuelva interminable.
- El modal de "Editar producto" es scrollable internamente (max-h 85vh + overflow-y-auto).
- La lista de productos en la tabla tiene scroll vertical cuando hay muchas filas (max-h 60vh).
- Esto resuelve el problema de "el panel o el agregar está muy grande para subir y bajar".

Recuerda ejecutar en Supabase (si no lo hiciste):
```sql
ALTER TABLE products ADD COLUMN IF NOT EXISTS images jsonb default '[]'::jsonb;
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
```

---

## 8. Notas importantes

- El sitio prioriza Supabase cuando las variables de entorno están presentes.
- Cambios en admin son persistentes en la DB real.
- Por ahora todo es "dueño único" (tú). No hay usuarios registrados todavía (eso viene después).
- El negocio está en fase inicial: Santa Lucía, catálogo creciendo, envíos locales.

**¡Listo!** Si olvidas algo, vuelve a este informe.

---

**Fin del informe.**  
Creado automáticamente por Grok para NovaClicShop.