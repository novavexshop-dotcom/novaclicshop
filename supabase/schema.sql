-- ============================================================
-- NovaClicShop - Supabase Schema (para tienda real)
-- ============================================================
-- INSTRUCCIONES:
-- 1. Ve a tu proyecto Supabase: https://supabase.com/dashboard/project/fajnvwmhbjaxmproapqz
-- 2. En el menú lateral: SQL Editor
-- 3. Click "+ New query"
-- 4. Borra todo lo que haya en el editor
-- 5. Copia TODO este archivo (desde -- hasta el final)
-- 6. Pégalo completo
-- 7. Presiona Run (o Ctrl + Enter)
-- 8. Espera a que diga "Success" o ve los mensajes.
--
-- DESPUÉS DE CORRER ESTO:
-- - Ve al Admin de la web (/admin) con password "admin123"
-- - Haz clic en "Cargar 24 productos iniciales"
-- - Eso va a subir los productos a la base de datos real.
-- ============================================================

-- 1. Tabla de productos (columnas en snake_case para Postgres)
create table if not exists products (
  id text primary key,
  name text not null,
  price numeric not null,
  category text not null, -- dynamic categories (user can add any) - removed the old CHECK constraint
  image text,
  images jsonb default '[]'::jsonb,
  is_new boolean default false,
  is_promo boolean default false,
  subcategory text,
  stock integer default 0,
  features jsonb default '[]'::jsonb,
  description text,
  rating numeric default 4.5,
  reviews integer default 0,
  original_price numeric,
  created_at timestamptz default now()
);

-- 2. Tabla de pedidos (orders)
create table if not exists orders (
  id text primary key,
  created_at timestamptz default now(),
  total numeric not null,
  payment_method text,
  status text default 'Pendiente de pago',
  customer jsonb,
  items jsonb
);

-- 3. Activar Row Level Security (RLS)
alter table products enable row level security;
alter table orders enable row level security;

-- ============================================================
-- POLÍTICAS DE SEGURIDAD
-- ============================================================

-- Productos: Cualquiera puede LEER (catálogo público)
drop policy if exists "Products are publicly readable" on products;
create policy "Products are publicly readable"
  on products for select
  using (true);

-- ============================================================
-- POLÍTICA TEMPORAL PARA DESARROLLO (IMPORTANTE)
-- Permite que el panel Admin (que usa la anon key desde el navegador)
-- pueda insertar, actualizar y borrar productos.
-- 
-- ⚠️ ESTO ES SOLO PARA DESARROLLO / PRUEBAS.
-- Cuando tengas auth real de administradores (con usuarios Supabase),
-- debes ELIMINAR esta política y usar la de "authenticated".
-- ============================================================
drop policy if exists "Dev - Allow anon manage products" on products;
create policy "Dev - Allow anon manage products"
  on products
  for all
  to anon, authenticated, service_role
  using (true)
  with check (true);

-- (Opcional - comentada por si quieres la versión estricta más adelante)
-- drop policy if exists "Admin can manage products" on products;
-- create policy "Admin can manage products"
--   on products for all
--   using (auth.role() = 'authenticated' or auth.role() = 'service_role')
--   with check (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- Pedidos: Cualquiera puede crear un pedido (desde el checkout)
drop policy if exists "Anyone can create orders" on orders;
create policy "Anyone can create orders"
  on orders for insert
  with check (true);

-- Solo "admins" (authenticated) pueden leer los pedidos
drop policy if exists "Admin can read orders" on orders;
create policy "Admin can read orders"
  on orders for select
  using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- ============================================================
-- NOTAS
-- - features se guarda como JSON array (ej: ["Microcontrolador", "USB"])
-- - El Admin UI va a hacer UPSERT de los productos.
-- - Los pedidos se guardan con customer e items como JSON.
-- ============================================================