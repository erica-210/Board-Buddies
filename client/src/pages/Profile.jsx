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
        <Col span={12}>
          <Divider orientation="left">
            <h2 className="userinfo">My Anime</h2>
          </Divider>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {/* <h2 className="userinfo">{props.username}</h2> */}
            <div className="dropdowns">
              <AnimeWatched />
              <AnimeToWatch />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <Divider orientation="left">
            <h2>Make a Post</h2>
          </Divider>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <PostForm />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Profile;