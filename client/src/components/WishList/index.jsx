import React, { useState, useEffect } from "react";
import { getSavedGameIds, saveGameIds } from "../../utils/localStorage";

const Wishlist = () => {
  // State to store the list of games in the wishlist
  const [wishlist, setWishlist] = useState([]);

  // State to store the selected game in the dropdown
  const [selectedGameId, setSelectedGameId] = useState("");

  // Load wishlist from local storage on component mount
  useEffect(() => {
    const storedWishlist = getSavedGameIds();
    console.log("Stored game IDs:", storedWishlist);
    setWishlist(storedWishlist);
  }, []);

  // Function to handle removing a game from the wishlist
  const handleRemoveGame = (gameId) => {
    const updatedWishlist = wishlist.filter(
      (savedGameId) => savedGameId !== gameId
    );
    console.log("Updated wishlist after removal:", updatedWishlist);
    setWishlist(updatedWishlist);
    saveGameIds(updatedWishlist);
  };

  // Log selected game ID when it changes
  useEffect(() => {
    console.log("Selected game ID:", selectedGameId);
  }, [selectedGameId]);

  return (
    <div>
      <h2>Saved Games</h2>
      <select
        value={selectedGameId}
        onChange={(e) => setSelectedGameId(e.target.value)}
      >
        <option value="">Select a game</option>
        {/* Map over wishlist to generate options */}
        {wishlist.map((gameId, index) => (
          <option key={index} value={gameId}>
            {gameId}
          </option>
        ))}
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
