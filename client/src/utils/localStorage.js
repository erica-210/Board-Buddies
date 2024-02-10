export const saveAuthToken = (token) => {
  localStorage.setItem("auth_token", token);
};

export const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

export const removeAuthToken = () => {
  localStorage.removeItem("auth_token");
};

export const getSavedGameIds = () => {
  const savedGameIds = localStorage.getItem("saved_games")
    ? JSON.parse(localStorage.getItem("saved_books"))
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
  const savedGameIds = localStorage.getItem("saved_games")
    ? JSON.parse(localStorage.getItem("saved_games"))
    : null;

  if (!savedGameIds) {
    return false;
  }

  const updatedSavedGameIds = savedGameIds?.filter(
    (savedGameId) => savedGameId !== gameId
  );
  localStorage.setItem("saved_games", JSON.stringify(updatedSavedGameIds));

  return true;
};
