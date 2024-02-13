import React from "react";

import SearchAnimeForm from "../components/SearchAnimeForm";
import AnimeDetails from "../components/AnimeDetail";

const SearchAnimes = () => {
  return (
    <div>
      <div className="welcome-container" >
      <h1 className="welcome" >Welcome to the Search Anime Page</h1>
      </div>
      <SearchAnimeForm />
      <AnimeDetails />
    </div>
  );
};

export default SearchAnimes;
