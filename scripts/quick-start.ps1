# Quick Start Script for Developer CMS Portfolio (Windows PowerShell)
# This script automates the initial setup process

Write-Host "🚀 Starting Developer CMS Portfolio Setup..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check if .env exists
if (-Not (Test-Path .env)) {
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ .env file created" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Edit .env file with your actual credentials:" -ForegroundColor Yellow
    Write-Host "   - DATABASE_URL"
    Write-Host "   - NEXTAUTH_SECRET (generate with PowerShell command below)"
    Write-Host "   - JWT_SECRET (generate with PowerShell command below)"
    Write-Host "   - Cloudinary credentials"
    Write-Host ""
    Write-Host "Generate secrets with:" -ForegroundColor Cyan
    Write-Host '[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))' -ForegroundColor Gray
    Write-Host ""
    Read-Host "Press Enter after you've updated .env file"
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

Write-Host "🗄️  Setting up database..." -ForegroundColor Yellow

# Generate Prisma Client
Write-Host "   Generating Prisma Client..."
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma Client" -ForegroundColor Red
    exit 1
}

# Run migrations
Write-Host "   Running database migrations..."
npx prisma migrate dev --name init

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Migration failed. You may need to:" -ForegroundColor Yellow
    Write-Host "   1. Create the database manually"
    Write-Host "   2. Check DATABASE_URL in .env"
    Write-Host "   3. Run: npx prisma db push"
    Read-Host "Press Enter to continue"
}

Write-Host "✅ Database setup complete" -ForegroundColor Green
Write-Host ""

# Create admin user
Write-Host "👤 Creating admin user..." -ForegroundColor Yellow
$createAdmin = Read-Host "Create admin user now? (y/n)"

if ($createAdmin -eq "y") {
    npx ts-node scripts/create-admin.ts
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Failed to create admin user automatically" -ForegroundColor Yellow
        Write-Host "   You can create it manually later by running:"
        Write-Host "   npx ts-node scripts/create-admin.ts"
    }
}

Write-Host ""

# Seed database (optional)
$seedDb = Read-Host "Seed database with sample data? (y/n)"

if ($seedDb -eq "y") {
    Write-Host "🌱 Seeding database..." -ForegroundColor Yellow
    npx ts-node scripts/seed.ts
    Write-Host "✅ Database seeded" -ForegroundColor Green
}

Write-Host ""
Write-Host "✨ Setup Complete! ✨" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Run: npm run dev"
Write-Host "2. Visit: http://localhost:3000"
Write-Host "3. Login to admin: http://localhost:3000/admin/login"
Write-Host ""
Write-Host "📚 Documentation:"
Write-Host "   - SETUP.md - Detailed setup instructions"
Write-Host "   - FEATURES.md - Complete feature list"
Write-Host "   - DEPLOYMENT.md - Deployment guides"
Write-Host ""
Write-Host "Happy coding! 🎉" -ForegroundColor Green
