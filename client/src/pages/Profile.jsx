import React from "react";

import WishList from "../components/WishList";
// import CommentForm from '../components/CommentForm';
import PostForm from "../components/PostForm";


const Profile = () => {
  return (
    <div >
      <h1>Welcome to the Profile Page</h1>
      
      <WishList />
      {/* <CommentForm /> */}
      <PostForm />
    </div>
  );
};

export default Profile;
