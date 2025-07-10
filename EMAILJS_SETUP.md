# EmailJS Setup Instructions

To enable email functionality in your portfolio, you need to set up EmailJS. Follow these steps:

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: Portfolio Contact: Message from {{from_name}}

From: {{from_name}} ({{from_email}})
Reply To: {{reply_to}}

Message:
{{message}}

---
Sent from: Sachit's Portfolio Website
Time: {{timestamp}}
```

4. Set template variables:
   - `from_name`
   - `from_email` 
   - `reply_to`
   - `message`
   - `timestamp`
5. Note down your **Template ID**

## 4. Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key**

## 5. Update Contact Component
Replace the placeholder values in `src/components/Contact.tsx`:

```javascript
const serviceId = 'YOUR_SERVICE_ID';     // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID';   // Replace with your Template ID  
const publicKey = 'YOUR_PUBLIC_KEY';     // Replace with your Public Key
```

## 6. Test Email Functionality
1. Save the changes
2. Fill out the contact form on your website
3. Check your email (skaistha16@gmail.com) for the message

## Alternative Solutions

If you prefer not to use EmailJS, consider these alternatives:

### 1. Formspree
- Simple form backend service
- Free tier available
- Easy integration

### 2. Netlify Forms
- Built into Netlify hosting
- No additional setup required
- Form submissions go to Netlify dashboard

### 3. Backend API
- Create your own email API
- Use services like SendGrid, Mailgun, or AWS SES
- More control but requires backend development

## Current Status
The contact form is currently set up with EmailJS integration but needs the actual service credentials to function. Until configured, users can still contact you directly via:
- Email: skaistha16@gmail.com
- Phone: +91 7876434370