import React from "react";

import WishList from "../components/WishList";
import PostForm from "../components/PostForm";
// import GamesOwned from "../components/GamesOwned";

const Profile = () => {
  return (
    <div>
      <h1>Welcome to the Profile Page</h1>
      {/* <GamesOwned /> */}
      <WishList />
      <PostForm />
    </div>
  );
};

export default Profile;
