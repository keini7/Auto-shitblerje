const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
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


// ==== START SERVER ====
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);


app.use(errorHandler);
});
