import { motion } from 'motion/react';
import { ChevronRight, TrendingUp, Award, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCard } from './ProductCard';
import { Product, featuredProducts } from '../lib/products';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export function HomePage({ onAddToCart, onViewProduct, onNavigate }: HomePageProps) {
  const features = [
    { icon: TrendingUp, title: 'Premium Quality', description: 'Finest fabrics and craftsmanship' },
    { icon: Award, title: 'Authentic Designs', description: 'Traditional meets modern' },
    { icon: Truck, title: 'Fast Delivery', description: 'Delivered to your doorstep' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary"
      >
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Luxury Men's Clothing
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Discover our exquisite collection of traditional Pakistani menswear. 
                From elegant Shalwar Kameez to premium Boski suits.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('shop')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Shop Now
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('about')}
                  className="border-primary/30 hover:bg-primary/5"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-accent/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </motion.section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4"
                >
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <h3 className="text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Featured Collection
            </h2>
            <p className="text-muted-foreground">
              Handpicked selection of our finest pieces
            </p>
          </motion.div>

          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {featuredProducts.map((product, index) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewProduct}
                    delay={index * 0.1}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-6">
              Elevate Your Style Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Khizar for their traditional wardrobe
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate('shop')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Explore Full Collection
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
