// services/api.js

/**
 * 🚀 STANDALONE MODE ACTIVATED
 * The data is now embedded directly into the app for "Offline-First" capability.
 * No local backend server is required for this APK build.
 */

const MOCK_RESTAURANTS = [
  { id: 1,  name: 'The Golden Fork',      cuisine: 'Italian',       rating: 4.8 },
  { id: 2,  name: 'Sakura Garden',        cuisine: 'Japanese',      rating: 4.7 },
  { id: 3,  name: 'Spice Route',          cuisine: 'Indian',        rating: 4.6 },
  { id: 4,  name: 'Le Petit Bistro',      cuisine: 'French',        rating: 4.5 },
  { id: 5,  name: 'Dragon Palace',        cuisine: 'Chinese',       rating: 4.5 },
  { id: 6,  name: 'Casa Mexico',          cuisine: 'Mexican',       rating: 4.4 },
  { id: 7,  name: 'The Burger Lab',       cuisine: 'American',      rating: 4.3 },
  { id: 8,  name: 'Olive & Vine',         cuisine: 'Mediterranean', rating: 4.3 },
  { id: 9,  name: 'Seoul Kitchen',        cuisine: 'Korean',        rating: 4.2 },
  { id: 10, name: 'Bella Napoli',         cuisine: 'Italian',       rating: 4.2 },
  { id: 11, name: 'Saffron House',        cuisine: 'Indian',        rating: 4.1 },
  { id: 12, name: 'Pho Saigon',           cuisine: 'Vietnamese',    rating: 4.0 },
  { id: 13, name: 'Greek Agora',          cuisine: 'Greek',         rating: 3.9 },
  { id: 14, name: 'Thai Orchid',          cuisine: 'Thai',          rating: 3.9 },
  { id: 15, name: 'Ramen Republic',       cuisine: 'Japanese',      rating: 3.8 }
];

/**
 * Fetch all restaurants from the embedded dataset
 * @returns {Promise<Array>} Array of restaurant objects
 */
export const fetchRestaurants = async () => {
  // Simulate a brief delay for that professional "loading" feel
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_RESTAURANTS);
    }, 800);
  });
};

export default { fetchRestaurants };
