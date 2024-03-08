import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "../../utils/queries";
// import { addToPlanToWatch, addToWatched } from "../../utils/localStorage";

const SingleAnime = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ANIME_BY_ID, {
    variables: { animeId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

   // Check if data exists and has animeById property
   if (!data || !data.animeById) {
    return <p>No data available for this anime.</p>;
  }

  const { animeById } = data;

  // Check if animeById has the expected properties
  if (!animeById.title) {
    return <p>No title available for this anime.</p>;
  }

  console.log("Anime details:", animeById ); // Log anime details

  return (
    <div>
      <div>
        <h1>{animeById.title}</h1>
        {animeById.images && animeById.images.jpg && (
          <img
            src={animeById.images.jpg.image_url}
            alt={`The cover for ${animeById.title}`}
            style={{ width: "100%", height: "auto" }}
          />
        )}
        {animeById.genres && animeById.genres.length > 0 ? (
          <p>
            Genre: {animeById.genres.map((genre) => genre.name).join(", ")}
          </p>
        ) : (
          <p>No genres available</p>
        )}
        <p>Episodes: {animeById.episodes}</p>
        <p>Synopsis: {animeById.synopsis}</p>
      </div>

      {/* Add to Watch Next button */}
      {/* <button onClick={handleaddToPlanToWatch}>Add to Watch Next</button>

      {/* Add to Animes Watched button */}
      {/* <button onClick={handleaddToWatched}>Add to Watched</button> */}
    </div>
  );
};

export default SingleAnime;
