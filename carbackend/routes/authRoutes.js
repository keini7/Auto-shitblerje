/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

const router = require("express").Router();
const { register, login, getMe } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Registered successfully
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged in successfully
 */
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
