export type Product = {
  id: string;
  name: string;
  price: number;
  category: string; // now dynamic - user can add any category
  image: string; // main image
  images?: string[]; // additional reference photos (different colors, brands, angles, etc.)
  isNew: boolean;
  isPromo: boolean;
  subcategory: string;
  stock: number;
  features: string[];
  description: string;
  rating?: number;
  reviews?: number;
  originalPrice?: number;
};

export const PRODUCTS: Product[] = [
  // === ARDUINO (8) ===
  {
    id: "ard-01",
    name: "Placa Arduino UNO",
    price: 49.00,
    category: "arduino",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Arduino+UNO+R3",
    isNew: true,
    isPromo: false,
    subcategory: "placas",
    stock: 15,
    features: ["Microcontrolador ATmega328", "16 MHz", "14 pines digitales", "6 pines PWM", "USB programable"],
    description: "La placa Arduino UNO es la más popular para principiantes y proyectos educativos. Ideal para prototipado rápido.",
    rating: 4.8,
    reviews: 124
  },
  {
    id: "ard-02",
    name: "Resistencias (Pack 100)",
    price: 5.50,
    category: "arduino",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Resistencias+Pack",
    isNew: false,
    isPromo: true,
    subcategory: "sensores",
    stock: 50,
    features: ["Múltiples valores", "1/4W", "Tolerancia 5%", "Banda de colores"],
    description: "Pack profesional de 100 resistencias de diferentes valores para todos tus proyectos electrónicos.",
    rating: 4.5,
    reviews: 89,
    originalPrice: 8.50
  },
  {
    id: "ard-03",
    name: "Sensor de Temperatura DHT11",
    price: 12.99,
    category: "arduino",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=DHT11",
    isNew: false,
    isPromo: false,
    subcategory: "sensores",
    stock: 20,
    features: ["Temperatura 0-50°C", "Humedad 20-80%", "Salida digital", "Alta precisión"],
    description: "Sensor digital de temperatura y humedad ideal para proyectos IoT, estaciones meteorológicas y automatización.",
    rating: 4.7,
    reviews: 156
  },
  {
    id: "ard-04",
    name: "Servomotor SG90",
    price: 8.75,
    category: "arduino",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Servomotor+SG90",
    isNew: false,
    isPromo: false,
    subcategory: "actuadores",
    stock: 12,
    features: ["Rango 180°", "4.8V-6V", "Torque 1.8kg/cm", "Compatible Arduino"],
    description: "Servomotor compacto y preciso, perfecto para robótica, brazos mecánicos y proyectos de movimiento controlado.",
    rating: 4.6,
    reviews: 78
  },
  {
    id: "ard-05",
    name: "Pantalla LCD 16x2",
    price: 14.50,
    category: "arduino",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=LCD+16x2+I2C",
    isNew: true,
    isPromo: false,
    subcategory: "placas",
    stock: 8,
    features: ["16 caracteres x 2 líneas", "Interfaz I2C", "Retroiluminación azul", "Fácil integración"],
    description: "Display LCD con módulo I2C incluido. Perfecto para mostrar información en proyectos Arduino y Raspberry Pi.",
    rating: 4.9,
    reviews: 67
  },
  {
    id: "ard-06",
    name: "Módulo Bluetooth HC-05",
    price: 18.99,
    category: "arduino",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=HC-05+Bluetooth",
    isNew: false,
    isPromo: false,
    subcategory: "sensores",
    stock: 10,
    features: ["Rango hasta 100m", "Baud rate 9600", "Alimentación 5V", "Modo maestro/esclavo"],
    description: "Módulo Bluetooth clásico para comunicación inalámbrica entre Arduino y smartphones o computadoras.",
    rating: 4.4,
    reviews: 93
  },
  {
    id: "ard-07",
    name: "Regulador de Voltaje LM7805",
    price: 2.50,
    category: "arduino",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=LM7805",
    isNew: false,
    isPromo: false,
    subcategory: "placas",
    stock: 30,
    features: ["Salida 5V estable", "Corriente máx 1A", "Protección térmica", "Fácil de usar"],
    description: "Regulador lineal de 5V muy confiable. Esencial para alimentar proyectos Arduino desde fuentes de mayor voltaje.",
    rating: 4.8,
    reviews: 45
  },
  {
    id: "ard-08",
    name: "Sensor Ultrasónico HC-SR04",
    price: 16.99,
    category: "arduino",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=HC-SR04",
    isNew: true,
    isPromo: false,
    subcategory: "sensores",
    stock: 6,
    features: ["Rango 2-400cm", "Ángulo 15°", "Precisión ±3mm", "Trigger/Echo"],
    description: "Sensor ultrasónico para medición de distancia sin contacto. Excelente para robots evitadores de obstáculos.",
    rating: 4.7,
    reviews: 112
  },

  // === CELULAR (8) ===
  {
    id: "cel-01",
    name: "Cargador Samsung 25W",
    price: 35.00,
    category: "celular",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Cargador+25W",
    isNew: false,
    isPromo: false,
    subcategory: "carga",
    stock: 25,
    features: ["USB-C PD", "Carga rápida 25W", "Compatible Samsung", "Seguro y eficiente"],
    description: "Cargador oficial de alta velocidad para dispositivos Samsung. Carga tu Galaxy en minutos.",
    rating: 4.9,
    reviews: 203
  },
  {
    id: "cel-02",
    name: "Audífonos Bluetooth Inalámbricos",
    price: 45.99,
    category: "celular",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Audifonos+BT",
    isNew: true,
    isPromo: false,
    subcategory: "audio-cel",
    stock: 18,
    features: ["Batería 20h", "Bluetooth 5.0", "Cancelación de ruido", "Micrófono integrado"],
    description: "Audífonos inalámbricos premium con cancelación activa de ruido y sonido de alta fidelidad.",
    rating: 4.6,
    reviews: 87
  },
  {
    id: "cel-03",
    name: "Cable USB-C 2 metros",
    price: 12.50,
    category: "celular",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Cable+USB-C+2m",
    isNew: false,
    isPromo: true,
    subcategory: "carga",
    stock: 40,
    features: ["2 metros de largo", "Carga rápida", "Datos 480Mbps", "Nylon trenzado"],
    description: "Cable USB-C de alta calidad y durabilidad. Ideal para cargar y sincronizar tu teléfono.",
    rating: 4.5,
    reviews: 134,
    originalPrice: 17.50
  },
  {
    id: "cel-04",
    name: "Soporte Móvil Ajustable",
    price: 15.75,
    category: "celular",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Soporte+Movil",
    isNew: false,
    isPromo: false,
    subcategory: "proteccion",
    stock: 22,
    features: ["Rotación 360°", "Aluminio premium", "Universal", "Base antideslizante"],
    description: "Soporte ajustable de escritorio para ver videos, videollamadas o usar tu teléfono sin usar las manos.",
    rating: 4.3,
    reviews: 56
  },
  {
    id: "cel-05",
    name: "Trípode para Celular",
    price: 28.50,
    category: "celular",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Tripode+Celular",
    isNew: false,
    isPromo: false,
    subcategory: "proteccion",
    stock: 14,
    features: ["Altura hasta 130cm", "Peso máximo 1kg", "Control remoto Bluetooth", "Cabezal giratorio"],
    description: "Trípode profesional con control remoto Bluetooth. Perfecto para fotos, videos y streaming.",
    rating: 4.8,
    reviews: 71
  },
  {
    id: "cel-06",
    name: "Protector de Pantalla Vidrio Templado",
    price: 8.99,
    category: "celular",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Vidrio+Templado",
    isNew: false,
    isPromo: false,
    subcategory: "proteccion",
    stock: 50,
    features: ["0.3mm de grosor", "Dureza 9H", "Anti-huellas", "Fácil instalación"],
    description: "Protector de vidrio templado premium que protege tu pantalla de rayones y caídas.",
    rating: 4.4,
    reviews: 189
  },
  {
    id: "cel-07",
    name: "Funda TPU Transparente",
    price: 9.99,
    category: "celular",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Funda+TPU",
    isNew: false,
    isPromo: true,
    subcategory: "proteccion",
    stock: 35,
    features: ["Material TPU flexible", "Ajuste perfecto", "Transparente", "Protección en bordes"],
    description: "Funda protectora transparente que mantiene el diseño original de tu teléfono mientras lo protege.",
    rating: 4.2,
    reviews: 112,
    originalPrice: 14.99
  },
  {
    id: "cel-08",
    name: "PowerBank 20000mAh",
    price: 32.50,
    category: "celular",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=PowerBank+20k",
    isNew: true,
    isPromo: false,
    subcategory: "carga",
    stock: 11,
    features: ["20000mAh reales", "USB-C + USB-A", "Carga rápida 18W", "Indicador LED"],
    description: "Batería externa de alta capacidad con carga rápida. Ideal para viajes y días largos fuera de casa.",
    rating: 4.9,
    reviews: 145
  },

  // === COMPUTADORA (8) ===
  {
    id: "com-01",
    name: "Teclado Mecánico RGB",
    price: 89.99,
    category: "computadora",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Teclado+Mecanico+RGB",
    isNew: true,
    isPromo: false,
    subcategory: "perifericos",
    stock: 7,
    features: ["Switches mecánicos", "RGB 16.8M colores", "Programable", "Hot-swap"],
    description: "Teclado mecánico profesional con iluminación RGB completa y switches de alta calidad para gaming y productividad.",
    rating: 4.8,
    reviews: 64
  },
  {
    id: "com-02",
    name: "Mouse Gamer Óptico",
    price: 42.75,
    category: "computadora",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Mouse+Gamer",
    isNew: false,
    isPromo: false,
    subcategory: "perifericos",
    stock: 16,
    features: ["Sensor óptico 3200 DPI", "6 botones programables", "Ergonómico", "Cable trenzado"],
    description: "Mouse gamer ergonómico con sensor de alta precisión. Ideal para gaming competitivo y trabajo diario.",
    rating: 4.6,
    reviews: 98
  },
  {
    id: "com-03",
    name: "Audífonos Gamer con Micrófono",
    price: 54.50,
    category: "computadora",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Audifonos+Gamer",
    isNew: false,
    isPromo: false,
    subcategory: "audio-pc",
    stock: 13,
    features: ["Sonido surround 7.1", "Micrófono desmontable", "Almohadillas de espuma", "Luz RGB"],
    description: "Audífonos gaming con sonido inmersivo y micrófono de alta calidad para streaming y partidas competitivas.",
    rating: 4.7,
    reviews: 82
  },
  {
    id: "com-04",
    name: "Refrigerador Laptop 5 Ventiladores",
    price: 48.99,
    category: "computadora",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Cooler+Laptop",
    isNew: false,
    isPromo: true,
    subcategory: "almacenamiento",
    stock: 9,
    features: ["5 ventiladores potentes", "Puerto USB", "Altura ajustable", "Base antideslizante"],
    description: "Cooler para laptop con 5 ventiladores que reduce significativamente la temperatura durante sesiones largas.",
    rating: 4.5,
    reviews: 57,
    originalPrice: 69.99
  },
  {
    id: "com-05",
    name: "Memoria USB 3.0 64GB",
    price: 18.50,
    category: "computadora",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=USB+64GB",
    isNew: false,
    isPromo: false,
    subcategory: "almacenamiento",
    stock: 28,
    features: ["USB 3.0 alta velocidad", "64GB capacidad", "Lectura hasta 100MB/s", "Compacto y resistente"],
    description: "Memoria USB 3.0 rápida y confiable para transferir archivos grandes en segundos.",
    rating: 4.6,
    reviews: 134
  },
  {
    id: "com-06",
    name: "Hub USB 7 Puertos",
    price: 22.75,
    category: "computadora",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Hub+USB+7",
    isNew: false,
    isPromo: false,
    subcategory: "almacenamiento",
    stock: 19,
    features: ["7 puertos USB 3.0", "Alimentación externa", "Alta velocidad", "Diseño compacto"],
    description: "Hub USB de 7 puertos con alimentación externa. Expande la conectividad de tu computadora fácilmente.",
    rating: 4.4,
    reviews: 76
  },
  {
    id: "com-07",
    name: "Cámara Web 1080P",
    price: 35.00,
    category: "computadora",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Webcam+1080P",
    isNew: true,
    isPromo: false,
    subcategory: "perifericos",
    stock: 12,
    features: ["Full HD 1080P", "Micrófono integrado", "USB plug & play", "Trípode incluido"],
    description: "Cámara web Full HD ideal para videollamadas, streaming, clases virtuales y trabajo remoto.",
    rating: 4.5,
    reviews: 59
  },
  {
    id: "com-08",
    name: "Mousepad Gaming Grande",
    price: 19.99,
    category: "computadora",
    image: "https://via.placeholder.com/600x450/0f1626/00f2fe?text=Mousepad+XXL",
    isNew: false,
    isPromo: false,
    subcategory: "almacenamiento",
    stock: 24,
    features: ["30x80cm extra grande", "Superficie suave", "Base antideslizante", "Bordes cosidos"],
    description: "Mousepad gaming de gran tamaño con superficie optimizada para precisión y control.",
    rating: 4.7,
    reviews: 91
  }
];

export const CATEGORIES = [
  { id: 'arduino', label: 'Arduino & Electrónica', icon: 'Cpu' },
  { id: 'celular', label: 'Celulares & Accesorios', icon: 'Smartphone' },
  { id: 'computadora', label: 'Computadoras & Gaming', icon: 'Monitor' }
] as const;

import { getProductsSync } from './getProducts';

export function getProductById(id: string): Product | undefined {
  return getProductsSync().find(p => p.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return getProductsSync().filter(p => p.category === category);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return [...getProductsSync()]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return getProductsSync().filter(p => p.isNew).slice(0, limit);
}