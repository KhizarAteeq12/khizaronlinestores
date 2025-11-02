import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ cartCount, onCartClick, currentPage, onNavigate, isDark, onToggleTheme }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'Featured', id: 'featured' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-b border-primary/20 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground">K</span>
            </div>
            <span className="text-lg tracking-wider bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              KHIZAR
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg transition-colors relative ${
                  currentPage === item.id ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <AnimatePresence>
              {searchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-3 py-1.5 bg-secondary rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                  />
                </motion.div>
              ) : (
                <motion.button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Search className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Theme Toggle */}
            <motion.button
              onClick={onToggleTheme}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Cart */}
            <motion.button
              onClick={onCartClick}
              className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-primary/20"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-secondary'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
