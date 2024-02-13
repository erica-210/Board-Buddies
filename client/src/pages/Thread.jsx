import React from 'react';

import AllPosts from '../components/AllPosts';

import { QUERY_POSTS } from '../utils/queries'; 
import { useQuery } from '@apollo/client';


const Thread = () => {

  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.Post || [];
  console.log(posts);
  

  return (
    <div>
      <div className="welcome-container" >
      <h1 className="welcome" >Welcome to the Thread Page</h1>
      </div>
      {loading ? ( <div>Loading...</div> 
      ) : (
          <AllPosts 
         posts={posts} 
         title = {"This is all Post!"}
        />
        )}
    </div>
  );
};

export default Thread;