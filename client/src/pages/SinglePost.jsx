import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { GET_POST_BY_ID } from "../utils/queries";
import { useState } from "react";

import SinglePostCard from "../components/SinglePostCard";

const SinglePost = () => {
  const { loading, data } = useQuery(GET_POST_BY_ID);
  const post = data?.post || {};

  return (
    <div>
      <div className="welcome-container">
        <h1 className="welcome">Welcome to the Single Post Page</h1>
      </div>
      <SinglePostCard />
    </div>
  );
};

export default SinglePost;
