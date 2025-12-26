/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Image upload API
 */

const router = require("express").Router();
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const sharp = require("sharp");
const fs = require("fs");
const uploadController = require("../controllers/uploadController");

const storage = multer.diskStorage({
  destination: "uploads/car-images/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { files: 20 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

/**
 * @swagger
 * /api/upload/car-image:
 *   post:
 *     summary: Upload a single car image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Uploaded image URL
 */
router.post(
  "/car-image",
  protect,
  upload.single("image"),
  uploadController.uploadImage
);

/**
 * @swagger
 * /api/upload/car-images:
 *   post:
 *     summary: Upload & optimize multiple car images (max 20)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Uploaded images
 */
router.post(
  "/car-images",
  protect,
  upload.array("images", 20),
  async (req, res, next) => {
    try {
      if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error("No images uploaded");
      }

      let images = [];

      for (const file of req.files) {
        const originalPath = file.path;
        const ext = file.originalname.split('.').pop().toLowerCase();
        
        const optFile = file.path.replace(`.${ext}`, `_optimized.jpg`);
        const thumbFile = file.path.replace(`.${ext}`, `_thumb.jpg`);

        await sharp(originalPath)
          .resize(1280, null, { withoutEnlargement: true })  // max width 1280px
          .jpeg({ quality: 80 })
          .toFile(optFile);

        await sharp(originalPath)
          .resize(200, 200, { fit: 'cover' })
          .jpeg({ quality: 70 })
          .toFile(thumbFile);

        images.push({
          original: "/" + originalPath,
          optimized: "/" + optFile,
          thumbnail: "/" + thumbFile,
        });
      }

      res.json({ images });

    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
