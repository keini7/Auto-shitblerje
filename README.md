🚗 Car Marketplace Backend

Backend i thjeshtë dhe funksional për një app shitje makinash.
Përdor Node.js + Express + MongoDB dhe ka support për upload fotosh, filtra, kërkim, login dhe gjëra të domosdoshme për një marketplace.

⚙️ Teknologjitë

Node.js / Express

MongoDB (Mongoose)

JWT Auth

Multer (file upload)

Sharp (optimizim fotot)

Swagger për dokumentim

CarAPI (brand + model list)

🚀 Si ta nisësh
git clone <repo-url>
cd carbackend
npm install


Krijo .env:

MONGO_URI=mongodb://127.0.0.1:27017/car_marketplace
JWT_SECRET=anything-you-want
PORT=8000


Nis serverin:

npm run dev


Backend-i hapet në:
http://localhost:8000

Swagger:
http://localhost:8000/api-docs


🔐 Auth
Register
POST /api/auth/register

Login
POST /api/auth/login


🚘 Cars
Get all cars (me search + filters + sorting + pagination)
GET /api/cars

Shembuj:

/api/cars?search=bmw

/api/cars?brand=BMW&minPrice=3000&maxPrice=15000

/api/cars?sort=price_desc

Get car by ID
GET /api/cars/:id

Create car
(duhet token)
POST /api/cars

Delete car
DELETE /api/cars/:id


❤️ Favorites
Add: POST /api/user/favorites/:carId

Remove: DELETE /api/user/favorites/:carId

Get all: GET /api/user/favorites


🤝 Related Cars
GET /api/cars/:id/related
Sugjeron makina të ngjashme (brand, cmim, vit, km).


🖼 Upload Fotosh
POST /api/upload/car-images

dergon 1–20 imazhe

backend i kompreson dhe krijon thumbnail

Response kthen:

{
  "images": [
  {
      "original": "...",
      "optimized": "...",
      "thumbnail": "..."
    }
  ]
}
