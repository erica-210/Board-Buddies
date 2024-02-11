import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

import { saveAnimeIds, getSavedAnimeIds } from "../../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_ANIME } from "../../utils/mutations";
import { searchAnimeByName } from "../../utils/API";

const SearchAnimeForm = () => {
  const [searchedAnimes, setSearchedAnimes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedAnimeIds, setSavedAnimeIds] = useState(getSavedAnimeIds());

  useEffect(() => {
    return () => saveAnimeIds(savedAnimeIds);
  }, [savedAnimeIds]);

  const [saveAnimeMutation] = useMutation(SAVE_ANIME);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      console.error("Search input is empty");
      return false;
    }

    try {
      // Search for anime by name using the API function
      const animeData = await searchAnimeByName(searchInput);

      console.log("Anime data:", animeData);

      setSearchedAnimes(animeData);
      setSearchInput("");
    } catch (err) {
      console.error("An error occurred while searching for animes:", err);
    }
  };

  const handleSaveAnime = async (animeId) => {
    // find the anime in `searchedAnimes` state by the matching id
    const animeToSave = searchedAnimes.find(
      (anime) => anime.animeId === animeId
    );

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      console.error("User is not logged in. Unable to save anime.");
      return false;
    }

    try {
      // Execute the SAVE_animemutation
      const { data } = await saveAnimeMutation({
        variables: { anime: animeToSave },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }

      console.log("anime saved successfully:", animeToSave);

      // if book successfully saves to user's account, save anime id to state
      setSavedAnimeIds([...savedAnimeIds, animeToSave.animeId]);
    } catch (err) {
      console.error("An error occurred while saving the anime:", err);
    }
  };

  return (
    <div>
      <div
        style={{ color: "white", backgroundColor: "black", padding: "1rem" }}
      >
        <div>
          <h1>Search for a new anime!</h1>
          <form onSubmit={handleFormSubmit}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                style={{ width: "80%", padding: "0.5rem", fontSize: "1.25rem" }}
                placeholder="Search for a new anime"
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
          {searchedAnimes.length
            ? `Viewing ${searchedAnimes.length} results:`
            : "Search for a anime to begin"}
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {console.log("Searched animes:", searchedAnimes)}
          {searchedAnimes &&
            searchedAnimes.map((anime) => {
              // Guard against searchedAnimes being null or undefined
              return (
                <div
                  key={anime.mal_id}
                  style={{ width: "calc(33.33% - 1rem)", margin: "0.5rem" }}
                >
                  <div style={{ border: "1px solid black" }}>
                    {anime.images && anime.images.jpg && (
                      <img
                        src={anime.images.jpg.image_url}
                        alt={`The cover for ${anime.title}`}
                        style={{ width: "100%", height: "auto" }}
                      />
                    )}
                    <div style={{ padding: "1rem" }}>
                      <h3>{anime.title}</h3>
                      <p>
                        Episodes: {anime.episodes}
                        <br />
                        Genres:{" "}
                        {anime.genres.map((genre) => genre.name).join(", ")}
                      </p>
                      <p>Synopsis: {anime.synopsis}</p>
                      {Auth.loggedIn() && (
                        <Link to={`/anime/${anime.mal_id}`}>
                          <button
                            style={{
                              width: "100%",
                              padding: "0.5rem",
                              fontSize: "1rem",
                              backgroundColor: "blue",
                              color: "white",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => handleSaveAnime(anime.mal_id)}
                          >
                            View Anime
                          </button>
                        </Link>
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

export default SearchAnimeForm;
