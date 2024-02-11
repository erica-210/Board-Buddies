import React from "react";

<<<<<<< HEAD
import SearchGameCard from "../components/SearchGameForm";

const SearchGames = () => {
  return (
    <div>
      <h1>Welcome to the Search Games Page</h1>
      <SearchGameCard />
=======

import Auth from "../utils/auth";
import { saveAnimeIds, getSavedAnimeIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_ANIME } from "../utils/mutations";
import { searchAnimeByName } from "../utils/API";

const SearchAnimes = () => {
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
      // Search for Animes by name using the API function
      const animeData = await searchAnimeByName(searchInput);

      console.log("Anime data:", animeData);
  
      setSearchedAnimes(animeData);
      setSearchInput("");
    } catch (err) {
      console.error("An error occurred while searching for Animes:", err);
    }
  };
  
  const handleSaveAnime = async (AnimeId) => {
    // find the Anime in `searchedAnimes` state by the matching id
    const AnimeToSave = searchedAnimes.find((anime) => anime.animeId === AnimeId);
  
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
  
    if (!token) {
      console.error("User is not logged in. Unable to save anime.");
      return false;
    }
  
    try {
      // Execute the SAVE_Animemutation
      const { data } = await saveAnimeMutation({
        variables: { Anime: AnimeToSave },
      });
  
      if (!data) {
        throw new Error("something went wrong!");
      }
  
      console.log("Anime saved successfully:", AnimeToSave);
  
      // if book successfully saves to user's account, save Anime id to state
      setSavedAnimeIds([...savedAnimeIds, AnimeToSave.AnimeId]);
    } catch (err) {
      console.error("An error occurred while saving the Anime:", err);
    }
  };
  

  return (
    <div>
      <h1>Welcome to the Search Animes Page</h1>
      <div style={{ color: "white", backgroundColor: "black", padding: "1rem" }}>
        <div>
          <h1>Search for Animes!</h1>
          <form onSubmit={handleFormSubmit}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                style={{ width: "80%", padding: "0.5rem", fontSize: "1.25rem" }}
                placeholder="Search for a Anime"
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
            : "Search for a Anime to begin"}
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
  {console.log("Searched Animes:", searchedAnimes)}
  {searchedAnimes && searchedAnimes.map((anime) => { // Guard against searchedAnimes being null or undefined
    return (
              <div key={anime.animeId} style={{ width: "calc(33.33% - 1rem)", margin: "0.5rem" }}>
                <div style={{ border: "1px solid black" }}>
                  {anime.animeImage && (
                    <img
                      src={anime.animeImage}
                      alt={`The cover for ${anime.animeName}`}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  <div style={{ padding: "1rem" }}>
                    <h3>{anime.animeName}</h3>
                    <p>
                      Creators: {anime.creators}<br />
                      Category: {anime.category}<br />
                      Players: {anime.players}
                    </p>
                    <p>{anime.description}</p>
                    {Auth.loggedIn() && (
                      <button
                        disabled={savedAnimeIds?.some((savedAnimeId) => savedAnimeId === anime.animeId)}
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          fontSize: "1rem",
                          backgroundColor: "blue",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSaveAnime(anime.animeId)}
                      >
                        {savedAnimeIds?.some((savedAnimeId) => savedAnimeId === anime.animeId)
                          ? "This Anime has already been saved!"
                          : "Save this Anime!"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
>>>>>>> f007ff9c40ea03384b4cc60699e684dd220e0e46
    </div>
  );
};

export default SearchAnimes;
