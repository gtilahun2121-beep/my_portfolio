# 🚀 Full Stack Developer Portfolio with CMS

A complete, production-ready portfolio application with admin dashboard, content management system, visitor analytics, and more. Built with modern technologies and best practices.

## ✨ Features

### Public Website
- **Hero Section** - Animated introduction with social links
- **About** - Education, experience, and achievements showcase
- **Projects** - Searchable and filterable project gallery with case studies
- **Blog** - Articles with categories, comments, and views tracking
- **Contact** - Contact form with message storage

### Admin Dashboard
- **Analytics Dashboard** - Real-time visitor stats, charts, and insights
- **Project Management** - Full CRUD operations for projects
- **Blog Management** - Create, edit, publish, and manage blog posts
- **Certificate Management** - Upload and organize certificates
- **Message Management** - View and respond to visitor messages
- **Visitor Tracking** - Track visitors by country, device, and browser

### Advanced Features
- ✅ JWT Authentication with role-based access control
- ✅ Image upload to Cloudinary
- ✅ Visitor analytics with charts (Recharts)
- ✅ SEO optimized
- ✅ Responsive design
- ✅ Dark mode UI
- ✅ Type-safe with TypeScript
- ✅ Database-driven content
- ✅ Real-time statistics

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Primary database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Storage & Media
- **Cloudinary** - Image hosting and optimization

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Cloudinary account (free tier works)

### Step 1: Clone and Install

\`\`\`bash
git clone <your-repo-url>
cd developer-cms-portfolio
npm install
\`\`\`

### Step 2: Environment Setup

Create a \`.env\` file in the root directory:

\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secret-key-here"
JWT_SECRET="another-secret-key-here"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Admin (for initial setup)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"
\`\`\`

**Generate secrets:**
\`\`\`bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
\`\`\`

### Step 3: Database Setup

\`\`\`bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database with sample data
npx prisma db seed
\`\`\`

### Step 4: Create Admin User

Run this script to create your admin account:

\`\`\`bash
npx ts-node scripts/create-admin.ts
\`\`\`

Or use Prisma Studio:
\`\`\`bash
npx prisma studio
\`\`\`

### Step 5: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Admin Access

1. Go to \`/admin/login\`
2. Login with your admin credentials
3. Access the dashboard at \`/admin\`

### Managing Content

**Projects:**
- Navigate to Admin → Projects
- Click "New Project" to add a project
- Upload images, add GitHub links, live demos
- Toggle "Featured" for homepage display

**Blog Posts:**
- Navigate to Admin → Blogs
- Create new posts with markdown support
- Set categories and tags
- Toggle publish status

**Analytics:**
- View visitor statistics on the dashboard
- Track popular content
- Monitor device and browser stats

## 📁 Project Structure

\`\`\`
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── api/               # API routes
│   │   ├── blog/              # Public blog pages
│   │   ├── projects/          # Public project pages
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   └── lib/
│       ├── auth.ts            # Authentication utilities
│       ├── cloudinary.ts      # Image upload
│       ├── prisma.ts          # Database client
│       └── visitor-tracker.ts # Analytics
├── .env.example               # Environment template
└── package.json
\`\`\`

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection

## 🚀 Deployment

### Deploy to Vercel

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Environment Variables

Add all environment variables from \`.env\` to your Vercel project settings.

### Database

Use a managed PostgreSQL service:
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)
- [Neon](https://neon.tech/)

## 📊 Database Schema

The application includes these main models:
- **User** - Admin authentication
- **Project** - Portfolio projects with case studies
- **Blog** - Blog posts with comments
- **Skill** - Technical skills showcase
- **Certificate** - Certifications and achievements
- **Contact** - Messages from visitors
- **Visitor** - Analytics data
- **Analytics** - Daily statistics

See \`prisma/schema.prisma\` for full schema.

## 🎨 Customization

### Branding
- Update \`src/app/page.tsx\` hero section
- Change colors in \`tailwind.config.ts\`
- Update metadata in \`src/app/layout.tsx\`

### Features
- Add more analytics in \`src/app/api/admin/analytics/route.ts\`
- Extend database schema in \`prisma/schema.prisma\`
- Add new pages in \`src/app/\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)

---

**Made with ❤️ by Getnet**

For questions or support, reach out at hello@getnet.dev
