import { motion } from 'motion/react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../lib/products';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  delay?: number;
}

export function ProductCard({ product, onAddToCart, onViewDetails, delay = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4"
        >
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-white">
              <span className="text-lg">${product.price}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-sm">{product.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewDetails(product)}
                className="bg-white/90 hover:bg-white border-none"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stock Badge */}
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs">
            Out of Stock
          </div>
        )}

        {/* New Badge (for first 10 products) */}
        {parseInt(product.id.split('-')[1]) <= 10 && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs">
            NEW
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 capitalize">
              {product.category.replace('-', ' ')}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-accent text-accent'
                    : 'text-muted'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
