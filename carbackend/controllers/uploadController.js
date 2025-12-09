exports.uploadImage = (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No image file uploaded");
    }

    res.json({
      url: "/uploads/car-images/" + req.file.filename
    });
  } catch (error) {
    next(error);
  }
};
