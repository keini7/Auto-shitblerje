const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,    
  },
  brand: {
    type: String,
    required: false,    // Opsionale
  },
  model: {
    type: String,
    required: false,    // Opsionale
  },
  year: {
    type: Number,
    required: false,    // Opsionale
  },
  price: {
    type: Number,
    required: false,    // Opsionale – user mund të vendosë "Kontakt"
  },
  mileage: {
    type: Number,
    required: false,    // Opsionale
  },
  fuel: {
    type: String,
    required: true,    // Opsionale
  },
  transmission: {
    type: String,
    required: false,
  },
  body_type: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  images: [
    {
      type: String,
      required: true,  // Edhe fotot mund të jenë opsionale
    }
  ],
  location: {
    type: String,
    required: false,
  },

  // Seller i detyruar
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Car", CarSchema);
