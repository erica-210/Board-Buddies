import React from 'react';

import SingleAnimeCard from '../components/SingleAnimeCard';  
import PostForm from "../components/PostForm";

const SingleAnime = () => {
  return (
    <div>
      <div className="welcome-container" >
      <h1 className="welcome" >Welcome to the Single Anime Page</h1>
      </div>
      <SingleAnimeCard />
      <PostForm />
    </div>
  );
};

export default SingleAnime;