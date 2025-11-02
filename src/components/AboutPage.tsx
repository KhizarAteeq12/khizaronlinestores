import { motion } from 'motion/react';
import { Award, Users, TrendingUp, Heart } from 'lucide-react';

export function AboutPage() {
  const stats = [
    { value: '100+', label: 'Premium Products' },
    { value: '5000+', label: 'Happy Customers' },
    { value: '10+', label: 'Years Experience' },
    { value: '99%', label: 'Satisfaction Rate' },
  ];

  const values = [
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'Every piece is crafted with attention to detail and the finest materials.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority, from browsing to delivery.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We blend traditional designs with modern styles and trends.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for Pakistani menswear drives everything we do.',
    },
  ];

  const timeline = [
    { year: '2013', title: 'Founded', description: 'Khizar began as a small boutique in Karachi' },
    { year: '2016', title: 'Expansion', description: 'Opened three new stores across major cities' },
    { year: '2019', title: 'Online Launch', description: 'Launched our e-commerce platform' },
    { year: '2023', title: 'Today', description: 'Serving 5000+ customers with premium menswear' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-20 bg-gradient-to-br from-secondary via-background to-secondary overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.5) 2px, transparent 2px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover the journey of Khizar - where tradition meets luxury in every stitch
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                  className="text-4xl md:text-5xl text-primary mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl">A Legacy of Excellence</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2013, Khizar has been at the forefront of men's traditional Pakistani fashion. 
                What started as a passion for authentic craftsmanship has grown into a beloved brand trusted 
                by thousands of customers across the country. We take pride in offering premium shalwar kameez, 
                boski, and cotton suits that combine timeless elegance with contemporary style.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our commitment to quality is unwavering. Each piece in our collection is carefully selected 
                and crafted to meet the highest standards. From fabric sourcing to the final stitch, we ensure 
                that every garment reflects the rich heritage of Pakistani menswear while meeting the demands 
                of the modern gentleman.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-lg text-primary-foreground">{item.year}</span>
                  </div>
                  <div className="flex-1 bg-card rounded-xl p-6 border border-border shadow-lg">
                    <h3 className="text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - 3D Flip Cards */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Our Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  rotateY: 10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                style={{ perspective: 1000 }}
                className="bg-card rounded-xl p-6 border border-border shadow-lg hover:shadow-2xl transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4"
                >
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <h3 className="text-lg mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-12"
          >
            <h2 className="text-3xl md:text-4xl mb-6">
              Join the Khizar Family
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the perfect blend of tradition and luxury. Discover our collection today.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
