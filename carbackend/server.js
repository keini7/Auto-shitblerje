const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Verify required environment variables
if (!process.env.MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not defined in .env file");
  console.error("   Please create a .env file in the carbackend directory with:");
  console.error("   MONGO_URI=mongodb://127.0.0.1:27017/car-marketplace");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ Error: JWT_SECRET is not defined in .env file");
  process.exit(1);
}

connectDB();

const app = express();

// CORS configuration - Allow from localhost and network IP
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8100',
  'http://localhost:3000',
  'http://192.168.1.216:5173', // Add your local IP
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('192.168.') || origin.includes('10.0.') || origin.includes('172.')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Static Upload Folder
app.use("/uploads", express.static("uploads"));

// ==== ROUTES ====
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

// ==== API DOCUMENTATION ROUTE ====
app.get("/api", (req, res) => {
  res.json({
    message: "Car Marketplace API Endpoints",
    endpoints: {
      auth: {
        register: {
          method: "POST",
          url: "/api/auth/register",
          description: "Krijon një përdorues të ri"
        },
        login: {
          method: "POST",
          url: "/api/auth/login",
          description: "Bën login dhe kthen token"
        }
      },
      cars: {
        list: {
          method: "GET",
          url: "/api/cars",
          description: "Merr listën e të gjitha makinave"
        },
        getOne: {
          method: "GET",
          url: "/api/cars/:id",
          description: "Merr të dhënat e një makine sipas ID"
        },
        create: {
          method: "POST",
          url: "/api/cars",
          description: "Shton një makinë të re (kerkon login)"
        },
        myCars: {
          method: "GET",
          url: "/api/cars/me/mine",
          description: "Merr makinat e mia (kerkon login)"
        },
        delete: {
          method: "DELETE",
          url: "/api/cars/:id",
          description: "Fshin makinë (vetëm pronari, kerkon login)"
        }
      },
      upload: {
        uploadImage: {
          method: "POST",
          url: "/api/upload/car-image",
          description: "Ngarkon foto të makinave (kerkon login)"
        }
      }
    }
  });
});

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Car Marketplace API Running 🚗");
});


const { swaggerUi, swaggerSpec } = require("./docs/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs-json", (req, res) => res.json(swaggerSpec));


const errorHandler = require("./middleware/errorHandler");

// Error handler must be last
app.use(errorHandler);

// ==== START SERVER ====
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Network access: http://192.168.1.216:${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please stop the other process or use a different port.`);
    console.error(`   Try: lsof -ti:${PORT} | xargs kill -9`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
});
