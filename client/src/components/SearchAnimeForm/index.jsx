import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_ANIME } from "../../utils/mutations";
import { GET_ANIMES } from "../../utils/queries";
import { saveAnimeIds, getSavedAnimeIds } from "../../utils/localStorage";

const SearchAnimeForm = () => {
  const [searchInput, setSearchInput] = useState("");
  const [savedAnimeIds, setSavedAnimeIds] = useState(getSavedAnimeIds());
  const { loading, error, data } = useQuery(GET_ANIMES, {
    variables: { title: searchInput }
  });
  
  console.log(data);

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
      setSearchInput(""); // Clear the search input
    } catch (err) {
      console.error("An error occurred while searching for animes:", err);
    }
  };

  const handleSaveAnime = async (animeId) => {
    if (!data || !Array.isArray(data.anime)) {
      console.error("No anime data available");
      return;
    }

    // find the anime in `data.anime` by the matching id
    const animeToSave = data.anime.find((anime) => anime.mal_id === animeId);

    // If animeToSave is not found, log an error and return
    if (!animeToSave) {
      console.error("Anime not found");
      return;
    }

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      console.error("User is not logged in. Unable to save anime.");
      return false;
    }

    try {
      // Execute the SAVE_ANIME mutation
      const { data } = await saveAnimeMutation({
        variables: { anime_id: animeToSave.mal_id },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }

      console.log("anime saved successfully:", animeToSave);

      // if anime successfully saved to user's account, update savedAnimeIds state
      setSavedAnimeIds([...savedAnimeIds, animeToSave.mal_id]);
    } catch (err) {
      console.error("An error occurred while saving the anime:", err);
    }
  };

  // const query = "naruto"; // Example query string
  // fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('There was a problem with the fetch operation:', error);
  //   });

  return (
    <div>
      <div
        style={{
          color: "white",
          backgroundColor: "#001433",
          padding: "1rem",
          borderRadius: "8px",
        }}
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
                  backgroundColor: "#31552a",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Submit Search
              </button>
            </div>
          </form>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {/* {console.log(error.message)} */}
        </div>
      </div>

      <div>
        <h2 style={{ paddingTop: "1.25rem" }}>
          {data &&
            data.anime &&
            data.anime.length > 0 &&
            `Viewing ${data.anime.length} results: `}
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data &&
            data.anime &&
            data.anime.map((anime) => {
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
                        {anime.genres.length > 0
                          ? anime.genres.map((genre) => genre.name).join(", ")
                          : "No genres available"}
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
