// models/restaurantModel.js
const db = require("../config/db");

const RestaurantModel = {
  /**
   * Fetch all restaurants from the database
   */
  getAll: async () => {
    const [rows] = await db.query(
      "SELECT id, name, cuisine, rating FROM restaurants ORDER BY rating DESC"
    );
    return rows;
  },

  /**
   * Fetch a single restaurant by ID
   */
  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT id, name, cuisine, rating FROM restaurants WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },
};

module.exports = RestaurantModel;
