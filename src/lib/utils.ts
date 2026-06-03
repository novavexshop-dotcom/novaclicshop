import { Product, CartItem, SortOption } from './types';

export function formatPrice(price: number): string {
  return `S/ ${price.toFixed(2)}`;
}

export function generateOrderId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `NCS-${num}-${year}`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Filter + search + sort helper used by catalog and search dropdown
export function filterAndSortProducts(
  products: Product[],
  opts: {
    category?: string;
    subcategory?: string;
    search?: string;
    sort?: SortOption;
  }
): Product[] {
  let result = [...products];

  // Category
  if (opts.category && opts.category !== 'all') {
    result = result.filter((p) => p.category === opts.category);
  }

  // Subcategory
  if (opts.subcategory) {
    result = result.filter((p) => p.subcategory === opts.subcategory);
  }

  // Search (name + description)
  if (opts.search && opts.search.trim().length > 0) {
    const q = opts.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Sort
  switch (opts.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name, 'es'));
      break;
    case 'featured':
    default:
      // Featured first, then offers, then by id
      result.sort((a, b) => {
        const scoreA = (a.featured ? 100 : 0) + (a.isOffer ? 50 : 0);
        const scoreB = (b.featured ? 100 : 0) + (b.isOffer ? 50 : 0);
        if (scoreA !== scoreB) return scoreB - scoreA;
        return a.id - b.id;
      });
      break;
  }

  return result;
}

export function getProductById(products: Product[], id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

// Simple slug for future urls if needed
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Copy helper (used for Yape phone)
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

// Build WhatsApp message for order confirmation
export function buildWhatsAppMessage(order: {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  yapeOpNumber: string;
  total: number;
  items: CartItem[];
}): string {
  const itemsText = order.items
    .map((i) => `• ${i.name} x${i.quantity} - ${formatPrice(i.price * i.quantity)}`)
    .join('\n');

  return (
    `¡Hola NovaClicShop! He realizado un pedido.\n\n` +
    `*Código:* ${order.id}\n` +
    `*Cliente:* ${order.customerName}\n` +
    `*Teléfono:* ${order.customerPhone}\n` +
    `*Dirección:* ${order.customerAddress}\n` +
    `*N° Operación Yape:* ${order.yapeOpNumber}\n\n` +
    `*Productos:*\n${itemsText}\n\n` +
    `*Total pagado:* ${formatPrice(order.total)}\n\n` +
    `Por favor confirmar el pedido. ¡Gracias!`
  );
}
