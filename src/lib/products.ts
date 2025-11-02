export interface Product {
  id: string;
  name: string;
  category: 'shalwar-kameez' | 'boski' | 'cotton-suit';
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
}

// Real product images from Bin Imran collection
const productImages = [
  'https://binimran.com/cdn/shop/files/A45B3CA0-CC08-4115-B409-1C61136616C3.png?v=1756118764&width=940',
  'https://binimran.com/cdn/shop/collections/Screenshot-2023-05-27-19-38-11-63-99c04817c0de5652397fc8b56c3b3817.jpg?v=1685269357&width=1000',
  'https://binimran.com/cdn/shop/files/Screenshot-2023-10-01-01-54-16-80_99c04817c0de5652397fc8b56c3b3817.jpg?v=1696513419&width=1000',
  'https://binimran.com/cdn/shop/collections/30E8C762-80E7-4104-BEAA-DEF6B2EE5695.jpg?v=1724048092&width=1000',
  'https://binimran.com/cdn/shop/collections/IMG-20220211-WA0044.jpg?v=1645827428&width=1000',
  'https://binimran.com/cdn/shop/collections/06339C4C-AF2B-45B5-81EC-57D590DD876D.jpg?v=1724266164&width=1000',
  'https://binimran.com/cdn/shop/files/2CF3743B-9036-4BD9-BC9F-C7A087C52CEF.jpg?v=1740325769',
  'https://binimran.com/cdn/shop/files/D5FCF9B3-9517-49EB-8870-7A05AD6CB29C.jpg?v=1740325769',
  'https://binimran.com/cdn/shop/files/AB8D2E7C-3831-4FCD-9177-379581D4B1F3.png?v=1742295874&width=940',
  'https://binimran.com/cdn/shop/files/IMG-20240817-WA0049.jpg?v=1723916575&width=940',
  'https://binimran.com/cdn/shop/files/0481D47C-3F82-4E7E-94FB-98B31E4F0E04.png?v=1742295874&width=940',
  'https://binimran.com/cdn/shop/files/WhatsAppImage2025-02-08at4.41.31PM.jpg?v=1739017558&width=940',
  'https://binimran.com/cdn/shop/files/IMG-20240818-WA0032.jpg?v=1723977538&width=940',
  'https://binimran.com/cdn/shop/files/IMG-20240818-WA0029.jpg?v=1723977624&width=940',
  'https://binimran.com/cdn/shop/files/IMG-20240818-WA0033.jpg?v=1723977504&width=940',
  'https://binimran.com/cdn/shop/files/IMG-20240818-WA0035.jpg?v=1723977473&width=940',
  'https://binimran.com/cdn/shop/files/WhatsAppImage2024-05-12at10.25.07PM_5f9e2911-712c-4843-bd26-1f1838bdf973.jpg?v=1715618242&width=940',
  'https://binimran.com/cdn/shop/files/88B7EC0B-8F05-48E0-9968-2825F3D6D597.jpg?v=1725865925&width=940',
  'https://binimran.com/cdn/shop/files/WhatsAppImage2024-08-19at2.05.40PM_5.jpg?v=1724060549&width=940',
  'https://binimran.com/cdn/shop/files/IMG-20240818-WA0031.jpg?v=1723977670&width=940',
  'https://binimran.com/cdn/shop/files/IMG-20240818-WA0030.jpg?v=1723977583&width=940',
  'https://binimran.com/cdn/shop/files/IMG-20240818-WA0026.jpg?v=1723977757&width=940',
  'https://binimran.com/cdn/shop/files/ECB079A3-3586-4ACB-A7EC-2AABE5D9C93C.png?v=1754914951&width=940',
  'https://binimran.com/cdn/shop/files/WhatsAppImage2025-02-08at4.41.28PM_2.jpg?v=1739015791&width=940',
  'https://binimran.com/cdn/shop/files/5464BDAA-EC35-44B6-8A17-950ABF7316C7.png?v=1756118766&width=940',
  'https://binimran.com/cdn/shop/files/IMG-20240818-WA0027.jpg?v=1723977790',
  'https://binimran.com/cdn/shop/files/IMG-20240818-WA0034.jpg?v=1723977422',
];

// Generate 100+ products with variety - All priced at 4000 PKR
export const products: Product[] = [
  // Shalwar Kameez Collection (40 products)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `sk-${i + 1}`,
    name: `Premium Shalwar Kameez ${i + 1}`,
    category: 'shalwar-kameez' as const,
    price: 4000,
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 100) + 10,
    image: productImages[i % productImages.length],
    description: 'Elegant traditional shalwar kameez crafted with premium fabric and intricate embroidery.',
    colors: ['White', 'Cream', 'Grey', 'Black', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: Math.random() > 0.1,
  })),
  
  // Boski Collection (35 products)
  ...Array.from({ length: 35 }, (_, i) => ({
    id: `boski-${i + 1}`,
    name: `Luxury Boski Suit ${i + 1}`,
    category: 'boski' as const,
    price: 4000,
    rating: 4.2 + Math.random() * 0.8,
    reviews: Math.floor(Math.random() * 80) + 15,
    image: productImages[(i + 13) % productImages.length],
    description: 'Fine boski fabric suit with exceptional quality and contemporary design.',
    colors: ['Beige', 'Light Grey', 'Off-White', 'Charcoal', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: Math.random() > 0.15,
  })),
  
  // Cotton Suit Collection (35 products)
  ...Array.from({ length: 35 }, (_, i) => ({
    id: `cotton-${i + 1}`,
    name: `Premium Cotton Suit ${i + 1}`,
    category: 'cotton-suit' as const,
    price: 4000,
    rating: 4.1 + Math.random() * 0.9,
    reviews: Math.floor(Math.random() * 90) + 20,
    image: productImages[(i + 7) % productImages.length],
    description: 'Comfortable cotton suit perfect for everyday wear with elegant styling.',
    colors: ['White', 'Sky Blue', 'Mint', 'Peach', 'Lavender'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: Math.random() > 0.08,
  })),
];

export const featuredProducts = products.slice(0, 8);

export const getProductById = (id: string) => products.find(p => p.id === id);

export const getProductsByCategory = (category: string) => 
  products.filter(p => p.category === category);