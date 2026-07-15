# 🚀 Deployment Guide

## Quick Deploy Your Portfolio (Always Online)

### Step 1: Deploy Backend (Render)
1. Go to: https://render.com/
2. Sign up with GitHub
3. Create "New Web Service"
4. Connect repository: `gtilahun2121-beep/my_portfolio`
5. Settings:
   - **Name:** my-portfolio-backend
   - **Environment:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Auto Deploy:** Yes

6. Add Environment Variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://db_user1:g_user_vs21@cluster0.kql6l82.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=243ab69d3d6cec463615cbbd0b9a8d94fe64b2f3500ed7cc943baf8b0f9d1c2b
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=gtilahun2121@gmail.com
   EMAIL_PASS=ybjwfftjljbbgaxm
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

### Step 2: Deploy Frontend (Vercel)
1. Go to: https://vercel.com/
2. Sign up with GitHub
3. Import Project: Select `gtilahun2121-beep/my_portfolio`
4. Settings:
   - **Framework:** Vite
   - **Root Directory:** frontend
   - **Build Command:** `npm run build`
   - **Output Directory:** dist

5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

### Step 3: Update URLs
After deployment, update the environment variables with actual URLs:
- Update `FRONTEND_URL` in Render
- Update `VITE_API_URL` in Vercel

## 🎉 Result
- **Frontend:** https://my-portfolio-frontend.vercel.app/
- **Backend API:** https://my-portfolio-backend.onrender.com/api
- **Always Online:** 24/7 availability
- **No Manual Startup:** Automatic deployment

## 🔗 Links After Deployment
- **Portfolio:** Your Vercel URL
- **Admin Panel:** Your Vercel URL + /admin/login
- **API Health:** Your Render URL + /api/health

Login Credentials:
- Email: gtilahun2121@gmail.com  
- Password: 12345678