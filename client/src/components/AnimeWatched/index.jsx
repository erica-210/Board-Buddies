import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSavedAnimeData } from "../../utils/localStorage";
import { Select } from "antd";

const { Option } = Select;

const AnimeWatched = () => {
  // State to store the list of anime watched
  const [animeWatched, setAnimeWatched] = useState([]);

  // State to store the selected anime in the dropdown
  const [selectedAnimeId, setSelectedAnimeId] = useState("");

  // Load anime watched from local storage on component mount
  useEffect(() => {
    const savedAnimeData = getSavedAnimeData();
    console.log("Saved anime data:", savedAnimeData);
    setAnimeWatched(savedAnimeData.watched);
  }, []);

  const handleSelectChange = (value) => {
    setSelectedAnimeId(value);
  };


  return (
    <div>
      <h2>Watched Anime</h2>
      <Select value={selectedAnimeId} onChange={handleSelectChange} style={{ width: 200 }}>
        <Option value="">Select an anime</Option>
        {animeWatched.map((animeId, index) => (
          <Option key={index} value={animeId}>
            <Link to={`/anime/${animeId}`}>{animeId}</Link>
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default AnimeWatched;
