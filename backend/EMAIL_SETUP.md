# Email Notification Setup

## Get Email Notifications When Someone Contacts You

### Option 1: Gmail (Recommended for testing)

1. **Install nodemailer:**
   ```bash
   cd backend
   npm install nodemailer
   ```

2. **Enable Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Sign in with your Gmail
   - Generate an "App Password" for "Mail"
   - Copy the 16-character password

3. **Add to `.env` file:**
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   NOTIFICATION_EMAIL=gtilahun2121@gmail.com
   ```

4. **Uncomment email code in `routes/contact.js`**
   (I'll add this code for you)

### Option 2: SendGrid (Professional, Free tier: 100 emails/day)

1. **Sign up:** https://sendgrid.com/free/
2. **Get API Key:** Dashboard → Settings → API Keys
3. **Add to `.env`:**
   ```
   SENDGRID_API_KEY=your-api-key
   NOTIFICATION_EMAIL=gtilahun2121@gmail.com
   ```

### Option 3: Mailgun (Professional)

1. **Sign up:** https://www.mailgun.com/
2. **Get credentials**
3. **Add to `.env`:**
   ```
   MAILGUN_API_KEY=your-key
   MAILGUN_DOMAIN=your-domain
   NOTIFICATION_EMAIL=gtilahun2121@gmail.com
   ```

## What Happens:
- Someone fills contact form on your site
- Message saved to database ✅ (already working)
- Email sent to you: gtilahun2121@gmail.com 📧 (new feature)
- Visitor sees success message ✅ (already working)

## Testing:
1. Set up one of the above options
2. Go to: http://localhost:3000/contact
3. Fill the form and submit
4. Check your email inbox!
