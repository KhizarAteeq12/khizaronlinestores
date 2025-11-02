import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, Check, Minus, Plus, RotateCw } from 'lucide-react';
import { Product } from '../lib/products';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [rotation, setRotation] = useState(0);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

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
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-card rounded-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
                {/* Image Section with 360° View */}
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] bg-secondary rounded-xl overflow-hidden">
                    <motion.div
                      animate={{ rotateY: rotation }}
                      transition={{ type: 'spring', stiffness: 100 }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRotation(rotation - 90)}
                      className="flex items-center gap-2"
                    >
                      <RotateCw className="w-4 h-4" />
                      Rotate
                    </Button>
                    <p className="text-xs text-muted-foreground">360° View</p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl mb-2">{product.name}</h2>
                    <p className="text-sm text-muted-foreground capitalize">
                      {product.category.replace('-', ' ')}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-accent text-accent'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">
                      {product.rating.toFixed(1)} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-3xl text-primary">
                    ${product.price}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>

                  {/* Color Selection */}
                  <div>
                    <label className="text-sm mb-3 block">Select Color</label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                            selectedColor === color
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <label className="text-sm mb-3 block">Select Size</label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                            selectedSize === size
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="text-sm mb-3 block">Quantity</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-lg w-12 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>

                  {/* Stock Status */}
                  {product.inStock && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Check className="w-4 h-4" />
                      <span>In Stock - Ships in 2-3 days</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
