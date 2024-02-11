import React, { useState, useEffect } from "react";
import { getSavedAnimeIds, saveAnimeIds } from "../../utils/localStorage";

const AnimeWatched = () => {
  // State to store the list of anime watched
  const [animeWatched, setAnimeWatched] = useState([]);

  // State to store the selected anime in the dropdown
  const [selectedAnimeId, setSelectedAnimeId] = useState("");

  // Load anime watched from local storage on component mount
  useEffect(() => {
    const storedAnimeWatched = getSavedAnimeIds();
    console.log("Stored anime IDs:", storedAnimeWatched);
    setAnimeWatched(storedAnimeWatched);
  }, []);

  // Function to handle removing an anime from the watched list
  const handleRemoveAnime = (animeId) => {
    const updatedAnimeWatched = animeWatched.filter(
      (savedAnimeId) => savedAnimeId !== animeId
    );
    console.log("Updated anime watched after removal:", updatedAnimeWatched);
    setAnimeWatched(updatedAnimeWatched);
    saveAnimeIds(updatedAnimeWatched);
  };

  // Log selected anime ID when it changes
  useEffect(() => {
    console.log("Selected anime ID:", selectedAnimeId);
  }, [selectedAnimeId]);

  return (
    <div>
      <h2>Watched List</h2>
      <select
        value={selectedAnimeId}
        onChange={(e) => setSelectedAnimeId(e.target.value)}
      >
        <option value="">Select an anime</option>
        {/* Map over anime watched to generate options */}
        {animeWatched.map((animeId, index) => (
          <option key={index} value={animeId}>
            {animeId}
          </option>
        ))}
      </select>

      <ul>
        {animeWatched.map((animeId, index) => (
          <li key={index}>
            {animeId} {/* Display anime information here */}
            <button onClick={() => handleRemoveAnime(animeId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeWatched;
