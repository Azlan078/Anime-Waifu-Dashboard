// src/services/waifuApi.js
import axios from 'axios';

const API_BASE_URL = 'https://api.waifu.pics';

/**
 * Fetches a random waifu image
 * @param {string} category - Category of image (sfw or nsfw)
 * @param {string} type - Type of image (waifu, neko, etc.)
 * @returns {Promise<string>} - Image URL
 */
export const fetchRandomWaifu = async (category = 'sfw', type = 'waifu') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${category}/${type}`);
    return response.data.url;
  } catch (error) {
    console.error('Error fetching waifu:', error);
    throw error;
  }
};

/**
 * Fetches multiple random waifu images
 * @param {number} count - Number of images to fetch
 * @param {string} category - Category of image (sfw or nsfw)
 * @param {string} type - Type of image (waifu, neko, etc.)
 * @returns {Promise<string[]>} - Array of image URLs
 */
export const fetchMultipleWaifus = async (count, category = 'sfw', type = 'waifu') => {
  const images = [];
  const maxAttempts = count * 2; // Allow some retry attempts
  let attempts = 0;

  while (images.length < count && attempts < maxAttempts) {
    try {
      attempts++;
      const url = await fetchRandomWaifu(category, type);
      
      // Avoid duplicates
      if (!images.includes(url)) {
        images.push(url);
      }
      
      // Add a small delay to avoid rate limiting
      if (images.length < count) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      // If we've tried too many times, just return what we have
      if (attempts >= maxAttempts) {
        console.warn(`Could only fetch ${images.length} images after ${attempts} attempts`);
        return images;
      }
    }
  }
  
  return images;
};

export default {
  fetchRandomWaifu,
  fetchMultipleWaifus
};