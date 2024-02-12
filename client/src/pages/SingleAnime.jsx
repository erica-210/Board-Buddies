import React from 'react';

import SingleAnimeCard from '../components/SingleAnimeCard';  

const SingleAnime = () => {
  return (
    <div>
      <div className="welcome-container" >
      <h1 className="welcome" >Welcome to the Single Anime Page</h1>
      </div>
      <SingleAnimeCard />
    </div>
  );
};

export default SingleAnime;