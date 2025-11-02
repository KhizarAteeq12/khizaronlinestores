import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { Product, products } from '../lib/products';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';

interface ShopPageProps {
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export function ShopPage({ onAddToCart, onViewProduct }: ShopPageProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'shalwar-kameez', label: 'Shalwar Kameez' },
    { id: 'boski', label: 'Boski' },
    { id: 'cotton-suit', label: 'Cotton Suit' },
  ];

  const filteredProducts = products
    .filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Shop Collection
          </h1>
          <p className="text-muted-foreground">
            Explore our complete collection of {products.length} premium products
          </p>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-64 flex-shrink-0"
          >
            <div className="sticky top-24 space-y-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Filters
                </h3>

                {/* Categories */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => toggleCategory(category.id)}
                          />
                          <span className="text-sm">{category.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm mb-3">Price Range</h4>
                    <Slider
                      min={0}
                      max={10000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Reset Filters */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange([0, 10000]);
                    }}
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-6 right-6 z-30">
            <Button
              onClick={() => setFilterOpen(true)}
              className="rounded-full w-14 h-14 shadow-xl bg-primary hover:bg-primary/90"
            >
              <SlidersHorizontal className="w-6 h-6" />
            </Button>
          </div>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {filterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setFilterOpen(false)}
                  className="lg:hidden fixed inset-0 bg-black/50 z-40"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25 }}
                  className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-card z-50 overflow-y-auto p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg">Filters</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setFilterOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm mb-3">Category</h4>
                      <div className="space-y-2">
                        {categories.map(category => (
                          <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => toggleCategory(category.id)}
                            />
                            <span className="text-sm">{category.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm mb-3">Price Range</h4>
                      <Slider
                        min={0}
                        max={10000}
                        step={100}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Products Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={onAddToCart}
                      onViewDetails={onViewProduct}
                      delay={index * 0.05}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-muted-foreground">No products found matching your filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 10000]);
                  }}
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
