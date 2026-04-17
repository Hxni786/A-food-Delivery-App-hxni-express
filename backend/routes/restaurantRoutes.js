// routes/restaurantRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
} = require("../controllers/restaurantController");

// GET /restaurants       → all restaurants
router.get("/", getAllRestaurants);

// GET /restaurants/:id   → single restaurant
router.get("/:id", getRestaurantById);

module.exports = router;
