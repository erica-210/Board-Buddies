import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import Auth from "../../utils/auth";

const AllPosts = ({posts, title}) => {
  console.log(posts);
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

    return (
      <div>
        <h1>{title}</h1>
        <ul>
          {posts && posts.map((post) => (
            <li key={post._id}>
              <h2>username: {post.user.username} Title:{post.title}</h2>
              <p>{post.content}</p>
              <Link to={`/post/${post._id}`}>View Post</Link>
            </li>
          ))}
        </ul>
      </div>
      
    );
  };

export default AllPosts;
