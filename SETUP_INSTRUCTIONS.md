# 🚀 Portfolio Setup Instructions

## Architecture Overview

Your portfolio now has a **separate** architecture:

```
📁 my-portfolio/
├── 📁 backend/           # Node.js + Express + MongoDB
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints  
│   ├── middleware/      # Auth middleware
│   └── server.js        # Main server file
│
└── 📁 frontend/         # React (to be created)
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/    # API calls
    └── public/
```

---

## 🎯 Quick Start (5 Steps)

### Step 1: Setup Backend

```powershell
cd backend
npm install
```

### Step 2: Configure Environment

Create `.env` file in `backend/` folder:

```powershell
# In backend folder
copy .env.example .env
notepad .env
```

Update with your MongoDB connection:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://getanewtilahun61_db_user:YOUR_PASSWORD@YOUR_CLUSTER/portfolio?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:3000
```

### Step 3: Get Free MongoDB Database

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create FREE cluster (M0 - 512MB)
3. Create database user: `getanewtilahun61_db_user` with password
4. Whitelist IP: "Allow from Anywhere"
5. Get connection string and update `.env`

### Step 4: Start Backend Server

```powershell
# In backend folder
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
```

### Step 5: Test API

Open browser to: http://localhost:5000/api/health

You should see: `{"status":"OK","message":"Server is running"}`

---

## 📊 Backend API Endpoints

### Public Endpoints (No Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| GET | `/api/blogs` | Get published blogs |
| GET | `/api/blogs/:slug` | Get single blog |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/skills` | Get all skills |
| GET | `/api/experience` | Get work experience |
| GET | `/api/education` | Get education |
| GET | `/api/certificates` | Get certificates |

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Protected Endpoints (Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/blogs` | Create blog post |
| PUT | `/api/blogs/:id` | Update blog post |
| DELETE | `/api/blogs/:id` | Delete blog post |
| GET | `/api/analytics` | Get analytics data |
| POST | `/api/upload` | Upload image |

---

## 🔑 Create Admin User

Once backend is running, create admin account using MongoDB Compass or Atlas:

1. Go to MongoDB Atlas → Collections
2. Find `users` collection
3. Insert document:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5iY6FHLoB3cKi",
  "role": "ADMIN",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Password is:** `admin123` (Change this after first login!)

Or use this script to create admin:

```javascript
// backend/scripts/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = new User({
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'ADMIN'
  });
  
  await admin.save();
  console.log('✅ Admin user created!');
  console.log('Email: admin@example.com');
  console.log('Password: admin123');
  process.exit();
}

createAdmin();
```

---

## 🎨 Next: Create React Frontend

I can help you create the React frontend next! It will include:

- ✅ Homepage with hero section
- ✅ Projects gallery
- ✅ Blog listing
- ✅ Contact form
- ✅ Admin dashboard
- ✅ Project management
- ✅ Blog management
- ✅ Analytics dashboard

**Would you like me to create the React frontend now?**

---

## 🧪 Testing the Backend

### Test with curl or Postman:

**Get all projects:**
```powershell
curl http://localhost:5000/api/projects
```

**Login:**
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@example.com","password":"admin123"}'
```

**Create project (with token):**
```powershell
curl -X POST http://localhost:5000/api/projects `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_TOKEN_HERE" `
  -d '{"title":"My Project","description":"Test project","image":"https://via.placeholder.com/800","technologies":["React","Node.js"]}'
```

---

## 📝 What's Already Built

### Backend Features ✅
- ✅ Express.js server
- ✅ MongoDB with Mongoose
- ✅ JWT authentication
- ✅ Role-based access (Admin/User)
- ✅ File upload (Cloudinary)
- ✅ 8 MongoDB models (User, Project, Blog, Contact, etc.)
- ✅ 10+ API endpoints
- ✅ Input validation
- ✅ Error handling
- ✅ CORS configured

### MongoDB Models Created ✅
1. User - Authentication
2. Project - Portfolio projects
3. Blog - Blog posts with comments
4. Contact - Contact form messages
5. Skill - Technical skills
6. Experience - Work history
7. Education - Academic background
8. Certificate - Certifications
9. Visitor - Analytics tracking

---

## 🆘 Troubleshooting

**Backend won't start?**
- Check MongoDB connection string in `.env`
- Make sure MongoDB Atlas allows your IP
- Run `npm install` in backend folder

**Can't connect to MongoDB?**
- Verify connection string format
- Check if cluster is running in Atlas
- Ensure IP is whitelisted

**"Module not found" error?**
- Run `npm install` in backend folder
- Delete `node_modules` and run `npm install` again

---

## 📞 Current Status

✅ Backend API server created
✅ MongoDB models defined  
✅ Authentication system ready
✅ All API routes configured

⏳ Frontend React app (next step)
⏳ Admin dashboard (next step)

**Ready to create the React frontend?** Let me know! 🚀
