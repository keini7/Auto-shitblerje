const Car = require("../models/Car");

// Search + Filter + Sort + Pagination
exports.getCars = async (req, res, next) => {
  try {
    const {
      brand,
      model,
      fuel,
      transmission,
      location,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      minKm,
      maxKm,
      search,
      sort,
      page = 1,
      limit = 20,
    } = req.query;

    let query = {};

    // ----------- SEARCH -----------
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
      ];
    }

    // ----------- FILTERS -----------
    if (brand) query.brand = brand;
    if (model) query.model = model;
    if (fuel) query.fuel = fuel;
    if (transmission) query.transmission = transmission;
    if (location) query.location = { $regex: location, $options: "i" };

    // PRICE RANGE
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // YEAR RANGE
    if (minYear || maxYear) {
      query.year = {};
      if (minYear) query.year.$gte = Number(minYear);
      if (maxYear) query.year.$lte = Number(maxYear);
    }

    // KM RANGE
    if (minKm || maxKm) {
      query.mileage = {};
      if (minKm) query.mileage.$gte = Number(minKm);
      if (maxKm) query.mileage.$lte = Number(maxKm);
    }

    //SORTING
    let sortOption = {};

    switch (sort) {
      case "price_asc":
        sortOption.price = 1;
        break;

      case "price_desc":
        sortOption.price = -1;
        break;

      case "year_asc":
        sortOption.year = 1;
        break;

      case "year_desc":
        sortOption.year = -1;
        break;

      case "km_asc":
        sortOption.mileage = 1;
        break;

      case "km_desc":
        sortOption.mileage = -1;
        break;

      case "latest":
        sortOption.created_at = -1;
        break;

      default:
        sortOption.created_at = -1; // default newest first
    }

    // PAGINATION
    const skip = (page - 1) * limit;

    const cars = await Car.find(query)
      .populate("seller", "name phone email")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Car.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      cars,
    });
  } catch (err) {
    next(err);
  }
};

// GET CAR BY ID 
exports.getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id).populate(
      "seller",
      "name phone email"
    );

    if (!car) {
      res.status(404);
      throw new Error("Car not found");
    }

    res.json(car);
  } catch (err) {
    next(err);
  }
};

exports.getRelatedCars = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      res.status(404);
      throw new Error("Car not found");
    }

    // Sugjerime
    const related = await Car.find({
      _id: { $ne: car._id },               
      brand: car.brand,                  
      price: {
        $gte: car.price * 0.7,           
        $lte: car.price * 1.3
      },
      year: {
        $gte: car.year - 2,           
        $lte: car.year + 2
      }
    })
      .limit(10)                       
      .populate("seller", "name phone email")
      .lean();

    // Nëse dalin shumë pak → sugjero vetëm nga e njëjta markë
    if (related.length < 3) {
      const fallback = await Car.find({
        _id: { $ne: car._id },
        brand: car.brand
      })
        .limit(10)
        .populate("seller", "name phone email")
        .lean();

      return res.json(fallback);
    }

    res.json(related);

  } catch (err) {
    next(err);
  }
};

// CREATE CAR
exports.createCar = async (req, res, next) => {
  try {
    const car = await Car.create({
      ...req.body,
      seller: req.user._id,
    });

    res.json(car);
  } catch (err) {
    next(err);
  }
};

// GET MY CARS
exports.getMyCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ seller: req.user._id });
    res.json(cars);
  } catch (err) {
    next(err);
  }
};

//DELETE CAR
exports.deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      res.status(404);
      throw new Error("Car not found");
    }

    if (car.seller.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    await car.deleteOne();

    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// UPLOAD SINGLE IMAGE
exports.uploadImage = (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No file uploaded");
    }

    res.json({
      url: "/uploads/car-images/" + req.file.filename,
    });
  } catch (err) {
    next(err);
  }
};
