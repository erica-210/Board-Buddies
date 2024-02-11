import React, { useState, useEffect } from 'react';
import { getSavedAnimeIds, saveAnimeIds } from '../../utils/localStorage';

const Wishlist = () => {
  // State to store the list of games in the wishlist
  const [wishlist, setWishlist] = useState([]);
  // State to store the selected game in the dropdown
  const [selectedAnimeId, setselectedAnimeId] = useState('');

  // Load wishlist from local storage on component mount
  useEffect(() => {
    const storedAnimeIds = getSavedAnimeIds();
    setWishlist(storedAnimeIds);
  }, []);

  // Function to handle removing a game from the wishlist
  const handleRemoveAnime = (animeId) => {
    const updatedWishlist = wishlist.filter((savedAnimeId) => savedAnimeId !== animeId);
    setWishlist(updatedWishlist);
    saveAnimeIds(updatedWishlist);
  };

  return (
    <div>
      <h2>Wishlist</h2>
      <select value={selectedAnimeId} onChange={e => setselectedAnimeId(e.target.value)}>
        <option value="">Select a game</option>
        <option value="animeId1">Anime 1</option>
        <option value="amnieId2">Anime 2</option>
        {/* Add more options for additional games */}
      </select>
      <ul>
        {wishlist.map((animeId, index) => (
          <li key={index}>
            {animeId} {/* Display game information here */}
            <button onClick={() => handleRemoveAnime(animeId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;

