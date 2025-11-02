import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      onAnimationComplete={onComplete}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
      />

      {/* Logo Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo with Glow Effect */}
        <motion.div
          className="relative"
          animate={{
            filter: [
              'drop-shadow(0 0 10px rgb(212, 175, 55))',
              'drop-shadow(0 0 30px rgb(255, 215, 0)) drop-shadow(0 0 50px rgb(212, 175, 55))',
              'drop-shadow(0 0 10px rgb(212, 175, 55))',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-24 h-24 text-primary" strokeWidth={1.5} />
        </motion.div>

        {/* Brand Name */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl tracking-wider bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            KHIZAR
          </h1>
          <p className="text-muted-foreground mt-2 tracking-widest">
            LUXURY MENSWEAR
          </p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="w-48 h-1 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
