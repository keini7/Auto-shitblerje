# 🚗 Car Marketplace - Backend API

Backend API për aplikacionin Car Marketplace, i ndërtuar me Node.js, Express dhe MongoDB.

## 🚀 Quick Start

```bash
npm install

# Krijo .env file:
MONGO_URI=mongodb://127.0.0.1:27017/car-marketplace
JWT_SECRET=your-secret-key-here
PORT=8000

# Nis serverin:
npm run dev
```

Server hapet në: `http://localhost:8000`

---

## 📚 API Documentation

Swagger Documentation: `http://localhost:8000/api-docs`

---

## 🔐 Authentication

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "token": "jwt-token-here"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "token": "jwt-token-here"
}
```

### Get Me (kërkon token)
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
}
```

---

## 🚘 Cars API

### Get All Cars
```http
GET /api/cars?page=1&limit=10&search=bmw&brand=BMW&minPrice=3000&maxPrice=15000&sort=price_desc
```

**Query Parameters:**
- `page` - Numri i faqes (default: 1)
- `limit` - Numri i makinave për faqe (default: 10)
- `search` - Kërkim në title, brand, model
- `brand` - Filtrimi sipas markës
- `minPrice` / `maxPrice` - Filtrimi sipas çmimit
- `year` - Filtrimi sipas vitit
- `fuel` - Filtrimi sipas llojit të karburantit
- `sort` - Renditja (`price_asc`, `price_desc`, `year_desc`, `latest`)

**Response:**
```json
{
  "cars": [...],
  "page": 1,
  "pages": 10,
  "total": 100
}
```

### Get Car by ID
```http
GET /api/cars/:id
```

### Create Car (kërkon token)
```http
POST /api/cars
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "BMW 320d",
  "brand": "BMW",
  "model": "320d",
  "year": 2020,
  "price": 15000,
  "mileage": 50000,
  "fuel": "Diesel",
  "transmission": "Manual",
  "bodyType": "Sedan",
  "location": "Tirana",
  "description": "Makina në gjendje të shkëlqyer"
}
```

### Delete Car (kërkon token, vetëm pronari)
```http
DELETE /api/cars/:id
Authorization: Bearer <token>
```

### Get My Cars (kërkon token)
```http
GET /api/cars/me/mine
Authorization: Bearer <token>
```

---

## 🖼️ Upload API

### Upload Car Images (kërkon token)
```http
POST /api/upload/car-image
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
  - images: File[] (1-20 images)
```

**Response:**
```json
{
  "images": [
    {
      "original": "/uploads/car-images/original-123.jpg",
      "optimized": "/uploads/car-images/optimized-123.jpg",
      "thumbnail": "/uploads/car-images/thumbnail-123.jpg"
    }
  ]
}
```

---

## 🛠️ Teknologjitë

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database (Mongoose)
- **JWT** - Authentication
- **Multer** - File upload
- **Sharp** - Image optimization
- **Swagger** - API documentation
- **CORS** - Cross-origin requests

---

## 📁 Struktura

```
carbackend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── carController.js   # Car CRUD logic
│   └── uploadController.js # Upload logic
├── middleware/
│   ├── authMiddleware.js  # JWT verification
│   └── errorHandler.js    # Error handling
├── models/
│   ├── User.js            # User model
│   └── Car.js             # Car model
├── routes/
│   ├── authRoutes.js      # Auth routes
│   ├── carRoutes.js       # Car routes
│   └── uploadRoutes.js    # Upload routes
├── utils/
│   └── generateToken.js   # JWT generation
└── server.js              # Main server file
```

---

## ⚙️ Environment Variables

```env
MONGO_URI=mongodb://127.0.0.1:27017/car-marketplace
JWT_SECRET=your-secret-key-here
PORT=8000
CARAPI_BASE_URL=https://carapi.app/api
```

---

## 🔒 Security

- JWT token authentication
- Password hashing me bcrypt
- CORS configuration
- File upload validation
- Error handling middleware

---

## 🐛 Troubleshooting

### MongoDB connection error:
- Verifiko që MongoDB po funksionon
- Kontrollo `MONGO_URI` në `.env`

### Port already in use:
```bash
lsof -ti:8000 | xargs kill -9
```

### CORS errors:
- Verifiko CORS configuration në `server.js`
- Shto origin në listën e lejuar

---

## 📄 License

MIT

