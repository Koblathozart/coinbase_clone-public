# 🧪 Complete Backend Testing Guide
## Assignment Requirements Verification

**Backend Status:** ✅ Running on http://localhost:5000
**Database:** ✅ MongoDB Atlas connected

---

## 📋 TESTING CHECKLIST

### 1. ✅ AUTHENTICATION SYSTEM (JWT-Based)

#### 1.1 Register Endpoint (`GET /register`)
**Requirement:** Create user account with Name, Email, Password

**Using Postman/Thunder Client:**

```
Method: GET
URL: http://localhost:5000/auth/register
Headers: Content-Type: application/json
Body (raw JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Account created successfully!",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Also check:**
- ✅ HTTP-only cookie is set (check "Cookies" tab in Postman)
- ✅ Cookie name should be `token`

---

#### 1.2 Register Validation Tests

Test error handling by sending invalid data:

**Test 2a: Missing fields**
```json
{
  "name": "John"
}
```
**Expected:** `400 Bad Request` with message about missing email/password

**Test 2b: Invalid email**
```json
{
  "name": "John",
  "email": "notanemail",
  "password": "password123"
}
```
**Expected:** `400 Bad Request` - Invalid email format

**Test 2c: Short password**
```json
{
  "name": "John",
  "email": "john2@example.com",
  "password": "123"
}
```
**Expected:** `400 Bad Request` - Password must be at least 6 characters

**Test 2d: Duplicate email**
```json
{
  "name": "Jane Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Expected:** `409 Conflict` - Email already registered

---

#### 1.3 Login Endpoint (`GET /login`)
**Requirement:** Authenticate with email and password, store JWT in HTTP-only cookie

```
Method: GET
URL: http://localhost:5000/auth/login
Headers: Content-Type: application/json
Body:
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Logged in successfully!",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Check:**
- ✅ Cookie is set (should see `token` in cookies)
- ✅ Response Status: 200 OK

---

#### 1.4 Login Error Cases

**Test 4a: Wrong password**
```json
{
  "email": "john@example.com",
  "password": "wrongpassword"
}
```
**Expected:** `401 Unauthorized` - Invalid email or password

**Test 4b: User doesn't exist**
```json
{
  "email": "nonexistent@example.com",
  "password": "password123"
}
```
**Expected:** `401 Unauthorized` - Invalid email or password

**Test 4c: Missing email**
```json
{
  "password": "password123"
}
```
**Expected:** `400 Bad Request` - Missing email

---

### 2. ✅ PROTECTED USER PROFILE PAGE

#### 2.1 Get Profile (`GET /profile`)
**Requirement:** Protected route - returns user info only if JWT is valid

```
Method: GET
URL: http://localhost:5000/auth/profile
Headers: 
  Content-Type: application/json
  Cookie: token=<JWT_TOKEN>
```

**Expected Response (if logged in):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-05-01T..."
    }
  }
}
```

**Check:**
- ✅ Returns user data
- ✅ Status: 200 OK
- ✅ Includes createdAt timestamp

---

#### 2.2 Profile Without Authentication (Test Protection)

```
Method: GET
URL: http://localhost:5000/auth/profile
Headers: Content-Type: application/json
(NO COOKIE - Don't send token)
```

**Expected Response:**
```json
{
  "success": false,
  "message": "No token found. Please login first."
}
```

**Check:**
- ✅ Status: 401 Unauthorized
- ✅ Route is properly protected

---

#### 2.3 Profile with Invalid Token

```
Method: GET
URL: http://localhost:5000/auth/profile
Headers: 
  Content-Type: application/json
  Cookie: token=invalid_token_value
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**Check:**
- ✅ Status: 401 Unauthorized
- ✅ Token validation works

---

### 3. ✅ CRYPTO DATA INTEGRATION

#### 3.1 Get All Cryptocurrencies (`GET /crypto`)
**Requirement:** Fetch all available cryptocurrencies

```
Method: GET
URL: http://localhost:5000/crypto
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "cryptos": [
      {
        "_id": "...",
        "name": "Bitcoin",
        "symbol": "BTC",
        "price": 68420.54,
        "change": 2.34,
        "marketCap": "1.35T",
        "createdAt": "2026-05-01T..."
      },
      ...
    ]
  }
}
```

**Check:**
- ✅ Should return 6 cryptos (seeded data)
- ✅ Each crypto has: name, symbol, price, change, marketCap
- ✅ Status: 200 OK

---

#### 3.2 Get Top Gainers (`GET /crypto/gainers`)
**Requirement:** Top gainers sorted by highest % increase

```
Method: GET
URL: http://localhost:5000/crypto/gainers
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "cryptos": [
      {
        "name": "Solana",
        "symbol": "SOL",
        "change": 4.71,
        ...
      },
      {
        "name": "Bitcoin",
        "symbol": "BTC",
        "change": 2.34,
        ...
      },
      ...
    ]
  }
}
```

**Check:**
- ✅ Limited to 10 results (or less if fewer cryptos exist)
- ✅ Sorted by `change` in descending order (highest first)
- ✅ SOL (4.71) should be first
- ✅ Status: 200 OK

---

#### 3.3 Get New Listings (`GET /crypto/new`)
**Requirement:** Most recently added cryptos

```
Method: GET
URL: http://localhost:5000/crypto/new
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "cryptos": [
      {
        "name": "...",
        "symbol": "...",
        "createdAt": "2026-05-01T..."
      },
      ...
    ]
  }
}
```

**Check:**
- ✅ Limited to 10 results
- ✅ Sorted by `createdAt` in descending order (newest first)
- ✅ Status: 200 OK

---

#### 3.4 Add New Cryptocurrency (`POST /crypto`)
**Requirement:** Create new crypto with Name, Symbol, Price, Change

```
Method: POST
URL: http://localhost:5000/crypto
Headers: Content-Type: application/json
Body:
{
  "name": "Ripple",
  "symbol": "XRP",
  "price": 2.50,
  "change": -0.85,
  "marketCap": "140B"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Cryptocurrency added successfully!",
  "data": {
    "crypto": {
      "_id": "...",
      "name": "Ripple",
      "symbol": "XRP",
      "price": 2.50,
      "change": -0.85,
      "marketCap": "140B",
      "createdAt": "2026-05-01T..."
    }
  }
}
```

**Check:**
- ✅ Status: 201 Created
- ✅ Crypto is saved to database
- ✅ Verify with `GET /crypto` - should see new crypto in list

---

#### 3.5 Add Crypto - Validation Tests

**Test 5a: Missing required fields**
```json
{
  "name": "Cardano"
}
```
**Expected:** `400 Bad Request` - Missing symbol, price, change

**Test 5b: Duplicate symbol**
```json
{
  "name": "Bitcoin Copy",
  "symbol": "BTC",
  "price": 70000,
  "change": 1.0
}
```
**Expected:** `409 Conflict` - Symbol already exists

**Test 5c: Negative price**
```json
{
  "name": "Test",
  "symbol": "TST",
  "price": -100,
  "change": 0
}
```
**Expected:** `400 Bad Request` - Price cannot be negative

---

### 4. ✅ LOGOUT ENDPOINT

```
Method: POST
URL: http://localhost:5000/auth/logout
Headers: Content-Type: application/json
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Logged out successfully!"
}
```

**Check:**
- ✅ Status: 200 OK
- ✅ Cookie should be cleared

---

## 🎯 FINAL VERIFICATION CHECKLIST

### Backend Endpoints
- [ ] `GET /auth/register` - Creates user, returns JWT
- [ ] `GET /auth/login` - Authenticates user, returns JWT  
- [ ] `GET /auth/profile` - Protected, returns user data
- [ ] `POST /auth/logout` - Clears session
- [ ] `GET /crypto` - Returns all cryptos
- [ ] `GET /crypto/gainers` - Returns top 10 gainers
- [ ] `GET /crypto/new` - Returns 10 newest listings
- [ ] `POST /crypto` - Creates new crypto

### Error Handling
- [ ] Invalid input returns 400 Bad Request
- [ ] Duplicate email returns 409 Conflict
- [ ] Invalid credentials return 401 Unauthorized
- [ ] Missing JWT returns 401 Unauthorized
- [ ] Invalid JWT returns 401 Unauthorized
- [ ] Duplicate symbol returns 409 Conflict

### Database
- [ ] Users table has proper password hashing
- [ ] Cryptos table stores all required fields
- [ ] Timestamps are auto-generated
- [ ] Unique constraints work (email, symbol)

### JWT & Cookies
- [ ] JWT is stored in HTTP-only cookie
- [ ] Cookie has secure flag (in production)
- [ ] Cookie expires after 7 days
- [ ] Logout clears cookie

---

## 🚀 Quick Testing Command

**Save this as `test-backend.sh` and run it:**

```bash
#!/bin/bash

