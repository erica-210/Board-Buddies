import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ANIMES } from "../../utils/queries";
import { addToPlanToWatch, addToWatched } from "../../utils/localStorage";

const SingleAnime = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ANIMES, {
    variables: { animeId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const Anime = data.boardAnime;

  const handleaddToPlanToWatch = () => {
    addToPlanToWatch(Anime.animeId);
    alert("Anime added to wishlist!");
  };

  const handleaddToWatched = () => {
    addToWatched(Anime.animeId);
    alert("Anime added to Animes owned!");
  };

  return (
    <div>
      <h1>{Anime.title}</h1>
      <img src={Anime.images.large_image_url} alt={Anime.title} />
      {/* <p>Creators: {Anime.creators.join(", ")}</p> */}
      <p>Genre: {Anime.genres}</p>
      <p>Episodes: {Anime.episodes}</p>
      <p>Synopsis: {Anime.synopsis}</p>
      {/* <a href={Anime.AnimeLink} target="_blank" rel="noopener noreferrer">View Anime</a> */}
      
      {/* Add to Watch Next button */}
      <button onClick={handleaddToPlanToWatch}>Add to Watch Next</button>
      
      {/* Add to Animes Watched button */}
      <button onClick={handleaddToWatched}>Add to Watched</button>
    </div>
  );
};

export default SingleAnime;
