// Email service using EmailJS
// To set up:
// 1. Go to https://www.emailjs.com/
// 2. Create a free account
// 3. Add an email service (Gmail recommended)
// 4. Create email templates for each type (contact, order, newsletter)
// 5. Replace the IDs below with your actual EmailJS credentials

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

// Template IDs - create these in EmailJS dashboard
const TEMPLATES = {
  contact: 'YOUR_CONTACT_TEMPLATE_ID', // Contact form template
  order: 'YOUR_ORDER_TEMPLATE_ID', // Order confirmation template
  newsletter: 'YOUR_NEWSLETTER_TEMPLATE_ID', // Newsletter subscription template
};

// Check if EmailJS is properly configured
const isEmailJSConfigured = () => {
  return EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && 
         EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
         EMAILJS_SERVICE_ID.length > 0 &&
         EMAILJS_PUBLIC_KEY.length > 0;
};

// Load EmailJS script
const loadEmailJS = () => {
  return new Promise((resolve, reject) => {
    if (!isEmailJSConfigured()) {
      reject(new Error('EmailJS not configured'));
      return;
    }

    if (typeof window !== 'undefined' && (window as any).emailjs) {
      resolve((window as any).emailjs);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).emailjs) {
        (window as any).emailjs.init(EMAILJS_PUBLIC_KEY);
        resolve((window as any).emailjs);
      } else {
        reject(new Error('EmailJS failed to load'));
      }
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface NewsletterData {
  email: string;
}

interface OrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  zipCode: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  orderDate: string;
}

export const sendContactForm = async (data: ContactFormData): Promise<boolean> => {
  try {
    // Only try EmailJS if it's configured
    if (isEmailJSConfigured()) {
      const emailjs = await loadEmailJS();
      
      const templateParams = {
        to_email: 'khizarateeq12@gmail.com',
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        reply_to: data.email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        TEMPLATES.contact,
        templateParams
      );

      return true;
    } else {
      // Use mailto fallback directly
      throw new Error('EmailJS not configured');
    }
  } catch (error) {
    console.log('Using mailto fallback for contact form');
    
    // Fallback: Use mailto
    const subject = encodeURIComponent(`Contact Form: ${data.subject}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:khizarateeq12@gmail.com?subject=${subject}&body=${body}`;
    
    return false;
  }
};

export const sendOrderConfirmation = async (data: OrderData): Promise<boolean> => {
  try {
    // Only try EmailJS if it's configured
    if (isEmailJSConfigured()) {
      const emailjs = await loadEmailJS();

      const itemsList = data.items
        .map(item => `${item.name} - Qty: ${item.quantity} - $${item.price * item.quantity}`)
        .join('\n');

      const templateParams = {
        to_email: 'khizarateeq12@gmail.com',
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
        shipping_address: `${data.shippingAddress}, ${data.city}, ${data.zipCode}`,
        order_items: itemsList,
        total_amount: `$${data.total.toFixed(2)}`,
        order_date: data.orderDate,
        reply_to: data.customerEmail,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        TEMPLATES.order,
        templateParams
      );

      return true;
    } else {
      // Use mailto fallback directly
      throw new Error('EmailJS not configured');
    }
  } catch (error) {
    console.log('Using mailto fallback for order confirmation');
    
    // Fallback: Use mailto
    const subject = encodeURIComponent(`New Order from ${data.customerName}`);
    const itemsList = data.items
      .map(item => `${item.name} - Qty: ${item.quantity} - $${item.price * item.quantity}`)
      .join('\n');
    
    const body = encodeURIComponent(
      `New Order Details:\n\n` +
      `Customer: ${data.customerName}\n` +
      `Email: ${data.customerEmail}\n` +
      `Phone: ${data.customerPhone}\n\n` +
      `Shipping Address:\n${data.shippingAddress}\n${data.city}, ${data.zipCode}\n\n` +
      `Order Items:\n${itemsList}\n\n` +
      `Total: $${data.total.toFixed(2)}\n` +
      `Order Date: ${data.orderDate}`
    );
    
    window.open(`mailto:khizarateeq12@gmail.com?subject=${subject}&body=${body}`);
    
    return false;
  }
};

export const sendNewsletterSubscription = async (data: NewsletterData): Promise<boolean> => {
  try {
    // Only try EmailJS if it's configured
    if (isEmailJSConfigured()) {
      const emailjs = await loadEmailJS();

      const templateParams = {
        to_email: 'khizarateeq12@gmail.com',
        subscriber_email: data.email,
        subscription_date: new Date().toLocaleString(),
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        TEMPLATES.newsletter,
        templateParams
      );

      return true;
    } else {
      // Use mailto fallback directly
      throw new Error('EmailJS not configured');
    }
  } catch (error) {
    console.log('Using mailto fallback for newsletter subscription');
    
    // Fallback: Use mailto
    const subject = encodeURIComponent('New Newsletter Subscription');
    const body = encodeURIComponent(
      `New Newsletter Subscriber:\n\nEmail: ${data.email}\nDate: ${new Date().toLocaleString()}`
    );
    
    window.location.href = `mailto:khizarateeq12@gmail.com?subject=${subject}&body=${body}`;
    
    return false;
  }
};