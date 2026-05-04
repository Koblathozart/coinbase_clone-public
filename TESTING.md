# 🚀 Full-Stack Testing Guide

## Prerequisites
✅ Backend server running (`npm run dev`)
✅ MongoDB Atlas connected
✅ Frontend ready to start

---

## Step 1: Seed Database with Crypto Data

In the **backend folder**, run:
```powershell
npm run seed
```

You should see:
```
✅ Successfully seeded 6 cryptocurrencies
```

This adds Bitcoin, Ethereum, Solana, XRP, USDC, and BNB to your database.

---

## Step 2: Start Frontend

Open a **new PowerShell window** and run:
```powershell
cd C:\Users\Emmanuel Agbovie\Documents\WEB DEV\coinbase-clone-Koblathozart-public
npm run dev
```

Visit: **http://localhost:5173**

---

## Step 3: Test Authentication Flow

### 3a. Sign Up
- Click **"Sign up"**
- Fill form:
  - Name: `Emmanuel Test`
  - Email: `emmanuel@test.com`
  - Password: `password123`
  - Confirm: `password123`
- Click **"Create account"**

**Expected:** 
- ✅ Redirected to home page
- ✅ Navbar shows "Hi, Emmanuel Test"
- ✅ Profile button visible
- ✅ Sign in/Sign up buttons hidden

### 3b. Visit Profile
- Click **"Profile"** button in navbar
- **Expected:** See your name, email, and member since date

### 3c. Explore Page
- Click **"Explore"** in navbar
- **Expected:** See 6 cryptocurrencies displayed (Bitcoin, Ethereum, etc.)
- Try filters: "Top gainers", "Layer 1", "DeFi", "Stablecoins"

### 3d. Log Out
- Click **"Log Out"** button
- **Expected:** 
  - ✅ Redirected to home
  - ✅ Navbar shows "Sign in" and "Sign up" buttons

### 3e. Try Accessing Profile Directly
- While logged out, visit `http://localhost:5173/profile`
- **Expected:** Redirected to `/signin` (protected route)

---

## Step 4: Test Sign In

- Click **"Sign in"**
- Enter: `emmanuel@test.com` and `password123`
- Click **"Continue"**
- **Expected:** Logged back in, see navbar with user info

---

## Step 5: Test Multiple Users

Create another user to verify:
- Different users can't see each other's profiles
- Each user stays logged in independently

---

## Step 6: Verify Database

Open **MongoDB Compass** and check:
- Database: `coinbase-clone`
- Collections:
  - `users` → Should have your test users
  - `cryptos` → Should have 6 cryptocurrencies

---

## 🎯 Checklist - Everything Should Work

- [ ] Backend runs without errors
- [ ] Database seeds successfully with 6 cryptos
- [ ] Frontend starts at localhost:5173
- [ ] Sign up creates account and logs user in
- [ ] Navbar shows user name when logged in
- [ ] Profile page displays user info
- [ ] Explore page shows 6 cryptocurrencies
- [ ] Crypto filters work (top gainers, etc.)
- [ ] Profile page is protected (redirects if not logged in)
- [ ] Log out clears session
- [ ] Sign in works with correct credentials
- [ ] Wrong credentials show error message
- [ ] Refresh page keeps user logged in (via JWT cookie)

---

## 🐛 Troubleshooting

**Backend won't start:**
- Ensure MongoDB is running
- Check `.env` has valid `MONGODB_URI`
- Check ports (5000 for backend)

**Frontend won't connect to backend:**
- Check `.env` has `VITE_API_URL=http://localhost:5000`
- Ensure backend is running on port 5000
- Check browser console for CORS errors

**Sign up fails:**
- Check email isn't already registered
- Check password is at least 6 characters
- Look at backend logs for error details

**Explore page shows no cryptos:**
- Run `npm run seed` in backend folder
- Check MongoDB Compass to confirm cryptos were inserted
- Refresh browser page

---

**Once everything works, we'll deploy to production!** 🚀
