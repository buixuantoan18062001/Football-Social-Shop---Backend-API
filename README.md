# -Football-Social-Shop---Backend-API
⚽ Football Social Shop - Backend API

🏗 System Architecture
Frontend (React)
      │
      │ HTTP API
      ▼
Backend (Express.js)
      │
      ▼
MongoDB Database
📂 Project Structure
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
🔐 Authentication

Authentication is handled using JWT tokens.

Protected routes require:

Authorization: Bearer <token>
🧩 Backend API

Base URL:

/api
🔐 AUTH
/api/auth
Method	Endpoint	Description
POST	/register	Register new user
POST	/login	Login user
GET	/profile	Get current profile
PUT	/profile	Update profile
DELETE	/profile	Delete profile
PATCH	/profile/password	Change password
👤 USERS (Admin)
/api/users
Method	Endpoint
GET	/
GET	/:id
PUT	/:id
DELETE	/:id
PATCH	/:id/role
GET	/stats
🛍 PRODUCTS
/api/products
Method	Endpoint
GET	/
GET	/:id
POST	/
PUT	/:id
DELETE	/:id
POST	/:id/like
POST	/:id/rating
GET	/trending
📰 ARTICLES
/api/articles
Method	Endpoint
GET	/
GET	/:id
POST	/
PUT	/:id
DELETE	/:id
POST	/:id/like
GET	/trending
🛒 CART
/api/cart
Method	Endpoint
GET	/
POST	/
DELETE	/:id
📦 ORDER
/api/orders
Method	Endpoint
POST	/
GET	/my-orders
GET	/
PUT	/:id
DELETE	/:id
💳 PAYMENT
/api/payment
Method	Endpoint
POST	/create
POST	/confirm
GET	/my
💬 ARTICLE COMMENTS
/api/article-comments
Method	Endpoint
POST	/:articleId
GET	/:articleId
POST	/reply/:id
GET	/reply/:id
POST	/like/:id
DELETE	/:id
💬 PRODUCT COMMENTS
/api/product-comments
Method	Endpoint
POST	/:productId
GET	/:productId
POST	/reply/:id
GET	/reply/:id
POST	/like/:id
DELETE	/:id
📁 UPLOAD
/api/upload
Method	Endpoint
POST	/profile-image
PUT	/profile-image
DELETE	/profile-image
📚 API Documentation

Swagger UI available at:

/api-docs
🛠 Installation
1️⃣ Clone project
git clone https://github.com/your-username/football-social-shop.git
2️⃣ Install backend
cd backend
npm install
3️⃣ Install frontend
cd frontend
npm install
4️⃣ Run backend
npm run dev
5️⃣ Run frontend
npm run dev
🌐 Environment Variables

Create .env file inside backend folder.

PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/shopdb
JWT_SECRET=123456

CLOUDINARY_NAME=didbllnmc
CLOUDINARY_KEY=889797647366931
CLOUDINARY_SECRET=C4Hg_yzXgNOPEce_gAmvPGvu0Uo
