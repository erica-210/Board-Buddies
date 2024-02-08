// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
  .then(response => response.json());
};

// Save a board game for a logged-in user
export const saveBoardGame = (boardGameData, token) => {
  return fetch("/api/users/boardgames", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(boardGameData),
  })
  .then(response => response.json());
};

// Remove a saved board game for a logged-in user
export const deleteBoardGame = (boardGameId, token) => {
  return fetch(`/api/users/boardgames/${boardGameId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  .then(response => response.json());
};

// Make a search to BoardGameGeek XML API
export const searchBoardGameGeek = (query) => {
  return fetch(`https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${query}`)
  .then(response => response.json()); // Convert response to JSON
};