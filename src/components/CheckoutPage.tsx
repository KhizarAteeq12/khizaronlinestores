import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, MapPin, Package, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Product } from '../lib/products';
import { toast } from 'sonner';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CheckoutPageProps {
  items: CartItem[];
  onComplete: (orderData: any) => void;
  onBack: () => void;
}

export function CheckoutPage({ items, onComplete, onBack }: CheckoutPageProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: '',
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const steps = [
    { number: 1, title: 'Cart Review', icon: Package },
    { number: 2, title: 'Delivery Details', icon: MapPin },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Complete order and send via Formspree
      setIsSubmitting(true);

      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        notes: formData.notes,
        items: items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total: total,
        orderDate: new Date().toLocaleString(),
        paymentMethod: 'Cash on Delivery (COD)',
      };

      try {
        // Send order via Formspree
        const response = await fetch('https://formspree.io/f/xldbdyyw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderType: 'New Order',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
            notes: formData.notes,
            items: items.map(item => `${item.product.name} x${item.quantity} - PKR ${item.product.price * item.quantity}`).join('\n'),
            totalAmount: `PKR ${total}`,
            paymentMethod: 'Cash on Delivery (COD)',
            orderDate: orderData.orderDate,
          }),
        });

        if (response.ok) {
          toast.success('Order placed successfully!', {
            description: 'We will contact you shortly to confirm your order.',
            duration: 5000,
          });
          setTimeout(() => {
            onComplete(orderData);
          }, 1000);
        } else {
          throw new Error('Failed to submit order');
        }
      } catch (error) {
        console.error('Error submitting order:', error);
        toast.error('Failed to place order. Please try again or contact us directly.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      step >= s.number
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {step > s.number ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <s.icon className="w-6 h-6" />
                    )}
                  </div>
                  <p className="text-xs mt-2 text-center">{s.title}</p>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 bg-secondary">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: step > s.number ? '100%' : '0%' }}
                      className="h-full bg-primary"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Cart Review */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <h2 className="text-2xl">Review Your Order</h2>
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between py-4 border-b last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-secondary rounded-lg" />
                        <div>
                          <h4 className="text-sm">{item.product.name}</h4>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-primary">${item.product.price * item.quantity}</p>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-4 text-lg">
                    <span>Total:</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Delivery Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <h2 className="text-2xl">Delivery Information</h2>
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4">
                    <p className="text-sm flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Payment Method: <strong>Cash on Delivery (COD)</strong></span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Pay when you receive your order at your doorstep
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm mb-2 block">Full Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block">Email *</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">Phone Number *</label>
                    <Input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">Delivery Address *</label>
                    <Textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House/Flat No., Street Name, Area"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm mb-2 block">City *</label>
                      <Input
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Karachi"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block">ZIP / Postal Code</label>
                      <Input
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        placeholder="75500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">Order Notes (Optional)</label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any special instructions for delivery..."
                      rows={3}
                    />
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-lg mb-4">
                      <span>Total Amount:</span>
                      <span className="text-primary">PKR {total.toFixed(0)}</span>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3 text-sm">
                      <p className="flex items-center gap-2 mb-1">
                        <Check className="w-4 h-4 text-primary" />
                        Free delivery on orders above PKR 5000
                      </p>
                      <p className="text-xs text-muted-foreground ml-6">
                        Your order will be delivered within 3-5 business days
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => step === 1 ? onBack() : setStep(step - 1)}
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? 'Placing Order...' : step === 2 ? 'Place Order (COD)' : 'Continue'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}