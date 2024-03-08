import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "../../utils/queries";

const SingleAnime = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ANIME_BY_ID, {
    variables: { animeId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.anime) {
    return <p>No data available for this anime.</p>;
  }

  const { anime } = data;

  return (
    <div>
      <h1>{anime.title}</h1>
      <img src={anime.images.jpg.image_url} alt={anime.title} />
      <p>Episodes: {anime.episodes}</p>
      <p>Synopsis: {anime.synopsis}</p>
      {/* Display other anime details */}
    </div>
  );
};

export default SingleAnime;
