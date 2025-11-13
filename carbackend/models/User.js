const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },

  email: { 
    type: String, 
    unique: true, 
    required: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  phone: { 
    type: String 
  },

  // ⭐ Favorites list
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car"
    }
  ],

  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("User", UserSchema);
