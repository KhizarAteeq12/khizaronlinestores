import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);

    try {
      // Send via Formspree
      const response = await fetch('https://formspree.io/f/xldbdyyw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Newsletter Subscription',
          email: newsletterEmail,
          subscribedAt: new Date().toLocaleString(),
        }),
      });

      if (response.ok) {
        toast.success('Successfully subscribed to our newsletter!', {
          description: 'Thank you for subscribing. You will receive updates on new arrivals and exclusive offers.',
        });
        setNewsletterEmail('');
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Youtube, label: 'Youtube', href: '#' },
  ];

  const footerLinks = {
    Shop: ['Shalwar Kameez', 'Boski', 'Cotton Suit', 'Featured', 'New Arrivals'],
    Company: ['About Us', 'Contact', 'Careers', 'Press', 'Blog'],
    Support: ['Help Center', 'Shipping Info', 'Returns', 'Size Guide', 'Track Order'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  };

  return (
    <footer className="relative bg-gradient-to-br from-card via-secondary to-card border-t border-primary/20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-lg text-primary-foreground">K</span>
                </div>
                <span className="text-xl tracking-wider bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  KHIZAR
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Premium Pakistani menswear crafted with passion and precision. 
                Elevating traditional fashion to new heights of luxury.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center hover:shadow-lg transition-shadow"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-primary-foreground" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], sectionIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h3 className="text-sm mb-4 text-primary">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 mb-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Get exclusive offers, style tips, and new arrivals delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubscribing}
                className="flex-1 px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <motion.button
                type="submit"
                disabled={isSubscribing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
        >
          <p>© 2025 Khizar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gold Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </footer>
  );
}