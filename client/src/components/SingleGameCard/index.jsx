import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BOARD_GAMES } from "../../utils/queries";
import { addToWishlist, addToGamesOwned } from "../../utils/localStorage";

const SingleGame = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BOARD_GAMES, {
    variables: { gameId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const game = data.boardGame;

  const handleAddToWishlist = () => {
    addToWishlist(game.gameId);
    alert("Game added to wishlist!");
  };

  const handleAddToGamesOwned = () => {
    addToGamesOwned(game.gameId);
    alert("Game added to games owned!");
  };

  return (
    <div>
      <h1>{game.gameName}</h1>
      <img src={game.gameImage} alt={game.gameName} />
      <p>Creators: {game.creators.join(", ")}</p>
      <p>Category: {game.category}</p>
      <p>Players: {game.players}</p>
      <p>Play Time: {game.playTime} minutes</p>
      <p>Recommended Age: {game.recommendedAge}</p>
      <p>Description: {game.description}</p>
      <a href={game.gameLink} target="_blank" rel="noopener noreferrer">View Game</a>
      
      {/* Add to Wishlist button */}
      <button onClick={handleAddToWishlist}>Add to Wishlist</button>
      
      {/* Add to Games Owned button */}
      <button onClick={handleAddToGamesOwned}>Add to Games Owned</button>
    </div>
  );
};

export default SingleGame;
