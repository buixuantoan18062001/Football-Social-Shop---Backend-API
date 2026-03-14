# ⚽ Football Social Shop

A **Fullstack Social E-Commerce Platform** where users can read football articles, interact with the community, and shop football products.

This project combines **social network features** with **e-commerce functionality**, allowing users to interact with content while also purchasing football-related products.

---

# 🚀 Features

### 👤 User Features

* Register and login with JWT authentication
* View and update user profile
* Upload profile images
* Change password

### 📰 Social Features

* Read football articles
* Like articles
* Comment and reply to articles
* Like comments

### 🛍 E-Commerce Features

* Browse football products
* Like and rate products
* Add products to cart
* Place orders
* Make payments

### 🛠 Admin Features

* Manage users
* Manage products
* Manage orders
* View user statistics

---

# 🏗 System Architecture

```
Frontend (React)
       │
       │ HTTP API
       ▼
Backend (Node.js + Express)
       │
       ▼
MongoDB Database
---

# 🧰 Tech Stack

## Frontend

* React
* React Router
* Axios
* Bootstrap / CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer (File Upload)

## API Documentation

* Swagger (OpenAPI)

---

# 📂 Project Structure

```
football-social-shop
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── api
│   │   └── App.jsx
│
└── README.md
```

---

# 🔐 Authentication

Authentication is handled using **JWT Tokens**.

Protected routes require the following header:

```
Authorization: Bearer <token>
```

---

# 🌐 Backend API

Base URL

```
/api
```

---

# 🔐 AUTH

```
/api/auth
```

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| POST   | /register         | Register a new user      |
| POST   | /login            | Login user               |
| GET    | /profile          | Get current user profile |
| PUT    | /profile          | Update profile           |
| DELETE | /profile          | Delete profile           |
| PATCH  | /profile/password | Change password          |

---

# 👤 USERS (Admin Only)

```
/api/users
```

| Method | Endpoint  | Description      |
| ------ | --------- | ---------------- |
| GET    | /         | Get all users    |
| GET    | /:id      | Get user by ID   |
| PUT    | /:id      | Update user      |
| DELETE | /:id      | Delete user      |
| PATCH  | /:id/role | Update user role |
| GET    | /stats    | User statistics  |

---

# 🛍 PRODUCTS

```
/api/products
```

| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| GET    | /           | Get all products      |
| GET    | /:id        | Get product by ID     |
| POST   | /           | Create product        |
| PUT    | /:id        | Update product        |
| DELETE | /:id        | Delete product        |
| POST   | /:id/like   | Like product          |
| POST   | /:id/rating | Rate product          |
| GET    | /trending   | Get trending products |

---

# 📰 ARTICLES

```
/api/articles
```

| Method | Endpoint  | Description       |
| ------ | --------- | ----------------- |
| GET    | /         | Get all articles  |
| GET    | /:id      | Get article       |
| POST   | /         | Create article    |
| PUT    | /:id      | Update article    |
| DELETE | /:id      | Delete article    |
| POST   | /:id/like | Like article      |
| GET    | /trending | Trending articles |

---

# 🛒 CART

```
/api/cart
```

| Method | Endpoint | Description           |
| ------ | -------- | --------------------- |
| GET    | /        | Get user cart         |
| POST   | /        | Add product to cart   |
| DELETE | /:id     | Remove item from cart |

---

# 📦 ORDER

```
/api/orders
```

| Method | Endpoint   | Description               |
| ------ | ---------- | ------------------------- |
| POST   | /          | Create order              |
| GET    | /my-orders | Get current user's orders |
| GET    | /          | Get all orders (admin)    |
| PUT    | /:id       | Update order              |
| DELETE | /:id       | Delete order              |

---

# 💳 PAYMENT

```
/api/payment
```

| Method | Endpoint | Description              |
| ------ | -------- | ------------------------ |
| POST   | /create  | Create payment           |
| POST   | /confirm | Confirm payment          |
| GET    | /my      | Get user payment history |

---

# 💬 ARTICLE COMMENTS

```
/api/article-comments
```

| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| POST   | /:articleId | Comment on article   |
| GET    | /:articleId | Get article comments |
| POST   | /reply/:id  | Reply to comment     |
| GET    | /reply/:id  | Get replies          |
| POST   | /like/:id   | Like comment         |
| DELETE | /:id        | Delete comment       |

---

# 💬 PRODUCT COMMENTS

```
/api/product-comments
```

| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| POST   | /:productId | Comment on product   |
| GET    | /:productId | Get product comments |
| POST   | /reply/:id  | Reply to comment     |
| GET    | /reply/:id  | Get replies          |
| POST   | /like/:id   | Like comment         |
| DELETE | /:id        | Delete comment       |

---

# 📁 UPLOAD

```
/api/upload
```

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| POST   | /profile-image | Upload profile image |
| PUT    | /profile-image | Update profile image |
| DELETE | /profile-image | Delete profile image |

---

# 📚 API Documentation

Swagger UI available at:

```
/api-docs
```

---

# ⚙️ Installation

## 1️⃣ Clone repository

```bash
git clone https://github.com/your-username/football-social-shop.git
```

---

## 2️⃣ Install Backend

```bash
cd backend
npm install
```

---

## 3️⃣ Install Frontend

```bash
cd frontend
npm install
```

---

## 4️⃣ Run Backend

```bash
npm run dev
```

---

## 5️⃣ Run Frontend

```bash
npm run dev
```

---

# 🌐 Environment Variables

Create a `.env` file inside the **backend** folder.

```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/shopdb
JWT_SECRET=123456

CLOUDINARY_NAME=didbllnmc
CLOUDINARY_KEY=889797647366931
CLOUDINARY_SECRET=C4Hg_yzXgNOPEce_gAmvPGvu0Uo

```

---

# 🎯 Project Purpose

This project demonstrates:

* Fullstack development
* REST API design
* Authentication & Authorization
* Social media interactions
* E-commerce functionality
* Scalable backend architecture

---

# 👨‍💻 Author

Developed as a **Fullstack Portfolio Project** to practice modern web development technologies.
