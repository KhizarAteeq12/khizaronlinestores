import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { toast, Toaster } from 'sonner';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ProductModal } from './components/ProductModal';
import { FloatingCart } from './components/FloatingCart';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { Chatbot } from './components/Chatbot';
import { Product } from './lib/products';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    toast.success('Added to cart!', {
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });

    // Close modal if open
    if (isProductModalOpen) {
      setIsProductModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    toast.info('Removed from cart');
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleCheckoutComplete = (orderData?: any) => {
    toast.success('Order placed successfully!', {
      description: 'Thank you for your purchase. We will send you a confirmation email shortly.',
      duration: 5000,
    });
    
    if (orderData) {
      console.log('Order details:', orderData);
    }
    
    setCartItems([]);
    setCurrentPage('home');
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />
      <ScrollProgress />

      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isDark={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <HomePage
            key="home"
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            key="shop"
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
          />
        )}

        {currentPage === 'featured' && (
          <HomePage
            key="featured"
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'about' && <AboutPage key="about" />}

        {currentPage === 'contact' && <ContactPage key="contact" />}

        {currentPage === 'checkout' && (
          <CheckoutPage
            key="checkout"
            items={cartItems}
            onComplete={handleCheckoutComplete}
            onBack={() => setCurrentPage('shop')}
          />
        )}
      </AnimatePresence>

      {currentPage !== 'checkout' && <Footer />}

      <FloatingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
      />

      <Chatbot />
    </div>
  );
}