# 🌸 Perfume Store Backend API

Backend API for a perfume catalog application with authentication, admin panel, and advanced user features such as reviews, favorites, and recommendations.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration (sign up) ✅
* User login (sign in) ✅
* Logout ✅
* Refresh tokens ✅
* JWT authentication ✅
* Password reset via email:  ✅

  * Forgot password (email with reset link)  ✅
  * Reset password (via token) ✅
* Email verification (optional) ✅
* Role-based access control (USER / ADMIN/ GUEST) ✅

---

### 👤 User

* Get current user (`/me`) ✅
* Update user information ✅
* Upload / update avatar   НА КОНЕЦ
* Change email (with confirmation) ✅

---

### 🛡️ Admin

* Protected admin routes✅
* Manage users (optional)
* Full control over perfume catalog
* Upload and manage photos НА КОНЕЦ

---

### 🌸 Perfume Management

* Create perfume (ADMIN) ✅
* Update perfume (ADMIN)  ✅
* Delete perfume (ADMIN) ✅
* Get perfume by ID ✅
* Get all perfumes (with pagination)✅

#### 🔍 Search & Filters

* Search by name / brand
* Filter by:

  * gender (male, female, unisex)
  * season (summer, winter, etc.)
  * notes (vanilla, citrus, woody, etc.)
* Sorting:

  * by rating
  * by date

---

### 🖼️ Photo Management НА КОНЕЦ

* Upload perfume images (ADMIN)  
* Update images
* Delete images
* Multiple images per perfume
* Set main (cover) image

---

### ⭐ Reviews & Ratings

* Add review to a perfume
* Rate perfume (1–5)
* Edit own review
* Delete own review

#### Extras:

* Average rating per perfume
* Sort perfumes by rating

---

### ❤️ Favorites (Wishlist)

* Add perfume to favorites
* Remove from favorites
* Get user's favorite perfumes

---

### 🧠 Recommendations

* Similar perfumes (based on notes)
* Popular perfumes
* Top-rated perfumes

---

### 📊 Admin Statistics

* Total users
* Total perfumes
* Most popular perfumes

---

### 🔔 Notifications (optional)

* New perfume added
* Activity-related notifications

---

## 🏗️ API Structure (Example)

```
/auth
  POST /register ✅
  POST /login ✅
  POST /refresh ✅
  POST /logout ✅
  forgotPasswordSendEmail  ✅
  POST /forgot-password ✅
  POST /reset-password✅
  change-password ✅

/users
  GET /me ✅
  PUT /me✅
  PUT /avatar

/perfumes
  POST / ✅
  GET /✅
  GET /:id✅
  PUT /:id✅
  DELETE /:id✅

/reviews
  POST /
  PUT /:id
  DELETE /:id

/favorites
  POST /:perfumeId
  DELETE /:perfumeId
  GET /

/photos
  POST /
  DELETE /:id
```

/cart
  GET /              -> Get current user's cart  ✅
  POST /add          -> Add perfume to cart ✅
  PUT /item/:id      -> Update item quantity  ✅
  DELETE /item/:id   -> Remove item from cart
  DELETE /clear      -> Clear cart



---

## 🔐 Security

* Password hashing (bcrypt) ✅
* JWT access & refresh tokens ✅
* Token expiration & validation ✅
* Protected routes (middleware) ✅
* Role-based authorization
* Rate limiting (auth endpoints)

---

## 🧱 Tech Stack (example)

* Node.js 
* Express / NestJS
* PostgreSQL / MongoDB
* JWT
* Multer / Cloudinary / S3 (for file uploads)

---

## 📌 Future Improvements

* Full-text search
* Recommendation system based on user behavior
* Real-time notifications
* Advanced analytics dashboard

---
