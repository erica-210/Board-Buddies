
import React, { useState, useEffect } from 'react';
import { getSavedAnimeIds, saveAnimeIds } from '../../utils/localStorage';


const Wishlist = () => {
  // State to store the list of Animes in the wishlist
  const [wishlist, setWishlist] = useState([]);

  // State to store the selected Anime in the dropdown

  const [selectedAnimeId, setselectedAnimeId] = useState('');

  // Load wishlist from local storage on component mount
  useEffect(() => {
    const storedAnimeIds = getSavedAnimeIds();
    setWishlist(storedAnimeIds);
  }, []);

  // Function to handle removing a Anime from the wishlist
  const handleRemoveAnime = (animeId) => {
    const updatedWishlist = wishlist.filter((savedAnimeId) => savedAnimeId !== animeId);

    setWishlist(updatedWishlist);
    saveAnimeIds(updatedWishlist);
  };

  // Log selected Anime ID when it changes
  useEffect(() => {
    console.log("Selected Anime ID:", selectedAnimeId);
  }, [selectedAnimeId]);

  return (
    <div>

      <h2>Wishlist</h2>
      <select value={selectedAnimeId} onChange={e => setselectedAnimeId(e.target.value)}>
        <option value="">Select a Anime</option>
        <option value="animeId1">Anime 1</option>
        <option value="amnieId2">Anime 2</option>
        {/* Add more options for additional Animes */}

      </select>

      <ul>
        {wishlist.map((animeId, index) => (
          <li key={index}>
            {animeId} {/* Display Anime information here */}
            <button onClick={() => handleRemoveAnime(animeId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
