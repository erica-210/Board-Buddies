import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "../../utils/queries";
import { Button, Divider } from "antd";
import { addToWatched, addToPlanToWatch } from "../../utils/localStorage";

const SingleAnime = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ANIME_BY_ID, {
    variables: { animeId: id },
  });

  const [message, setMessage] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.anime) {
    return <p>No data available for this anime.</p>;
  }

  const { anime } = data;

  const handleAddToWatched = () => {
    addToWatched(anime.mal_id);
    console.log(`Anime "${anime.title}" added to Watched.`);
    // Display confirmation message
    setMessage(`Anime "${anime.title}" added to Watched.`);
  };

  const handleAddToPlanToWatch = () => {
    addToPlanToWatch(anime.mal_id);
    console.log(`Anime "${anime.title}" added to Watch Next.`);
    // Display confirmation message
    setMessage(`Anime "${anime.title}" added to Watch Next.`);
  };

  return (
    <div>
      <div className="single-anime">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          style={{ width: "300px", height: "auto" }}
        />
        <div className="info-card">
          <h1>{anime.title}</h1>
          <p>Episodes: {anime.episodes}</p>
          <p>Score: {anime.score}</p>
          {anime.genres && anime.genres.length > 0 ? (
            <p>Genre: {anime.genres.map((genre) => genre.name).join(", ")}</p>
          ) : (
            <p>No genres available</p>
          )}
          <p>Synopsis: {anime.synopsis}</p>
        </div>
      </div>
      <div className="anime-buttons">
        <Button
          type="primary"
          htmlType="submit"
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, .5)" }}
          onClick={handleAddToWatched}
        >
          Save to Watched
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, .5)" }}
          onClick={handleAddToPlanToWatch}
        >
          Save to Watch Next
        </Button>
      </div>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      <div className="anime-thread"></div>
      <Divider orientation="left">
        <h2>Make a Post About {anime.title}</h2>
      </Divider>
    </div>
  );
};

export default SingleAnime;
