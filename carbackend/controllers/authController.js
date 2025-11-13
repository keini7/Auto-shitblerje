const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// ================= REGISTER =================
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check missing fields
    if (!name || !email || !password)
      throw new Error("Name, email and password are required");

    const exists = await User.findOne({ email });

    if (exists) {
      res.status(400);
      throw new Error("Email already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      phone,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });

  } catch (err) {
    next(err);
  }
};

// ================= LOGIN =================
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("Email not found");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      res.status(400);
      throw new Error("Invalid password");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });

  } catch (err) {
    next(err);
  }
};
