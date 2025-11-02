import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Product } from '../lib/products';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItem {
  product: Product;
  quantity: number;
}

interface FloatingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function FloatingCart({ isOpen, onClose, items, onRemoveItem, onCheckout }: FloatingCartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  Your Cart ({items.length})
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="mt-4"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-4 bg-secondary/50 rounded-lg"
                    >
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm line-clamp-2 mb-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm text-primary">
                          ${item.product.price * item.quantity}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="flex-shrink-0 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
                <Button
                  size="lg"
                  onClick={onCheckout}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onClose}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