echo "1️⃣ Testing Register..."
curl -X GET http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test123@example.com","password":"password123"}'

echo "\n2️⃣ Testing Login..."
curl -X GET http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test123@example.com","password":"password123"}' \
  -c cookies.txt

echo "\n3️⃣ Testing Get All Cryptos..."
curl -X GET http://localhost:5000/crypto

echo "\n4️⃣ Testing Get Gainers..."
curl -X GET http://localhost:5000/crypto/gainers

echo "\n5️⃣ Testing Get New Listings..."
curl -X GET http://localhost:5000/crypto/new

echo "\n6️⃣ Testing Add Crypto..."
curl -X POST http://localhost:5000/crypto \
  -H "Content-Type: application/json" \
  -d '{"name":"Dogecoin","symbol":"DOGE","price":0.35,"change":5.2}'

echo "\n✅ Backend tests complete!"
```

---

## 📱 Frontend Integration Tests

Once backend is verified:

1. **Sign up from frontend** → Should create account
2. **Check cookies in browser** → Should have `token` cookie
3. **Visit /profile** → Should show user data
4. **Go to /explore** → Should show 6+ cryptos
5. **Try filters** → Should work with API data
6. **Log out** → Should clear cookie and session

---

**Ready to test?** Start with the Postman tests above! 🧪
