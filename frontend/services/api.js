// services/api.js
import axios from "axios";

/**
 * ⚠️  IMPORTANT: Replace this IP with your machine's local IP address.
 *    - On Mac/Linux: run `ifconfig` and look for your Wi-Fi IP (e.g. 192.168.x.x)
 *    - On Windows:   run `ipconfig` and look for IPv4 Address
 *    - Do NOT use 'localhost' — Expo Go runs on a physical device/emulator
 *      which cannot reach your computer's localhost directly.
 */
const BASE_URL = "http://192.168.100.55:5000"; // ← changed to user IP

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch all restaurants from the backend
 * @returns {Promise<Array>} Array of restaurant objects
 */
export const fetchRestaurants = async () => {
  const response = await apiClient.get("/restaurants");
  return response.data.data; // { success, count, data: [...] }
};

export default apiClient;
