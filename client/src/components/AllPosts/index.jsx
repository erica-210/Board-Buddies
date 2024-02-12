import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";

const AllPosts = () => {
    const { loading, error, data } = useQuery(QUERY_POSTS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <h1>All Posts</h1>
        <ul>
          {data.posts && data.posts.map((post) => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <Link to={`/singlepost/${post.postId}`}>View Post</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default AllPosts;
