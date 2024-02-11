import React, { useState, useEffect } from "react";
import { getSavedAnimeIds, saveAnimeIds } from "../../utils/localStorage";

const AnimeToWatch= () => {
  // State to store the list of anime watched
  const [animeToWatch, setAnimeToWatch] = useState([]);

  // State to store the selected anime in the dropdown
  const [selectedAnimeId, setSelectedAnimeId] = useState("");

  // Load anime watched from local storage on component mount
  useEffect(() => {
    const storedAnimeToWatch = getSavedAnimeIds();
    console.log("Stored anime IDs:", storedAnimeToWatch);
    setAnimeToWatch(storedAnimeToWatch);
  }, []);

  // Function to handle removing an anime from the watched list
  const handleRemoveAnime = (animeId) => {
    const updatedAnimeToWatch = animeToWatch.filter(
      (savedAnimeId) => savedAnimeId !== animeId
    );
    console.log("Updated anime to watch after removal:", updatedAnimeToWatch);
    setAnimeToWatch(updatedAnimeToWatch);
    saveAnimeIds(updatedAnimeToWatch);
  };

  // Log selected anime ID when it changes
  useEffect(() => {
    console.log("Selected anime ID:", selectedAnimeId);
  }, [selectedAnimeId]);

  return (
    <div>
      <h2>Watch Next</h2>
      <select
        value={selectedAnimeId}
        onChange={(e) => setSelectedAnimeId(e.target.value)}
      >
        <option value="">Select an anime</option>
        {/* Map over anime watched to generate options */}
        {animeToWatch.map((animeId, index) => (
          <option key={index} value={animeId}>
            {animeId}
          </option>
        ))}
      </select>

      <ul>
        {animeToWatch.map((animeId, index) => (
          <li key={index}>
            {animeId} {/* Display anime information here */}
            <button onClick={() => handleRemoveAnime(animeId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeToWatch;
