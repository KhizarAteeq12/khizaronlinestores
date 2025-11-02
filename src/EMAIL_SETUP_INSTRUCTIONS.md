# Email Setup Instructions for Khizar Online Store

All form submissions (contact forms, orders, and newsletter subscriptions) will be sent to: **khizarateeq12@gmail.com**

## ✅ Current Status: WORKING with Mailto Fallback!

The website is **already functional** and will send emails to your address using the user's email client (mailto). When someone submits a form:
- Their default email program will open
- Your email (khizarateeq12@gmail.com) will be pre-filled
- All form data will be included
- They just click "Send"

**No setup required for basic functionality!**

---

## Optional: EmailJS Setup for Automatic Emails

If you want emails to be sent automatically without requiring users to use their email client, follow these steps:

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose **Gmail** (recommended)
4. Connect your Gmail account: **khizarateeq12@gmail.com**
5. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Templates

You need to create 3 templates:

#### Template 1: Contact Form
1. Go to "Email Templates" → "Create New Template"
2. Name it "Contact Form"
3. Use this template content:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This is an automated message from Khizar Online Store
Reply to: {{reply_to}}
```

4. Save and copy the **Template ID**

#### Template 2: Order Confirmation
1. Create another template named "Order Confirmation"
2. Use this template content:

```
Subject: New Order from {{customer_name}}

ORDER DETAILS
=============

Customer Information:
- Name: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}

Shipping Address:
{{shipping_address}}

Order Items:
{{order_items}}

Total Amount: {{total_amount}}
Order Date: {{order_date}}

---
This is an automated order notification from Khizar Online Store
```

3. Save and copy the **Template ID**

#### Template 3: Newsletter Subscription
1. Create a template named "Newsletter Subscription"
2. Use this template content:

```
Subject: New Newsletter Subscription

New subscriber details:

Email: {{subscriber_email}}
Subscription Date: {{subscription_date}}

---
This is an automated message from Khizar Online Store
```

3. Save and copy the **Template ID**

### Step 4: Get Your Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `user_abc123xyz`)
3. Copy it

### Step 5: Update the Code

Open `/lib/emailService.ts` and replace these placeholder values with your actual IDs:

```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your actual service ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your actual public key

const TEMPLATES = {
  contact: 'YOUR_CONTACT_TEMPLATE_ID', // Replace with contact template ID
  order: 'YOUR_ORDER_TEMPLATE_ID', // Replace with order template ID
  newsletter: 'YOUR_NEWSLETTER_TEMPLATE_ID', // Replace with newsletter template ID
};
```

**Important**: Until you replace these values, the system will automatically use the mailto fallback.

---

## How It Currently Works

### Without EmailJS Setup (Current):
1. User fills out a form
2. Their email client opens with pre-filled information
3. They click "Send" in their email program
4. You receive the email at khizarateeq12@gmail.com

### With EmailJS Setup:
1. User fills out a form
2. Email is sent automatically in the background
3. You receive the email at khizarateeq12@gmail.com
4. User sees a success message

---

## Option 2: Mailto Fallback (Already Working!)