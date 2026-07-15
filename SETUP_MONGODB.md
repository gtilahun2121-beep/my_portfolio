# 🔧 Complete MongoDB Setup

## ✅ What's Already Done:
- ✅ Dependencies installed
- ✅ Prisma schema converted to MongoDB
- ✅ Secrets generated (NEXTAUTH_SECRET, JWT_SECRET)
- ✅ .env file created

## 📋 What You Need to Do:

### Step 1: Get Your MongoDB Connection String

You have two options:

#### Option A: MongoDB Atlas (Recommended - Free)
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free forever tier)
3. Create a cluster (choose FREE M0 - 512MB)
4. Create a database user:
   - Username: `getanewtilahun61_db_user` (already set)
   - Password: Create a strong password
5. Whitelist IP: Click "Network Access" → "Add IP" → "Allow from Anywhere"
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the string (looks like this):
   ```
   mongodb+srv://getanewtilahun61_db_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

#### Option B: Local MongoDB (Advanced)
```powershell
# Install MongoDB locally
choco install mongodb

# Connection string will be:
# mongodb://localhost:27017/portfolio
```

### Step 2: Update Your .env File

Open your `.env` file and update the DATABASE_URL:

```env
# Replace this entire line with your actual connection string
DATABASE_URL="mongodb+srv://getanewtilahun61_db_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority"
```

**Important**: 
- Replace `YOUR_PASSWORD` with your actual MongoDB password
- Replace `cluster0.xxxxx.mongodb.net` with your actual cluster address
- Keep `/portfolio?retryWrites=true&w=majority` at the end

### Step 3: Example of Complete .env File

```env
# Database - MongoDB Atlas
DATABASE_URL="mongodb+srv://getanewtilahun61_db_user:MySecurePass123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="anX7RLjkoWEt73V1gRpIx+S4vQLODgivuiisQs9+G8c="

# JWT
JWT_SECRET="dRk7/AE6zfZarVfHkl7kk085SxgX20oeg6VpwMGcGtc="

# Cloudinary (Get free account at https://cloudinary.com)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Admin (for initial setup)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"
ADMIN_NAME="Admin User"
```

### Step 4: After Updating .env, Run These Commands:

```powershell
# Push database schema to MongoDB
npx prisma db push

# Create admin user
npx ts-node scripts/create-admin.ts

# (Optional) Add sample data
npx ts-node scripts/seed.ts

# Start the development server
npm run dev
```

## 🎯 Quick Cloudinary Setup (Optional - For Image Uploads)

1. Go to: https://cloudinary.com/users/register/free
2. Sign up (free account)
3. Go to Dashboard
4. Copy:
   - Cloud Name
   - API Key
   - API Secret
5. Add to your .env file

## 🚀 Once Everything is Setup:

1. Visit: http://localhost:3000 (Homepage)
2. Visit: http://localhost:3000/admin/login (Admin Panel)
3. Login with your ADMIN_EMAIL and ADMIN_PASSWORD
4. Start adding your projects and blog posts!

## 🆘 Need Help?

**Database connection error?**
- Double-check your MongoDB connection string
- Make sure password doesn't have special characters (or URL encode them)
- Verify your IP is whitelisted in MongoDB Atlas

**Can't create admin user?**
- Make sure DATABASE_URL is correct
- Run `npx prisma db push` first
- Check that MongoDB is accessible

**Still stuck?**
- Read QUICK_START.md for more details
- Check the error messages carefully
- Make sure all environment variables are set

## 📞 What's Your Current Status?

Tell me where you are:
- [ ] I have my MongoDB connection string
- [ ] I've updated the .env file
- [ ] I'm ready to run the setup commands
- [ ] I need help getting MongoDB connection string
- [ ] Something else is not working

Let me know and I'll help you through it! 🚀
