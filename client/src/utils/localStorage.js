
export const getSavedAnimeIds = () => {
  const savedAnimeIds = localStorage.getItem("saved_anime")
    ? JSON.parse(localStorage.getItem("saved_anime"))

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

export const getSavedAnimeData = () => {
  const savedAnimeData = localStorage.getItem("saved_anime_data")
  ? JSON.parse(localStorage.getItem("saved_anime_data"))
  : { watched: [], planToWatch: [] };

  return savedAnimeData;
};

export const saveAnimeData = (animeData) => {
  localStorage.setItem("saved_anime_data", JSON.stringify(animeData));
};

export const addToWatched = (animeId) => {
  const savedAnimeData = getSavedAnimeData();
  savedAnimeData.watched.push(animeId);
  saveAnimeData(savedAnimeData);
};

export const removeFromWatched = (animeId) => {
  const savedAnimeData = getSavedAnimeData();
  savedAnimeData.watched = savedAnimeData.watched.filter(
    (savedAnimeId) => savedAnimeId !== animeId
  );
  saveAnimeData(savedAnimeData);
};

export const addToPlanToWatch = (animeId) => {
  const savedAnimeData = getSavedAnimeData();
  savedAnimeData.planToWatch.push(animeId);
  saveAnimeData(savedAnimeData);
};

export const removeFromPlanToWatch = (animeId) => {
  const savedAnimeData = getSavedAnimeData();
  savedAnimeData.planToWatch = savedAnimeData.planToWatch.filter(
    (savedAnimeId) => savedAnimeId !== animeId
  );
  saveAnimeData(savedAnimeData);
};
