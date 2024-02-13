import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { QUERY_POSTS } from '../utils/queries';
import { useState } from 'react';



import SinglePostCard from '../components/SinglePostCard';

const SinglePost = () => {

  const { id } = useParams();

  const [currentPost, setCurrentPost] = useState({});

  const { loading, data } = useQuery(QUERY_POSTS);
  
  const post = data?.post || {};

 


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