import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import { GET_ANIMES } from "/../utils/queries";
// import { addToPlanToWatch, addToWatched } from "../../utils/localStorage";

const SingleAnime = () => {
  const { id } = useParams();
  // const { loading, error, data } = useQuery(GET_ANIMES, {
  //   variables: { animeId: id },
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const Anime = data.boardAnime;

  // const handleaddToPlanToWatch = () => {
  //   addToPlanToWatch(Anime.animeId);
  //   alert("Anime added to wishlist!");
  // };

  // const handleaddToWatched = () => {
  //   addToWatched(Anime.animeId);
  //   alert("Anime added to Animes owned!");
  // };

  const [animeDetails, setAnimeDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch anime details by ID
    const fetchAnimeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/full`
        );
        const data = await response.json();
        console.log("Fetched anime details:", data); // Log fetched data
        setAnimeDetails(data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!animeDetails) {
    return <div>Loading...</div>;
  }

  console.log("Anime details:", animeDetails); // Log anime details

  return (
    <div>
      <div>
        <h1>{animeDetails.title}</h1>
        {animeDetails.images && animeDetails.images.jpg && (
          <img
            src={animeDetails.images.jpg.image_url}
            alt={`The cover for ${animeDetails.title}`}
            style={{ width: "100%", height: "auto" }}
          />
        )}
        {animeDetails.genres && animeDetails.genres.length > 0 ? (
          <p>
            Genre: {animeDetails.genres.map((genre) => genre.name).join(", ")}
          </p>
        ) : (
          <p>No genres available</p>
        )}
        <p>Episodes: {animeDetails.episodes}</p>
        <p>Synopsis: {animeDetails.synopsis}</p>
      </div>

      {/* Add to Watch Next button */}
      {/* <button onClick={handleaddToPlanToWatch}>Add to Watch Next</button>

      {/* Add to Animes Watched button */}
      {/* <button onClick={handleaddToWatched}>Add to Watched</button> */}
    </div>
  );
};

export default SingleAnime;
