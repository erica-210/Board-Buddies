
export const saveAuthToken = (token) => {
  localStorage.setItem("auth_token", token);
};

export const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

export const removeAuthToken = () => {
  localStorage.removeItem("auth_token");
};

export const getSavedAnimeIds = () => {
  const savedAnimeIds = localStorage.getItem("saved_anime")
    ? JSON.parse(localStorage.getItem("saved_books"))

    : [];

  return savedAnimeIds;
};

export const saveAnimeIds = (animeIdArr) => {
  if (animeIdArr.length) {
    localStorage.setItem("saved_anime", JSON.stringify(animeIdArr));
  } else {
    localStorage.removeItem("saved_anime");
  }
};

export const removeAnimeId = (animeId) => {
  const savedAnimeIds = localStorage.getItem("saved_anime")
    ? JSON.parse(localStorage.getItem("saved_anime"))
    : null;

  if (!savedAnimeIds) {
    return false;
  }

  const updatedSavedAnimeIds = savedAnimeIds?.filter(
    (savedAnimeId) => savedAnimeId !== animeId

  );
  localStorage.setItem("saved_anime", JSON.stringify(updatedSavedAnimeIds));

  return true;
};


