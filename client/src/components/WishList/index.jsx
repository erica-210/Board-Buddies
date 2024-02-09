import React, { useState, useEffect } from 'react';
import { getSavedGameIds, saveGameIds, removeGameId } from '../../utils/localStorage';

const Wishlist = () => {
  // State to store the list of games in the wishlist
  const [wishlist, setWishlist] = useState([]);
  // State to store the selected game in the dropdown
  const [selectedGameId, setSelectedGameId] = useState('');

  // Load wishlist from local storage on component mount
  useEffect(() => {
    const storedGameIds = getSavedGameIds();
    setWishlist(storedGameIds);
  }, []);

  // Function to handle removing a game from the wishlist
  const handleRemoveGame = (gameId) => {
    const updatedWishlist = wishlist.filter((savedGameId) => savedGameId !== gameId);
    setWishlist(updatedWishlist);
    saveGameIds(updatedWishlist);
  };

  return (
    <div>
      <h2>Wishlist</h2>
      <select value={selectedGameId} onChange={e => setSelectedGameId(e.target.value)}>
        <option value="">Select a game</option>
        <option value="gameId1">Game 1</option>
        <option value="gameId2">Game 2</option>
        {/* Add more options for additional games */}
      </select>
      <ul>
        {wishlist.map((gameId, index) => (
          <li key={index}>
            {gameId} {/* Display game information here */}
            <button onClick={() => handleRemoveGame(gameId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;

