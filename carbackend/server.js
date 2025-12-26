const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const net = require("net");
const fs = require("fs");
const connectDB = require("./config/db");

dotenv.config({ path: path.resolve(__dirname, ".env") });

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

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      try {
        const url = new URL(origin);
        const hostname = url.hostname.toLowerCase();
        
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
          return callback(null, true);
        }
        
        const ipParts = hostname.split('.');
        if (ipParts.length === 4) {
          const firstOctet = parseInt(ipParts[0]);
          const secondOctet = parseInt(ipParts[1]);
          
          if (firstOctet === 192 && secondOctet === 168) {
            return callback(null, true);
          }
          
          if (firstOctet === 10) {
            return callback(null, true);
          }
          
          if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) {
            return callback(null, true);
          }
        }
        
        if (process.env.NODE_ENV !== 'production') {
          if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
            return callback(null, true);
          }
        }
        
        console.log(`🚫 CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      } catch (err) {
        console.log(`🚫 CORS error parsing origin: ${origin}`, err.message);
        callback(new Error('Invalid origin'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

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

app.get("/", (req, res) => {
  res.send("Car Marketplace API Running 🚗");
});


const { swaggerUi, swaggerSpec } = require("./docs/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs-json", (req, res) => res.json(swaggerSpec));


const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);

function findAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => {
        resolve(port);
      });
    });
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(startPort + 1)
          .then(resolve)
          .catch(reject);
      } else {
        reject(err);
      }
    });
  });
}

const DEFAULT_PORT = parseInt(process.env.PORT) || 8000;

async function startServer() {
  try {
    const PORT = await findAvailablePort(DEFAULT_PORT);
    
    if (PORT !== DEFAULT_PORT) {
      console.log(`⚠️  Port ${DEFAULT_PORT} is in use, using port ${PORT} instead`);
    }
    
    const portFilePath = path.join(__dirname, '..', 'backend-port.json');
    const frontendPublicPath = path.join(__dirname, '..', 'carfront-ionic', 'public', 'backend-port.json');
    const portInfo = { port: PORT };
    
    fs.writeFileSync(portFilePath, JSON.stringify(portInfo, null, 2));
    console.log(`📝 Port info written to: ${portFilePath}`);
    
    const frontendPublicDir = path.join(__dirname, '..', 'carfront-ionic', 'public');
    if (fs.existsSync(frontendPublicDir)) {
      fs.writeFileSync(frontendPublicPath, JSON.stringify(portInfo, null, 2));
      console.log(`📝 Port info written to: ${frontendPublicPath}`);
    } else {
      try {
        fs.mkdirSync(frontendPublicDir, { recursive: true });
        fs.writeFileSync(frontendPublicPath, JSON.stringify(portInfo, null, 2));
        console.log(`📝 Port info written to: ${frontendPublicPath}`);
      } catch (err) {
        console.warn(`⚠️  Could not write to frontend public folder: ${err.message}`);
      }
    }
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌐 Network access: http://192.168.1.216:${PORT}`);
    });

    server.on('error', (err) => {
      console.error('❌ Server error:', err);
      process.exit(1);
    });
    
    const cleanup = () => {
      if (fs.existsSync(portFilePath)) {
        fs.unlinkSync(portFilePath);
      }
      if (fs.existsSync(frontendPublicPath)) {
        fs.unlinkSync(frontendPublicPath);
      }
    };
    
    process.on('SIGINT', () => {
      cleanup();
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      cleanup();
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
