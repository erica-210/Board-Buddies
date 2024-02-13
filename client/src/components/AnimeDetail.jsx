import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ANIME } from "../utils/queries";

const AnimeDetail = ({ mal_id}) => {
    const { loading, data, error } = useQuery(GET_ANIME, {
        variables: { id: mal_id },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong! {error.message}</div>;
   
    const { anime } = data;

    return (
        <div className="anime-details">
            <h1>{anime.title}</h1>
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            <p>{anime.synopsis}</p>
            <p>Episodes: {anime.episodes}</p>   
            <ul>
                {anime.genres && anime.genres.map((genre) => (
                    <li key={genre.name}>{genre.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AnimeDetail;
