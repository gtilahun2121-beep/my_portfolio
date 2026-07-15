# 🚀 Deployment Guide

## Quick Deploy to Vercel (5 minutes)

### Prerequisites
- GitHub account
- Vercel account (free)
- Code pushed to GitHub

---

## Option 1: Vercel (Recommended) ⭐

### Step 1: Prepare Your Repository

1. **Push to GitHub:**
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
\`\`\`

2. **Make sure these files are in your repo:**
   - ✅ `.gitignore` (excludes `.env`)
   - ✅ `package.json`
   - ✅ `next.config.js`
   - ✅ `prisma/schema.prisma`

### Step 2: Setup Vercel Postgres

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "Storage" → "Create Database"
4. Select "Postgres"
5. Choose a region close to you
6. Click "Create"
7. Copy the connection string

### Step 3: Deploy Application

1. **Import Project:**
   - Go to Vercel dashboard
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Framework Preset: **Next.js**

2. **Configure Environment Variables:**

Click "Environment Variables" and add:

\`\`\`env
# Database (from Vercel Postgres)
DATABASE_URL=postgresql://...

# Auth Secrets (generate new ones!)
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate-random-32-char-string>
JWT_SECRET=<generate-different-32-char-string>

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Account
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
ADMIN_NAME=Your Name
\`\`\`

**Generate secrets online:**
- https://generate-secret.vercel.app/32

3. **Click "Deploy"**

### Step 4: Setup Database

After first deployment, run these commands:

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migrations on production
vercel env pull .env.production
npx prisma migrate deploy

# Create admin user
npx ts-node scripts/create-admin.ts
\`\`\`

Or use Prisma Studio to create admin manually:
\`\`\`bash
npx prisma studio
\`\`\`

### Step 5: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown
4. Update `NEXTAUTH_URL` environment variable
5. Redeploy

---

## Option 2: Railway

### Step 1: Setup Database

1. Go to [Railway](https://railway.app)
2. Create new project
3. Add PostgreSQL database
4. Copy connection string

### Step 2: Deploy Application

1. Click "New" → "GitHub Repo"
2. Select your repository
3. Add environment variables (same as Vercel)
4. Deploy!

---

## Option 3: Netlify

### With Supabase Database

1. **Create Supabase Database:**
   - Go to [Supabase](https://supabase.com)
   - Create new project
   - Copy connection string from Settings → Database

2. **Deploy to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Import GitHub repository
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Add environment variables
   - Deploy!

---

## Option 4: Self-Hosted (VPS)

### Requirements
- Ubuntu 22.04 server
- Domain name
- Basic Linux knowledge

### Step 1: Server Setup

\`\`\`bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Nginx
sudo apt install nginx -y

# Install PM2
sudo npm install -g pm2
\`\`\`

### Step 2: Database Setup

\`\`\`bash
# Create database
sudo -u postgres psql
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
\q
\`\`\`

### Step 3: Application Setup

\`\`\`bash
# Clone repository
cd /var/www
git clone <your-repo-url> portfolio
cd portfolio

# Install dependencies
npm install

# Create .env file
nano .env
# (Add all environment variables)

# Run migrations
npx prisma migrate deploy

# Create admin
npx ts-node scripts/create-admin.ts

# Build application
npm run build

# Start with PM2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
\`\`\`

### Step 4: Nginx Configuration

\`\`\`bash
sudo nano /etc/nginx/sites-available/portfolio
\`\`\`

Add this configuration:

\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

Enable and restart:

\`\`\`bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
\`\`\`

### Step 5: SSL with Let's Encrypt

\`\`\`bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
\`\`\`

---

## Environment Variables Reference

### Required Variables

\`\`\`env
# Database Connection
DATABASE_URL=postgresql://user:password@host:5432/database

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=<32-character-random-string>
JWT_SECRET=<32-character-random-string>

# Image Upload
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Setup
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure-password
ADMIN_NAME=Admin User
\`\`\`

### Optional Variables

\`\`\`env
# OAuth (if using)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Email (if using)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Analytics (if using)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
\`\`\`

---

## Post-Deployment Checklist

### Security
- [ ] Change default admin password
- [ ] Enable HTTPS
- [ ] Update CORS settings if needed
- [ ] Review rate limiting
- [ ] Setup database backups

### Configuration
- [ ] Update site metadata
- [ ] Configure Cloudinary settings
- [ ] Test image uploads
- [ ] Test contact form
- [ ] Verify admin dashboard access

### Content
- [ ] Add your first project
- [ ] Write your first blog post
- [ ] Update About page
- [ ] Add skills and experience
- [ ] Upload certificates

### Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Enable analytics
- [ ] Test all functionality
- [ ] Check mobile responsiveness

---

## Database Backup Strategy

### Automated Backups (Vercel Postgres)
Automatic backups are included with Vercel Postgres.

### Manual Backup

\`\`\`bash
# Create backup
pg_dump $DATABASE_URL > backup.sql

# Restore backup
psql $DATABASE_URL < backup.sql
\`\`\`

### Scheduled Backups (Cron)

\`\`\`bash
# Add to crontab
0 2 * * * pg_dump $DATABASE_URL > /backups/backup_$(date +\%Y\%m\%d).sql
\`\`\`

---

## Troubleshooting

### Build Fails

**Error: Prisma Client not found**
\`\`\`bash
npx prisma generate
npm run build
\`\`\`

**Error: Module not found**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Database Issues

**Cannot connect to database**
- Check DATABASE_URL is correct
- Ensure database is accessible
- Verify IP whitelist settings

**Migration errors**
\`\`\`bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or push schema directly
npx prisma db push
\`\`\`

### Image Upload Issues

**Upload fails**
- Verify Cloudinary credentials
- Check file size limits
- Ensure CORS is configured

### Performance Issues

**Slow page loads**
- Enable caching
- Optimize images
- Add CDN (Cloudinary has built-in CDN)
- Check database indexes

---

## Scaling Considerations

### When your portfolio grows:

1. **Database:**
   - Upgrade Vercel Postgres tier
   - Add read replicas
   - Implement caching (Redis)

2. **Storage:**
   - Upgrade Cloudinary plan
   - Add CDN for static assets

3. **Performance:**
   - Enable ISR (Incremental Static Regeneration)
   - Add Redis for sessions
   - Implement edge caching

4. **Monitoring:**
   - Add Sentry for error tracking
   - Use Vercel Analytics
   - Setup custom metrics

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Cloudinary Docs:** https://cloudinary.com/documentation

---

**Congratulations! Your portfolio is now live! 🎉**

Share it with recruiters and watch the opportunities roll in!
