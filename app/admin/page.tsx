'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/products';
import { getProductsSync, mapDbRowToProduct, mapProductToDb } from '@/lib/getProducts';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import Link from 'next/link';

interface Order {
  id: string;
  date: string;
  total: number;
  paymentMethod: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes?: string;
  };
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  status: string;
}

type AdminTab = 'productos' | 'pedidos' | 'categorias';

interface Category {
  name: string;
  subcategories: string[];
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('productos');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Products (editable)
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);

  // Editing state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'arduino',
    image: 'https://via.placeholder.com/600x450/141414/3B82F6?text=Producto+Nuevo',
    images: [],
    isNew: false,
    isPromo: false,
    subcategory: 'general',
    stock: 10,
    features: [''],
    description: '',
  });

  // UI feedback states
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Dynamic categories and subcategories (managed by user in admin)
  const [categories, setCategories] = useState<Category[]>([]);

  const saveCategories = (cats: Category[]) => {
    setCategories(cats);
    localStorage.setItem('adminCategories', JSON.stringify(cats));
  };

  // Load products and orders (Supabase first when configured, else localStorage)
  useEffect(() => {
    const loadData = async () => {
      // Products
      let prods: Product[] = getProductsSync();
      if (isSupabaseConfigured) {
        try {
          const { data } = await supabase.from('products').select('*');
          if (data && data.length > 0) {
            prods = data.map(mapDbRowToProduct);
            localStorage.setItem('adminProducts', JSON.stringify(prods));
          }
        } catch (e) {
          const saved = localStorage.getItem('adminProducts');
          if (saved) prods = JSON.parse(saved);
        }
      } else {
        const saved = localStorage.getItem('adminProducts');
        if (saved) prods = JSON.parse(saved);
      }
      setAdminProducts(prods);

      // Load and merge categories from localStorage + products
      let loadedCategories: Category[] = [];
      const savedCats = localStorage.getItem('adminCategories');
      if (savedCats) {
        try { loadedCategories = JSON.parse(savedCats); } catch {}
      }
      // Merge any categories from loaded products
      const productCats = new Map<string, Set<string>>();
      prods.forEach(p => {
        if (!productCats.has(p.category)) productCats.set(p.category, new Set());
        if (p.subcategory) productCats.get(p.category)!.add(p.subcategory);
      });
      productCats.forEach((subs, catName) => {
        const existing = loadedCategories.find(c => c.name === catName);
        if (existing) {
          subs.forEach(s => { if (!existing.subcategories.includes(s)) existing.subcategories.push(s); });
        } else {
          loadedCategories.push({ name: catName, subcategories: Array.from(subs) });
        }
      });
      if (loadedCategories.length === 0) {
        // default starter
        loadedCategories = [
          { name: 'arduino', subcategories: ['placas', 'sensores', 'componentes'] },
          { name: 'celular', subcategories: ['accesorios', 'cables', 'protectores'] },
          { name: 'computadora', subcategories: ['perifericos', 'componentes', 'gaming'] }
        ];
      }
      setCategories(loadedCategories);
      localStorage.setItem('adminCategories', JSON.stringify(loadedCategories));

      // Show connection status
      if (isSupabaseConfigured) {
        setActionMessage({ type: 'info', text: 'Conectado a Supabase (datos reales). Los cambios se guardan en la nube.' });
      } else {
        setActionMessage({ type: 'info', text: 'Sin conexión a Supabase. Usando solo almacenamiento local (temporal).' });
      }

      // Orders
      let ords: Order[] = [];
      if (isSupabaseConfigured) {
        try {
          const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
          if (data && data.length > 0) {
            ords = data.map((o: any) => ({
              id: o.id,
              date: o.created_at || o.date,
              total: Number(o.total),
              paymentMethod: o.payment_method || o.paymentMethod,
              customer: o.customer,
              items: o.items,
              status: o.status || 'Pendiente de pago',
            }));
          }
        } catch (e) {}
      }
      if (ords.length === 0) {
        const savedO = localStorage.getItem('orders');
        if (savedO) {
          ords = JSON.parse(savedO);
        } else {
          ords = [{
            id: 'NC-98765432',
            date: new Date(Date.now() - 86400000).toISOString(),
            total: 97.5,
            paymentMethod: 'yape',
            customer: { name: 'María López', email: 'maria@example.com', phone: '987654321', address: 'Jr. Las Palmas 456, Santa Lucía' },
            items: [
              { id: 'ard-01', name: 'Placa Arduino UNO', price: 49, quantity: 1 },
              { id: 'cel-03', name: 'Cable USB-C 2 metros', price: 12.5, quantity: 2 },
            ],
            status: 'Pagado',
          }];
          localStorage.setItem('orders', JSON.stringify(ords));
        }
      }
      setOrders(ords);
    };

    loadData();
  }, []);

  // Persist products (localStorage + Supabase when configured)
  const saveProducts = async (products: Product[]) => {
    setAdminProducts(products);
    localStorage.setItem('adminProducts', JSON.stringify(products));

    // Try to save to Supabase (map camelCase -> snake_case columns)
    if (isSupabaseConfigured) {
      try {
        const dbRows = products.map(mapProductToDb);
        const { error } = await supabase.from('products').upsert(dbRows);
        if (error) {
          console.warn('Supabase save warning:', error);
          setActionMessage({ type: 'error', text: 'No se pudo guardar en Supabase (verifica políticas o conexión). Cambios guardados localmente.' });
        } else {
          setActionMessage({ type: 'success', text: 'Cambios guardados en Supabase.' });
        }
      } catch (e) {
        console.warn('Supabase not reachable yet, using localStorage only');
        setActionMessage({ type: 'error', text: 'Error de red con Supabase. Se usó respaldo local.' });
      }
    }
  };

  // Persist orders
  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  // Simple auth for demo (owner can change password later)
  const handleLogin = () => {
    if (password === 'admin123' || password === '1234') {
      setIsAuthenticated(true);
      setPassword('');
      setActionMessage({ type: 'success', text: 'Acceso concedido. Recuerda: esta es una contraseña temporal para desarrollo.' });
    } else {
      alert('Contraseña incorrecta (prueba admin123 o 1234)');
    }
  };

  // Product actions
  const startEdit = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const saveEdit = () => {
    if (!editingProduct) return;

    const updated = adminProducts.map(p =>
      p.id === editingProduct.id ? editingProduct : p
    );
    saveProducts(updated);
    setActionMessage({ type: 'success', text: `Cambios guardados para "${editingProduct.name}".` });
    setEditingProduct(null);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return;
    const updated = adminProducts.filter(p => p.id !== id);
    saveProducts(updated);
  };

  // === Category / Subcategory management (user can add their own) ===
  const addCategory = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (categories.some(c => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setActionMessage({ type: 'error', text: 'Esa categoría ya existe.' });
      return;
    }
    const newCats = [...categories, { name: trimmed, subcategories: [] }];
    saveCategories(newCats);
    setActionMessage({ type: 'success', text: `Categoría "${trimmed}" agregada. Ahora puedes usarla en productos.` });
  };

  const addSubcategory = (catName: string, sub: string) => {
    const trimmed = sub.trim();
    if (!trimmed) return;
    const cat = categories.find(c => c.name === catName);
    if (!cat) return;
    if (cat.subcategories.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setActionMessage({ type: 'error', text: 'Esa subcategoría ya existe para esta categoría.' });
      return;
    }
    const newCats = categories.map(c =>
      c.name === catName ? { ...c, subcategories: [...c.subcategories, trimmed] } : c
    );
    saveCategories(newCats);
    setActionMessage({ type: 'success', text: `Subcategoría "${trimmed}" agregada a "${catName}".` });
  };

  const deleteCategory = (name: string) => {
    if (!confirm(`¿Eliminar la categoría "${name}"? (los productos que la usen seguirán teniendo el nombre hasta que los edites)`)) return;
    const newCats = categories.filter(c => c.name !== name);
    saveCategories(newCats);
    setActionMessage({ type: 'success', text: `Categoría "${name}" eliminada.` });
  };

  const deleteSubcategory = (catName: string, sub: string) => {
    const newCats = categories.map(c =>
      c.name === catName ? { ...c, subcategories: c.subcategories.filter(s => s !== sub) } : c
    );
    saveCategories(newCats);
    setActionMessage({ type: 'success', text: `Subcategoría "${sub}" eliminada de "${catName}".` });
  };

  // Image upload to Supabase Storage (for reference images)
  const uploadProductImage = async (file: File): Promise<string> => {
    if (!isSupabaseConfigured || !supabase) {
      // Fallback: convert to data URL for local use only (not ideal for production)
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('products')
        .upload(fileName, file, { upsert: true, contentType: file.type });

      if (error) throw error;

      const { data: urlData } = supabase.storage.from('products').getPublicUrl(fileName);
      return urlData.publicUrl;
    } catch (err: any) {
      console.error('Upload error', err);
      setActionMessage({ type: 'error', text: `Error subiendo imagen: ${err.message || err}. Asegúrate de tener el bucket "products" creado como público en Supabase Storage.` });
      throw err;
    }
  };

  const toggleField = (id: string, field: 'isNew' | 'isPromo' | 'stock' | 'price') => {
    const updated = adminProducts.map(p => {
      if (p.id === id) {
        if (field === 'isNew' || field === 'isPromo') {
          return { ...p, [field]: !p[field] };
        }
        // For stock/price we open edit instead
        return p;
      }
      return p;
    });
    saveProducts(updated);
  };

  // Add new product
  const addNewProduct = () => {
    const errors: Record<string, string> = {};
    if (!newProduct.name || newProduct.name.trim() === '') errors['name'] = 'El nombre es obligatorio.';
    if (!newProduct.price || Number(newProduct.price) <= 0) errors['price'] = 'El precio debe ser mayor a 0.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setActionMessage({ type: 'error', text: 'Revisa los campos marcados. Corrige los errores para continuar.' });
      return;
    }

    setFormErrors({});

    const id = 'new-' + Date.now().toString(36).slice(-6);

    const productToAdd: Product = {
      id,
      name: newProduct.name!.trim(),
      price: Number(newProduct.price),
      category: newProduct.category as any,
      image: newProduct.image || 'https://via.placeholder.com/600x450/141414/3B82F6?text=Nuevo',
      images: newProduct.images || [],
      isNew: !!newProduct.isNew,
      isPromo: !!newProduct.isPromo,
      subcategory: newProduct.subcategory || 'general',
      stock: Number(newProduct.stock) || 10,
      features: newProduct.features?.filter(Boolean) || ['Nuevo producto'],
      description: newProduct.description || 'Producto agregado desde el panel admin.',
      rating: 4.5,
      reviews: 0,
    };

    const updated = [productToAdd, ...adminProducts];
    saveProducts(updated);

    setActionMessage({ type: 'success', text: `Producto "${productToAdd.name}" agregado correctamente. Se guardó en Supabase si está conectado.` });

    // Reset form
    setNewProduct({
      name: '', price: 0, category: 'arduino', image: '', images: [], isNew: false, isPromo: false,
      subcategory: 'general', stock: 10, features: [''], description: '',
    });
    setShowAddForm(false);
  };

  const updateOrderStatus = (id: string, newStatus: string) => {
    const updated = orders.map(o =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    saveOrders(updated);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] pt-20 flex items-center justify-center">
        <div className="card p-10 max-w-sm w-full">
          <h1 className="text-3xl font-semibold tracking-[-1px] mb-2 text-center">Panel Admin</h1>
          <p className="text-center text-[#71717A] mb-8 text-sm">Acceso solo para el dueño de NovaClicShop</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="input mb-4"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

          <button onClick={handleLogin} className="btn-primary w-full py-3">
            Entrar al panel
          </button>

          <p className="text-center text-xs text-[#71717A] mt-4">
            Prueba: <span className="font-mono">admin123</span> o <span className="font-mono">1234</span>
          </p>

          <div className="mt-4 text-[11px] text-[#71717A] leading-tight text-center">
            <strong>Modo Admin temporal:</strong> contraseña simple porque el negocio está empezando.<br />
            En el futuro se reemplazará por login real con Supabase Auth.
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-[#3B82F6] hover:underline">Volver al sitio</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] pt-20">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-1.5px]">Panel de Administración</h1>
            <p className="text-[#71717A]">NovaClicShop — Santa Lucía • Dueño: tú (acceso con contraseña temporal)</p>
            <p className="text-[11px] text-[#3B82F6] mt-0.5">Consulta el informe en /informes/INFORME_ADMIN_Y_SUPABASE.md si necesitas recordar la configuración de Supabase o la contraseña.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="btn-secondary px-4 py-2 text-sm">Ver sitio</Link>
            <button onClick={() => setIsAuthenticated(false)} className="text-sm px-4 py-2 border border-white/20 rounded-full hover:bg-white/5">
              Salir
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-6">
          <button
            onClick={() => setActiveTab('productos')}
            className={`px-6 py-3 font-medium border-b-2 transition ${activeTab === 'productos' ? 'border-[#3B82F6] text-white' : 'border-transparent text-[#71717A]'}`}
          >
            Productos
          </button>
          <button
            onClick={() => setActiveTab('categorias')}
            className={`px-6 py-3 font-medium border-b-2 transition ${activeTab === 'categorias' ? 'border-[#3B82F6] text-white' : 'border-transparent text-[#71717A]'}`}
          >
            Categorías y Subcategorías
          </button>
          <button
            onClick={() => setActiveTab('pedidos')}
            className={`px-6 py-3 font-medium border-b-2 transition ${activeTab === 'pedidos' ? 'border-[#3B82F6] text-white' : 'border-transparent text-[#71717A]'}`}
          >
            Pedidos ({orders.length})
          </button>
        </div>

        {/* PRODUCTOS */}
        {activeTab === 'productos' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Gestión de Productos</h2>
                <p className="text-sm text-[#71717A]">Los cambios se guardan en Supabase (base de datos real). También quedan en tu navegador como respaldo.</p>
                <div className="mt-1 text-[11px] text-[#3B82F6]">
                  Guía rápida: Usa el botón de seed inicial • Edita stock directamente en la tabla • Activa "Nuevo" o "Oferta" con un clic • Agrega productos nuevos con el formulario.
                  Los datos se suben a Supabase para que aparezcan en el sitio público.
                </div>
              </div>
              <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary px-5 py-2 text-sm">
                + Agregar producto
              </button>
              <button 
                onClick={async () => {
                  if (!confirm('¿Cargar los 24 productos iniciales del catálogo?\nEsto reemplazará temporalmente datos locales y subirá todo a Supabase.\n\nÚsalo la primera vez o para resetear el catálogo.')) return;
                  setActionMessage({ type: 'info', text: 'Subiendo productos iniciales a Supabase...' });
                  const initial = getProductsSync(); // the static rich list (or current from Supabase if loaded)
                  if (isSupabaseConfigured) {
                    try {
                      const dbRows = initial.map(mapProductToDb);
                      await supabase.from('products').upsert(dbRows);
                      setActionMessage({ type: 'success', text: '¡24 productos cargados en Supabase! Refresca el catálogo público (/products) con Ctrl+Shift+R.' });
                    } catch(e) { 
                      console.warn(e); 
                      setActionMessage({ type: 'error', text: 'Error al subir a Supabase (revisa tu conexión o políticas). Se guardó en localStorage como respaldo.' });
                    }
                  } else {
                    setActionMessage({ type: 'info', text: 'Sin Supabase configurado. Solo se guardó en el navegador.' });
                  }
                  localStorage.setItem('adminProducts', JSON.stringify(initial));
                  setAdminProducts(initial);
                }}
                className="btn-secondary px-5 py-2 text-sm"
              >
                Cargar 24 productos iniciales
              </button>
            </div>

            {/* Feedback messages */}
            {actionMessage && (
              <div className={`mb-4 p-3 rounded text-sm ${actionMessage.type === 'success' ? 'bg-[#22C55E]/10 text-[#22C55E]' : actionMessage.type === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-[#3B82F6]/10 text-[#3B82F6]'}`}>
                {actionMessage.text}
                <button onClick={() => setActionMessage(null)} className="ml-2 underline text-xs">cerrar</button>
              </div>
            )}

            {/* Add form */}
            {showAddForm && (
              <div className="card p-6 mb-6">
                <h3 className="font-semibold mb-2">Nuevo producto</h3>
                <p className="text-xs text-[#71717A] mb-4">Completa los campos. Los datos se guardan en Supabase + respaldo local. Revisa que el nombre y precio sean correctos antes de agregar.</p>

                <div className="max-h-[55vh] overflow-y-auto pr-2 border border-white/10 rounded p-2 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Nombre del producto <span className="text-red-400">*</span></label>
                      <input className="input" placeholder="Ej: Arduino Uno R3" value={newProduct.name} onChange={e => { setNewProduct(p => ({ ...p, name: e.target.value })); if (formErrors['name']) setFormErrors(f => ({...f, ['name']: ''})); }} />
                      {formErrors['name'] && <p className="text-[10px] text-red-400 mt-0.5">{formErrors['name']}</p>}
                      <p className="text-[10px] text-[#71717A] mt-0.5">Nombre claro que ve el cliente.</p>
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Precio (S/) <span className="text-red-400">*</span></label>
                      <input className="input" type="number" step="0.01" min="0" placeholder="49.00" value={newProduct.price} onChange={e => { setNewProduct(p => ({ ...p, price: parseFloat(e.target.value) || 0 })); if (formErrors['price']) setFormErrors(f => ({...f, ['price']: ''})); }} />
                      {formErrors['price'] && <p className="text-[10px] text-red-400 mt-0.5">{formErrors['price']}</p>}
                      <p className="text-[10px] text-[#71717A] mt-0.5">Precio actual de venta (sin descuentos).</p>
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Categoría</label>
                      <div className="flex gap-2">
                        <select className="input flex-1" value={newProduct.category || ''} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}>
                          <option value="">-- Selecciona --</option>
                          {categories.map(c => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                        <button type="button" onClick={() => {
                          const name = prompt('Nombre de la nueva categoría:');
                          if (name) {
                            addCategory(name);
                            // select it after add
                            setTimeout(() => setNewProduct(p => ({ ...p, category: name.trim() })), 50);
                          }
                        }} className="btn-secondary px-3 text-xs whitespace-nowrap">+ Nueva</button>
                      </div>
                      <p className="text-[10px] text-[#71717A] mt-0.5">Puedes agregar tus propias categorías (ej: "herramientas", "kits").</p>
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Subcategoría</label>
                      <div className="flex gap-2">
                        <select className="input flex-1" value={newProduct.subcategory || ''} onChange={e => setNewProduct(p => ({ ...p, subcategory: e.target.value }))}>
                          <option value="">-- Selecciona o escribe --</option>
                          {(categories.find(c => c.name === newProduct.category)?.subcategories || []).map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                        <button type="button" onClick={() => {
                          const sub = prompt('Nombre de la nueva subcategoría:');
                          if (sub && newProduct.category) {
                            addSubcategory(newProduct.category, sub);
                            setTimeout(() => setNewProduct(p => ({ ...p, subcategory: sub.trim() })), 50);
                          } else if (!newProduct.category) {
                            alert('Primero selecciona o crea una categoría');
                          }
                        }} className="btn-secondary px-3 text-xs whitespace-nowrap">+ Nueva</button>
                      </div>
                      <p className="text-[10px] text-[#71717A] mt-0.5">Subcategorías por categoría. Agrega las tuyas.</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Imagen principal (URL o sube)</label>
                      <input className="input mb-2" placeholder="https://... o sube abajo" value={newProduct.image} onChange={e => setNewProduct(p => ({ ...p, image: e.target.value }))} />
                      <div>
                        <label className="btn-secondary px-4 py-1 text-xs cursor-pointer inline-block">
                          Subir imagen de referencia
                          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                setActionMessage({ type: 'info', text: 'Subiendo imagen...' });
                                const url = await uploadProductImage(file);
                                setNewProduct(p => ({ ...p, image: url }));
                                setActionMessage({ type: 'success', text: 'Imagen subida. URL guardada en el campo.' });
                              } catch (err) {}
                            }
                            e.target.value = '';
                          }} />
                        </label>
                        <span className="text-[10px] text-[#71717A] ml-2">Sube tu propia foto (se guarda en Supabase Storage)</span>
                      </div>
                      <p className="text-[10px] text-[#71717A] mt-0.5">También puedes pegar una URL externa. La imagen se usará como principal del producto.</p>
                    </div>

                    {/* Additional reference images for variants (different colors, brands, etc.) */}
                    <div className="md:col-span-2">
                      <label className="block text-xs mb-1 text-[#71717A]">Imágenes adicionales de referencia (diferentes colores/marcas del mismo tipo)</label>
                      <div className="flex flex-wrap gap-2 mb-2 min-h-[40px]">
                        {(newProduct.images || []).length > 0 ? (newProduct.images || []).map((img, idx) => (
                          <div key={idx} className="relative w-14 h-14 bg-[#1F1F1F] rounded overflow-hidden border border-white/10 group">
                            <img src={img} alt={`ref-${idx}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                const imgs = [...(newProduct.images || [])];
                                imgs.splice(idx, 1);
                                setNewProduct(p => ({ ...p, images: imgs }));
                              }}
                              className="absolute top-0 right-0 bg-red-600/80 text-white text-[10px] w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100"
                            >
                              ×
                            </button>
                          </div>
                        )) : (
                          <span className="text-[10px] text-[#71717A] italic">Sin imágenes adicionales. Agrega fotos de variantes (colores, marcas...).</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <label className="btn-secondary px-3 py-1 text-xs cursor-pointer">
                          + Subir foto adicional
                          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                setActionMessage({ type: 'info', text: 'Subiendo imagen adicional...' });
                                const url = await uploadProductImage(file);
                                const current = newProduct.images || [];
                                setNewProduct(p => ({ ...p, images: [...current, url] }));
                                setActionMessage({ type: 'success', text: 'Imagen adicional agregada.' });
                              } catch (err) {}
                            }
                            e.target.value = '';
                          }} />
                        </label>
                        <button type="button" onClick={() => {
                          const url = prompt('URL de imagen adicional de referencia:');
                          if (url) {
                            const current = newProduct.images || [];
                            setNewProduct(p => ({ ...p, images: [...current, url] }));
                          }
                        }} className="btn-secondary px-3 py-1 text-xs">+ Pegar URL</button>
                      </div>
                      <p className="text-[10px] text-[#71717A] mt-0.5">Estas fotos se mostrarán en la galería del producto. Perfecto para mostrar diferentes colores o marcas del mismo cargador, cable, etc.</p>
                    </div>

                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Stock inicial</label>
                      <input className="input" type="number" min="0" placeholder="10" value={newProduct.stock} onChange={e => setNewProduct(p => ({ ...p, stock: parseInt(e.target.value) || 0 }))} />
                      <p className="text-[10px] text-[#71717A] mt-0.5">Cantidad disponible. Si es 0 se considera agotado en el sitio.</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs mb-1 text-[#71717A]">Descripción</label>
                    <textarea className="input mt-1" placeholder="Breve descripción para el cliente..." value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} />
                    <p className="text-[10px] text-[#71717A] mt-0.5">Texto que aparece en la página del producto. Sé claro y útil.</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-4 items-center">
                  <button onClick={addNewProduct} className="btn-primary px-6">Agregar producto</button>
                  <button onClick={() => { setShowAddForm(false); setFormErrors({}); setActionMessage(null); }} className="btn-secondary px-6">Cancelar</button>
                  <span className="text-[10px] text-[#71717A] ml-2">Los campos con * son obligatorios. Revisa antes de guardar.</span>
                </div>
              </div>
            )}

            {/* Products list */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-white/10 bg-[#141414]">
                    <tr>
                      <th className="text-left p-4">Producto<br /><span className="text-[10px] font-normal text-[#71717A]">Nombre + subcategoría</span></th>
                      <th className="text-left p-4">Categoría</th>
                      <th className="text-right p-4">Precio</th>
                      <th className="text-center p-4">Stock<br /><span className="text-[10px] font-normal text-[#71717A]">0 = agotado</span></th>
                      <th className="text-center p-4">Estado (badges)<br /><span className="text-[10px] font-normal text-[#71717A]">Nuevo / Oferta</span></th>
                      <th className="text-right p-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminProducts.map(product => (
                      <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-[#71717A]">{product.subcategory}</div>
                        </td>
                        <td className="p-4 text-[#71717A]">{product.category}</td>
                        <td className="p-4 text-right font-medium tabular-nums">S/ {product.price}</td>
                        <td className="p-4 text-center">
                          <input
                            type="number"
                            value={product.stock}
                            onChange={e => {
                              const updated = adminProducts.map(p =>
                                p.id === product.id ? { ...p, stock: parseInt(e.target.value) || 0 } : p
                              );
                              saveProducts(updated);
                            }}
                            className="w-16 bg-transparent border border-white/20 text-center rounded"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex gap-1 justify-center text-xs">
                            <button onClick={() => toggleField(product.id, 'isNew')} className={`px-2 py-0.5 rounded ${product.isNew ? 'bg-[#3B82F6] text-white' : 'bg-white/10'}`}>
                              Nuevo
                            </button>
                            <button onClick={() => toggleField(product.id, 'isPromo')} className={`px-2 py-0.5 rounded ${product.isPromo ? 'bg-[#F59E0B] text-black' : 'bg-white/10'}`}>
                              Oferta
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => startEdit(product)} className="text-[#3B82F6] hover:underline text-xs">Editar</button>
                          <button onClick={() => deleteProduct(product.id)} className="text-red-400 hover:underline text-xs">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Edit modal */}
            {editingProduct && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="card w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto">
                  <h3 className="font-semibold mb-2">Editar producto</h3>
                  <p className="text-xs text-[#71717A] mb-4">Modifica los campos. Los cambios se guardan automáticamente en Supabase cuando pierdes el foco o cierras.</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Nombre</label>
                      <input className="input" value={editingProduct.name} onChange={e => setEditingProduct(p => p ? { ...p, name: e.target.value } : null)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs mb-1 text-[#71717A]">Precio (S/)</label>
                        <input className="input" type="number" step="0.01" value={editingProduct.price} onChange={e => setEditingProduct(p => p ? { ...p, price: parseFloat(e.target.value) } : null)} />
                      </div>
                      <div>
                        <label className="block text-xs mb-1 text-[#71717A]">Stock</label>
                        <input className="input" type="number" value={editingProduct.stock} onChange={e => setEditingProduct(p => p ? { ...p, stock: parseInt(e.target.value) } : null)} />
                        <p className="text-[10px] text-[#71717A]">0 = producto agotado</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Categoría</label>
                      <div className="flex gap-2">
                        <select className="input flex-1" value={editingProduct.category || ''} onChange={e => setEditingProduct(p => p ? { ...p, category: e.target.value } : null)}>
                          <option value="">-- Selecciona --</option>
                          {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                        </select>
                        <button type="button" onClick={() => {
                          const name = prompt('Nueva categoría:');
                          if (name) {
                            addCategory(name);
                            setTimeout(() => setEditingProduct(p => p ? { ...p, category: name.trim() } : null), 30);
                          }
                        }} className="btn-secondary px-2 text-xs">+ </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Imagen principal</label>
                      <input className="input mb-2" value={editingProduct.image} onChange={e => setEditingProduct(p => p ? { ...p, image: e.target.value } : null)} />
                      <label className="btn-secondary px-4 py-1 text-xs cursor-pointer inline-block">
                        Subir nueva imagen de referencia
                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              setActionMessage({ type: 'info', text: 'Subiendo imagen...' });
                              const url = await uploadProductImage(file);
                              setEditingProduct(p => p ? { ...p, image: url } : null);
                              setActionMessage({ type: 'success', text: 'Imagen actualizada.' });
                            } catch (err) {}
                          }
                          e.target.value = '';
                        }} />
                      </label>
                    </div>

                    {/* Additional images in edit modal */}
                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Imágenes adicionales de referencia</label>
                      <div className="flex flex-wrap gap-2 mb-2 min-h-[36px]">
                        {(editingProduct.images || []).length > 0 ? (editingProduct.images || []).map((img, idx) => (
                          <div key={idx} className="relative w-12 h-12 bg-[#1F1F1F] rounded overflow-hidden border border-white/10 group">
                            <img src={img} alt={`ref-${idx}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                const imgs = [...(editingProduct.images || [])];
                                imgs.splice(idx, 1);
                                setEditingProduct(p => p ? { ...p, images: imgs } : null);
                              }}
                              className="absolute top-0 right-0 bg-red-600/80 text-white text-[10px] w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100"
                            >
                              ×
                            </button>
                          </div>
                        )) : <span className="text-[10px] text-[#71717A] italic">Sin adicionales</span>}
                      </div>
                      <div className="flex gap-2">
                        <label className="btn-secondary px-3 py-1 text-xs cursor-pointer">
                          + Subir
                          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                setActionMessage({ type: 'info', text: 'Subiendo...' });
                                const url = await uploadProductImage(file);
                                const current = editingProduct.images || [];
                                setEditingProduct(p => p ? { ...p, images: [...current, url] } : null);
                                setActionMessage({ type: 'success', text: 'Agregada.' });
                              } catch (err) {}
                            }
                            e.target.value = '';
                          }} />
                        </label>
                        <button type="button" onClick={() => {
                          const url = prompt('URL adicional:');
                          if (url) {
                            const current = editingProduct.images || [];
                            setEditingProduct(p => p ? { ...p, images: [...current, url] } : null);
                          }
                        }} className="btn-secondary px-3 py-1 text-xs">+ URL</button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Subcategoría</label>
                      <div className="flex gap-2">
                        <select className="input flex-1" value={editingProduct.subcategory || ''} onChange={e => setEditingProduct(p => p ? { ...p, subcategory: e.target.value } : null)}>
                          <option value="">-- Selecciona --</option>
                          {(categories.find(c => c.name === editingProduct.category)?.subcategories || []).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                        </select>
                        <button type="button" onClick={() => {
                          const sub = prompt('Nueva subcategoría:');
                          if (sub && editingProduct.category) {
                            addSubcategory(editingProduct.category, sub);
                            setTimeout(() => setEditingProduct(p => p ? { ...p, subcategory: sub.trim() } : null), 30);
                          }
                        }} className="btn-secondary px-2 text-xs">+</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-[#71717A]">Descripción (lo que ve el cliente)</label>
                      <textarea className="input" value={editingProduct.description} onChange={e => setEditingProduct(p => p ? { ...p, description: e.target.value } : null)} />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={saveEdit} className="btn-primary flex-1">Guardar cambios</button>
                    <button onClick={cancelEdit} className="btn-secondary flex-1">Cancelar</button>
                  </div>
                  <p className="text-[10px] text-center text-[#71717A] mt-3">Los toggles de Nuevo/Oferta y el stock en la tabla también guardan al instante.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CATEGORÍAS Y SUBCATEGORÍAS - user managed */}
        {activeTab === 'categorias' && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Gestiona tus propias Categorías y Subcategorías</h2>
            <p className="text-sm text-[#71717A] mb-4">
              Aquí puedes agregar las categorías y subcategorías que quieras. Una vez agregadas, aparecerán en los formularios de productos.
              Esto te da libertad total (no estás limitado a Arduino/Celular/Computadora).
            </p>

            <div className="mb-6">
              <button onClick={() => {
                const name = prompt('Nombre de nueva categoría:');
                if (name) addCategory(name);
              }} className="btn-primary px-5 py-2 text-sm">+ Agregar nueva categoría</button>
            </div>

            {categories.length === 0 ? (
              <div className="card p-6 text-center text-[#71717A]">Aún no hay categorías. Agrega la primera.</div>
            ) : (
              <div className="space-y-4">
                {categories.map(cat => (
                  <div key={cat.name} className="card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-lg">{cat.name}</div>
                      <button onClick={() => deleteCategory(cat.name)} className="text-xs text-red-400 hover:underline">Eliminar categoría</button>
                    </div>

                    <div className="mb-2 text-xs text-[#71717A]">Subcategorías:</div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {cat.subcategories.length === 0 && <span className="text-xs text-[#71717A] italic">Sin subcategorías aún</span>}
                      {cat.subcategories.map(sub => (
                        <span key={sub} className="inline-flex items-center gap-1 bg-white/5 px-3 py-1 rounded text-sm">
                          {sub}
                          <button onClick={() => deleteSubcategory(cat.name, sub)} className="text-red-400 hover:text-red-300 text-xs ml-1">×</button>
                        </span>
                      ))}
                    </div>

                    <button onClick={() => {
                      const sub = prompt(`Nueva subcategoría para "${cat.name}":`);
                      if (sub) addSubcategory(cat.name, sub);
                    }} className="btn-secondary px-4 py-1 text-xs">+ Agregar subcategoría</button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-xs text-[#71717A]">
              Tip: Las categorías y subcategorías que agregues aquí se usarán en los formularios de "Agregar / Editar producto".
              Los productos existentes conservan el nombre que tenían.
            </div>
          </div>
        )}

        {/* PEDIDOS */}
        {activeTab === 'pedidos' && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Pedidos recibidos</h2>
            <p className="text-xs text-[#71717A] mb-4">Los pedidos vienen del checkout del sitio. Cambia el estado según avances (se guarda en Supabase si está conectado). Esto es lo que ves cuando un cliente compra.</p>

            {orders.length === 0 ? (
              <div className="card p-8 text-center text-[#71717A]">Aún no hay pedidos.</div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-mono text-[#3B82F6] text-lg">{order.id}</div>
                        <div className="text-sm text-[#71717A]">{new Date(order.date).toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold">S/ {order.total}</div>
                        <div className="text-xs text-[#71717A] capitalize">{order.paymentMethod}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <div className="text-[#71717A] mb-1">Cliente</div>
                        <div>{order.customer.name}</div>
                        <div>{order.customer.email} • {order.customer.phone}</div>
                        <div className="mt-1">{order.customer.address}</div>
                        {order.customer.notes && <div className="italic mt-1">“{order.customer.notes}”</div>}
                      </div>

                      <div>
                        <div className="text-[#71717A] mb-1">Productos</div>
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between">
                            <span>{item.name} ×{item.quantity}</span>
                            <span>S/ {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[#71717A] mr-2">Estado:</span>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="bg-[#141414] border border-white/20 rounded px-3 py-1 text-sm"
                        >
                          <option>Pendiente de pago</option>
                          <option>Pagado</option>
                          <option>Enviado</option>
                          <option>Entregado</option>
                          <option>Cancelado</option>
                        </select>
                      </div>
                      <div className="text-xs text-[#71717A]">Cambia el estado según avance el pedido</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
