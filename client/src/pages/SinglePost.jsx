import React from 'react';

import SinglePostCard from '../components/SinglePostCard';

const SinglePost = () => {
  return (
    <div>
      <div className="welcome-container" >
      <h1 className="welcome" >Welcome to the Single Post Page</h1>
      </div>
      <SinglePostCard />
    </div>
  );
};

export default SinglePost;