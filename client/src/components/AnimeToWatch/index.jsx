import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSavedAnimeData } from "../../utils/localStorage";
import { Select } from 'antd';

const { Option } = Select;

const AnimeToWatch = () => {
  // State to store the list of anime watched
  const [planToWatchAnime, setPlanToWatchAnime] = useState([]);

  // State to store the selected anime in the dropdown
  const [selectedAnimeId, setSelectedAnimeId] = useState("");

  // Load anime watched from local storage on component mount
  useEffect(() => {
    const savedAnimeData = getSavedAnimeData();
    console.log("Saved anime data:", savedAnimeData);
    setPlanToWatchAnime(savedAnimeData.planToWatch);
  }, []);

  const handleSelectChange = (value) => {
    setSelectedAnimeId(value);
  };

  return (
    <div>
      <h2>Watch Next</h2>
      <Select
        value={selectedAnimeId}
        onChange={handleSelectChange}
        style={{
          width: 200,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, .5)",
          borderRadius: "10px",
        }}>
        <Option value="">Select an anime</Option>
        {planToWatchAnime.map((animeId, index) => (
          <Option key={index} value={animeId}>
            <Link to={`/anime/${animeId}`}>{animeId}</Link>
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default AnimeToWatch;