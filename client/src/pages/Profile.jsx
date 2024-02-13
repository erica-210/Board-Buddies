import React from "react";
import { Col, Row, Divider } from "antd";

import AnimeWatched from "../components/AnimeWatched";
import PostForm from "../components/PostForm";
import AnimeToWatch from "../components/AnimeToWatch";
import Auth from "../utils/auth";

import { useQuery } from "@apollo/client";
import { meBasic } from "../utils/queries";


const Profile = () => {

  const { loading, data } = useQuery(meBasic);
  const users = data?.meBasic || {};
  console.log(users);

  const user = Auth.getProfile().data._id;
  const user_id = `"${user}"`;
  

  if (loading) {
    return <div>Loading...</div>;
  }

 return (
    <>
      <div className="welcome-container">
        <h1 className="welcome">Welcome to your Profile Page</h1>
      </div>
      <Row className="profilepage">
        <Col span={8} className="sidecard">
          <Divider orientation="center">
            <h2 className="userinfo">User Info Here</h2>
          </Divider>

          <h2 className="userinfo"></h2>
          
          <div className="dropdowns">
            <AnimeWatched />
            <AnimeToWatch />
          </div>
        </Col>
        <Col span={12} className="postcard">
          <Divider orientation="left">
            <h2>User Posts</h2>
          </Divider>

          <PostForm />
        </Col>
      </Row>
    </>
  );
};

export default Profile;