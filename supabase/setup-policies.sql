-- ============================================================
-- SOLO LAS POLÍTICAS (RLS) - Usa esto si ya creaste las tablas visualmente
-- ============================================================
-- 1. Ve a SQL Editor en Supabase
-- 2. Pega SOLO este bloque
-- 3. Run
-- ============================================================

-- Activar RLS en las tablas
alter table if exists products enable row level security;
alter table if exists orders enable row level security;

-- Productos: cualquiera puede leer (catálogo público)
drop policy if exists "Products are publicly readable" on products;
create policy "Products are publicly readable"
  on products for select using (true);

-- POLÍTICA DEV IMPORTANTE: permite que el Admin del sitio (usando la key pública)
-- pueda crear/editar/eliminar productos desde el navegador
drop policy if exists "Dev - Allow anon manage products" on products;
create policy "Dev - Allow anon manage products"
  on products
  for all
  to anon, authenticated, service_role
  using (true)
  with check (true);

-- Pedidos: cualquiera puede insertar (checkout)
drop policy if exists "Anyone can create orders" on orders;
create policy "Anyone can create orders"
  on orders for insert with check (true);

-- Solo admins pueden leer pedidos
drop policy if exists "Admin can read orders" on orders;
create policy "Admin can read orders"
  on orders for select
  using (auth.role() = 'authenticated' or auth.role() = 'service_role');