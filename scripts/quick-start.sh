#!/bin/bash

# Quick Start Script for Developer CMS Portfolio
# This script automates the initial setup process

echo "🚀 Starting Developer CMS Portfolio Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file with your actual credentials:"
    echo "   - DATABASE_URL"
    echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
    echo "   - JWT_SECRET (generate with: openssl rand -base64 32)"
    echo "   - Cloudinary credentials"
    echo ""
    read -p "Press Enter after you've updated .env file..."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

echo "🗄️  Setting up database..."

# Generate Prisma Client
echo "   Generating Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

# Run migrations
echo "   Running database migrations..."
npx prisma migrate dev --name init

if [ $? -ne 0 ]; then
    echo "⚠️  Migration failed. You may need to:"
    echo "   1. Create the database manually"
    echo "   2. Check DATABASE_URL in .env"
    echo "   3. Run: npx prisma db push"
    read -p "Press Enter to continue..."
fi

echo "✅ Database setup complete"
echo ""

# Create admin user
echo "👤 Creating admin user..."
read -p "Create admin user now? (y/n): " create_admin

if [ "$create_admin" = "y" ]; then
    npx ts-node scripts/create-admin.ts
    
    if [ $? -ne 0 ]; then
        echo "⚠️  Failed to create admin user automatically"
        echo "   You can create it manually later by running:"
        echo "   npx ts-node scripts/create-admin.ts"
    fi
fi

echo ""

# Seed database (optional)
read -p "Seed database with sample data? (y/n): " seed_db

if [ "$seed_db" = "y" ]; then
    echo "🌱 Seeding database..."
    npx ts-node scripts/seed.ts
    echo "✅ Database seeded"
fi

echo ""
echo "✨ Setup Complete! ✨"
echo ""
echo "Next steps:"
echo "1. Run: npm run dev"
echo "2. Visit: http://localhost:3000"
echo "3. Login to admin: http://localhost:3000/admin/login"
echo ""
echo "📚 Documentation:"
echo "   - SETUP.md - Detailed setup instructions"
echo "   - FEATURES.md - Complete feature list"
echo "   - DEPLOYMENT.md - Deployment guides"
echo ""
echo "Happy coding! 🎉"
