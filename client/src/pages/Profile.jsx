import React from "react";

import AnimeWatched from "../components/AnimeWatched";
import PostForm from "../components/PostForm";
import AnimeToWatch from "../components/AnimeToWatch";

const Profile = () => {
  return (
    <div>
      <div className="welcome-container" >
      <h1 className="welcome" >Welcome to your Profile Page</h1>
      </div>
      <PostForm />
      <AnimeWatched />
      <AnimeToWatch/>
    </div>
  );
};

export default Profile;
