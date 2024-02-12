import React from 'react';

import AllPosts from '../components/AllPosts';

const Thread = () => {
  return (
    <div>
      <div className="welcome-container" >
      <h1 className="welcome" >Welcome to the Thread Page</h1>
      </div>
      <AllPosts />
    </div>
  );
};

export default Thread;