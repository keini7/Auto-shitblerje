exports.uploadImage = (req, res) => {
  res.json({
    url: "/uploads/car-images/" + req.file.filename
  });
};
