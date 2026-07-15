# ⚡ Quick Start Guide

Get your portfolio running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Cloudinary account (free)

## Option 1: Automated Setup (Recommended)

### For Windows (PowerShell):
```powershell
.\scripts\quick-start.ps1
```

### For Linux/Mac:
```bash
chmod +x scripts/quick-start.sh
./scripts/quick-start.sh
```

The script will:
1. Create .env file
2. Install dependencies
3. Setup database
4. Create admin user
5. (Optional) Seed sample data

## Option 2: Manual Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update `.env` with your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"
NEXTAUTH_SECRET="<generate-secret>"
JWT_SECRET="<generate-secret>"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

Generate secrets:
```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 3. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

### 4. Create Admin User

```bash
npx ts-node scripts/create-admin.ts
```

Or update `.env` with admin credentials:
```env
ADMIN_EMAIL="your-email@example.com"
ADMIN_PASSWORD="your-secure-password"
```

### 5. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Default Admin Login

After running the create-admin script:
- **URL**: http://localhost:3000/admin/login
- **Email**: From your .env (ADMIN_EMAIL)
- **Password**: From your .env (ADMIN_PASSWORD)

⚠️ **Change these immediately after first login!**

## Quick Database Setup Options

### Option A: Local PostgreSQL
```bash
# Install PostgreSQL, then:
createdb portfolio_db
```

### Option B: Vercel Postgres (Free, Recommended)
1. Go to https://vercel.com/storage/postgres
2. Create new database
3. Copy connection string to .env

### Option C: Supabase (Free)
1. Go to https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Add to .env

### Option D: Railway (Free)
1. Go to https://railway.app
2. Create PostgreSQL service
3. Copy connection URL to .env

## Cloudinary Setup (Free)

1. Go to https://cloudinary.com
2. Sign up for free account
3. Dashboard → Account Details
4. Copy:
   - Cloud Name
   - API Key
   - API Secret
5. Add to .env

## Troubleshooting

### "Module not found" error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database connection error
- Check DATABASE_URL format
- Ensure database exists
- Test connection: `npx prisma db push`

### Migration errors
```bash
# Reset and try again
npx prisma migrate reset
npx prisma migrate dev --name init
```

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

## Next Steps

1. ✅ Login to admin dashboard
2. ✅ Add your first project
3. ✅ Write your first blog post
4. ✅ Customize homepage
5. ✅ Deploy to production

## Need Help?

- 📖 Read [SETUP.md](SETUP.md) for detailed instructions
- 🎯 Check [FEATURES.md](FEATURES.md) for feature list
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guides
- 📋 Review [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) for architecture

## Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npx prisma studio          # Open database GUI
npx prisma migrate dev     # Create migration
npx prisma db push         # Push schema changes
npx prisma generate        # Generate client

# Seed database
npx ts-node scripts/seed.ts

# Create admin
npx ts-node scripts/create-admin.ts
```

## Tech Stack at a Glance

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Storage**: Cloudinary
- **Auth**: JWT

---

**You're all set! Start building your portfolio! 🎉**
