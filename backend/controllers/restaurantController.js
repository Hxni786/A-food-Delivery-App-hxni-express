// controllers/restaurantController.js
const RestaurantModel = require("../models/restaurantModel");

/**
 * GET /restaurants
 * Returns all restaurants
 */
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.getAll();
    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurants",
      error: error.message,
    });
  }
};

/**
 * GET /restaurants/:id
 * Returns a single restaurant
 */
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantModel.getById(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurant",
      error: error.message,
    });
  }
};

module.exports = { getAllRestaurants, getRestaurantById };
