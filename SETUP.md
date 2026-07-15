# Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Setup PostgreSQL Database

**Option A: Local PostgreSQL**
\`\`\`bash
# Create database
createdb portfolio_db
\`\`\`

**Option B: Cloud Database (Recommended for beginners)**
- Go to [Vercel Postgres](https://vercel.com/storage/postgres) (Free)
- Or [Supabase](https://supabase.com/) (Free)
- Create a new database
- Copy the connection string

### 3. Configure Environment

Copy \`.env.example\` to \`.env\`:
\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` and update:
\`\`\`env
DATABASE_URL="your-database-url-here"
\`\`\`

Generate secrets:
\`\`\`bash
# Run this twice for two different secrets
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
\`\`\`

Add them to \`.env\`:
\`\`\`env
NEXTAUTH_SECRET="first-secret-here"
JWT_SECRET="second-secret-here"
\`\`\`

### 4. Setup Cloudinary (Free)

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Get your credentials from Dashboard
4. Add to \`.env\`:
\`\`\`env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
\`\`\`

### 5. Initialize Database

\`\`\`bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Seed with sample data (optional)
npx ts-node scripts/seed.ts
\`\`\`

### 6. Create Admin Account

\`\`\`bash
npx ts-node scripts/create-admin.ts
\`\`\`

Or manually add to \`.env\`:
\`\`\`env
ADMIN_EMAIL="your-email@example.com"
ADMIN_PASSWORD="your-secure-password"
\`\`\`

Then run the script.

### 7. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit:
- Homepage: http://localhost:3000
- Admin Login: http://localhost:3000/admin/login

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Try \`npx prisma db push\` instead of migrate

### Image Upload Not Working
- Verify Cloudinary credentials
- Check file size (max 10MB)
- Ensure proper file format (jpg, png, webp)

### Admin Login Not Working
- Check JWT_SECRET is set in \`.env\`
- Verify admin user exists in database
- Use Prisma Studio to check: \`npx prisma studio\`

### Port Already in Use
\`\`\`bash
# Use different port
npm run dev -- -p 3001
\`\`\`

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Database for Production

Use managed PostgreSQL:
- Vercel Postgres
- Supabase
- Railway
- Neon

All offer free tiers perfect for portfolios.

## Next Steps

1. Customize homepage (\`src/app/page.tsx\`)
2. Add your first project via Admin Dashboard
3. Write your first blog post
4. Update social media links
5. Add your skills and experience

## Need Help?

Check:
- README.md for full documentation
- Prisma docs: https://www.prisma.io/docs
- Next.js docs: https://nextjs.org/docs

