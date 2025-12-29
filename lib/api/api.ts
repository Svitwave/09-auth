import axios from "axios";

// Створюємо інстанс axios
export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  // baseURL: 'http://localhost:3000/api',
  withCredentials: true, // дозволяє axios працювати з cookie
});
console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
