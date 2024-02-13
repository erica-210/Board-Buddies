

import axios from "axios";

// // Define the base URL for the MyAnimeList API
// const MAL_API_URL = 'https://api.myanimelist.net/v2/anime/1';

// // Define the access token for the MyAnimeList API
// const ACCESS_TOKEN = 'yourbetterwork';

// // Make a GET request to the MyAnimeList API
// axios.get(MAL_API_URL, {
//   headers: {
//     Authorization: `Bearer ${ACCESS_TOKEN}`
//   }
// })
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error('Error fetching data from MyAnimeList API:', error);
// });

// Define the base URL for the Anime API
const BASE_URL = "https://api.jikan.moe/v4";

// Function to fetch board game data by game ID
export const fetchAnimeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/anime/${id}/full`);
    return response.data;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

// Function to search for anime by name
export const searchAnimeByName = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/anime?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching for anime:", error);
    throw error;
  }
};
