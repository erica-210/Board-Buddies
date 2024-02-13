import React from "react";

import SearchAnimeForm from "../components/SearchAnimeForm";

const SearchAnimes = () => {
  return (
    <div>
      <div className="welcome-container">
        <h1 className="welcome">Welcome to the Search Anime Page</h1>
      </div>
      <SearchAnimeForm />
    </div>
  );
};

export default SearchAnimes;
