# 📧 Email Notifications Setup Guide

Email notifications are now configured! You'll receive an email whenever someone contacts you through your portfolio.

## 🔑 Gmail App Password Setup (REQUIRED)

You need to create a Gmail "App Password" to allow the portfolio to send emails on your behalf.

### Step-by-Step Instructions:

#### 1. **Enable 2-Factor Authentication** (if not already enabled)
   - Go to: https://myaccount.google.com/security
   - Find "2-Step Verification" and turn it ON
   - Follow the setup process

#### 2. **Create App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Or search "App passwords" in your Google Account settings
   - Sign in if prompted
   
   - **Select app:** Choose "Mail" or "Other (Custom name)"
   - **Type:** "Portfolio Contact Form"
   - Click **Generate**
   
   - You'll get a **16-character password** like: `abcd efgh ijkl mnop`

#### 3. **Add to Your .env File**
   - Open: `backend/.env`
   - Find line: `EMAIL_PASS=your_gmail_app_password_here`
   - Replace with your app password (remove spaces):
   
   ```
   EMAIL_PASS=abcdefghijklmnop
   ```
   
   - Save the file

#### 4. **Restart Backend Server**
   ```bash
   cd backend
   node server.js
   ```

## ✅ Test It!

1. Go to: http://localhost:3000/contact
2. Fill out the form with test data
3. Click "Send Message"
4. Check your email: **gtilahun2121@gmail.com**

You should receive a beautiful HTML email with:
- ✅ Sender's name and email
- ✅ Subject
- ✅ Message
- ✅ Timestamp
- ✅ Professional styling

## 📧 Email Features

**What you'll receive:**
- Beautiful HTML formatted email
- Sender's name, email, subject, message
- Timestamp of when message was sent
- Reply directly to sender's email
- Professional portfolio branding

**Backup:**
- Messages still saved to MongoDB database
- Access via Admin Dashboard (future feature)

## 🔧 Current Configuration

```
Email Service: Gmail
Your Email: gtilahun2121@gmail.com
SMTP Host: smtp.gmail.com
Port: 587
```

## ⚠️ Troubleshooting

### "Invalid login" error?
- Make sure 2FA is enabled on Gmail
- Double-check app password (no spaces)
- Use app password, NOT your regular Gmail password

### Not receiving emails?
- Check spam/junk folder
- Verify EMAIL_TO in .env is correct
- Check backend console for error messages
- Make sure backend server restarted after .env change

### "Connection refused" error?
- Check internet connection
- Gmail SMTP might be blocked by firewall
- Try port 465 with secure: true (edit emailService.js)

## 🎯 Quick Start Checklist

- [ ] Enable 2FA on Gmail
- [ ] Generate App Password
- [ ] Add app password to `backend/.env`
- [ ] Restart backend server
- [ ] Test contact form
- [ ] Check email inbox

## 📝 Alternative Email Providers

Don't want to use Gmail? You can use:

### SendGrid (Recommended for production)
```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key
```

### Mailgun
```
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your_mailgun_username
EMAIL_PASS=your_mailgun_password
```

### Outlook/Hotmail
```
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

---

## 🚀 Ready to Go!

Once you add your Gmail app password:
1. ✅ Contact form saves to database
2. ✅ Email sent to your Gmail instantly
3. ✅ Professional HTML email template
4. ✅ Reply directly to visitors

**Need help?** The email notification runs in the background, so even if it fails, the contact form still works!
