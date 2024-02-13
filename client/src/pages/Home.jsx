import React from 'react';

import Login from '../components/LoginForm/Login';
import Signup from '../components/SignupForm/index';
import { Typography } from "antd";

const { Title } = Typography;


const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
    <div>
      <Title>Welcome to the anime discovery hub!</Title>
      <Login />
      <Signup />
    </div>
    </div>
  );
};

export default Home;