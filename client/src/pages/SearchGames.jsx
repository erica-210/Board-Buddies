import React, { useState, useEffect } from "react";
import axios from "axios";

import Auth from "../utils/auth";
import { saveGameIds, getSavedGameIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_BOARD_GAME } from "../utils/mutations";
import { searchGamesByName, fetchGameById } from "../utils/API";

const SearchGames = () => {
  const [searchedGames, setSearchedGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  }, [savedGameIds]);

  const [saveGameMutation] = useMutation(SAVE_BOARD_GAME);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    if (!searchInput) {
      console.error("Search input is empty");
      return false;
    }
  
    try {
      // Search for games by name using the API function
      const gameData = await searchGamesByName(searchInput);

      console.log("Game data:", gameData);
  
      setSearchedGames(gameData);
      setSearchInput("");
    } catch (err) {
      console.error("An error occurred while searching for games:", err);
    }
  };
  
  const handleSaveGame = async (gameId) => {
    // find the game in `searchedGames` state by the matching id
    const gameToSave = searchedGames.find((game) => game.gameId === gameId);
  
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
  
    if (!token) {
      console.error("User is not logged in. Unable to save game.");
      return false;
    }
  
    try {
      // Execute the SAVE_GAMEmutation
      const { data } = await saveGameMutation({
        variables: { game: gameToSave },
      });
  
      if (!data) {
        throw new Error("something went wrong!");
      }
  
      console.log("Game saved successfully:", gameToSave);
  
      // if book successfully saves to user's account, save game id to state
      setSavedGameIds([...savedGameIds, gameToSave.gameId]);
    } catch (err) {
      console.error("An error occurred while saving the game:", err);
    }
  };
  

  return (
    <div>
      <h1>Welcome to the Search Games Page</h1>
      <div style={{ color: "white", backgroundColor: "black", padding: "1rem" }}>
        <div>
          <h1>Search for Games!</h1>
          <form onSubmit={handleFormSubmit}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                style={{ width: "80%", padding: "0.5rem", fontSize: "1.25rem" }}
                placeholder="Search for a game"
              />
              <button
                type="submit"
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "1.25rem",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Submit Search
              </button>
            </div>
          </form>
        </div>
      </div>
  
      <div>
        <h2 style={{ paddingTop: "1.25rem" }}>
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : "Search for a game to begin"}
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
        {searchedGames && searchedGames.map((game) => {
            return (
              <div key={game.gameId} style={{ width: "calc(33.33% - 1rem)", margin: "0.5rem" }}>
                <div style={{ border: "1px solid black" }}>
                  {game.gameImage && (
                    <img
                      src={game.gameImage}
                      alt={`The cover for ${game.gameName}`}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  <div style={{ padding: "1rem" }}>
                    <h3>{game.gameName}</h3>
                    <p>
                      Creators: {game.creators}<br />
                      Category: {game.category}<br />
                      Players: {game.players}
                    </p>
                    <p>{game.description}</p>
                    {Auth.loggedIn() && (
                      <button
                        disabled={savedGameIds?.some((savedGameId) => savedGameId === game.gameId)}
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          fontSize: "1rem",
                          backgroundColor: "blue",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSaveGame(game.gameId)}
                      >
                        {savedGameIds?.some((savedGameId) => savedGameId === game.gameId)
                          ? "This game has already been saved!"
                          : "Save this Game!"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchGames;
