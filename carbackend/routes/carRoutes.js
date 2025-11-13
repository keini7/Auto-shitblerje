/**
 * @swagger
 * /api/cars/{id}/related:
 *   get:
 *     summary: Get related/similar cars
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     responses:
 *       200:
 *         description: List of related cars
 */


const router = require("express").Router();
const axios = require("axios");
const protect = require("../middleware/authMiddleware");


const { getRelatedCars } = require("../controllers/carController");

router.get("/:id/related", getRelatedCars);

const {
  getCars,
  getCarById,
  createCar,
  getMyCars,
  deleteCar,
} = require("../controllers/carController");

const CARAPI_BASE_URL = "https://carapi.app/api";

// ------------------ GET ALL CARS ------------------
router.get("/", getCars);

// ------------------ GET CAR BY ID ------------------
router.get("/:id", getCarById);

// ------------------ CREATE CAR ------------------
router.post("/", protect, createCar);

// ------------------ GET MY CARS ------------------
router.get("/me/mine", protect, getMyCars);

// ------------------ DELETE CAR ------------------
router.delete("/:id", protect, deleteCar);

// ------------------ GET BRANDS (CLEAN LIST) ------------------
router.get("/brands/all", async (req, res, next) => {
  try {
    const response = await axios.get(`${CARAPI_BASE_URL}/makes`);
    const brands = response.data.data.map(item => item.name);
    res.json(brands);
  } catch (err) {
    next(err);
  }
});

// ------------------ GET MODELS BY BRAND (CLEAN LIST) ------------------
router.get("/models/all", async (req, res, next) => {
  const brand = req.query.brand;

  if (!brand) {
    res.status(400);
    return next(new Error("Brand is required"));
  }

  try {
    const response = await axios.get(`${CARAPI_BASE_URL}/models?make=${brand}`);
    const models = response.data.data.map(item => item.name);
    res.json(models);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
