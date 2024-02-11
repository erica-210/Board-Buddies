export const getSavedGameIds = () => {
  const savedGameIds = localStorage.getItem("saved_games")
    ? JSON.parse(localStorage.getItem("saved_games"))
    : [];

  return savedGameIds;
};

export const saveGameIds = (gameIdArr) => {
  if (gameIdArr.length) {
    localStorage.setItem("saved_games", JSON.stringify(gameIdArr));
  } else {
    localStorage.removeItem("saved_games");
  }
};

export const removeGameId = (gameId) => {
  const savedGameIds = getSavedGameIds();

  const updatedSavedGameIds = savedGameIds.filter(
    (savedGameId) => savedGameId !== gameId
  );
  localStorage.setItem("saved_games", JSON.stringify(updatedSavedGameIds));

  return true;
};

export const getSavedGameData = () => {
  const savedGameData = localStorage.getItem("saved_game_data")
    ? JSON.parse(localStorage.getItem("saved_game_data"))
    : { wishlist: [], gamesOwned: [] };

  return savedGameData;
};

export const saveGameData = (gameData) => {
  localStorage.setItem("saved_game_data", JSON.stringify(gameData));
};

export const addToWishlist = (gameId) => {
  const savedGameData = getSavedGameData();
  savedGameData.wishlist.push(gameId);
  saveGameData(savedGameData);
};

export const removeFromWishlist = (gameId) => {
  const savedGameData = getSavedGameData();
  savedGameData.wishlist = savedGameData.wishlist.filter(
    (savedGameId) => savedGameId !== gameId
  );
  saveGameData(savedGameData);
};

export const addToGamesOwned = (gameId) => {
  const savedGameData = getSavedGameData();
  savedGameData.gamesOwned.push(gameId);
  saveGameData(savedGameData);
};

export const removeFromGamesOwned = (gameId) => {
  const savedGameData = getSavedGameData();
  savedGameData.gamesOwned = savedGameData.gamesOwned.filter(
    (savedGameId) => savedGameId !== gameId
  );
  saveGameData(savedGameData);
};
