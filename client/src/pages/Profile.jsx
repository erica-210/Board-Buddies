import React from "react";

import AnimeWatched from "../components/AnimeWatched";
import PostForm from "../components/PostForm";
import AnimeToWatch from "../components/AnimeToWatch";

const Profile = () => {
  return (
    <div>
      <h1>Welcome to your Profile Page</h1>
      <PostForm />
      <AnimeWatched />
      <AnimeToWatch/>
    </div>
  );
};

export default Profile;
