import React from 'react';

import Login from '../components/LoginForm/Login';
import Signup from '../components/SignupForm/index';
import { Typography } from "antd";

const { Title } = Typography;


const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
    <div>
      <div className="welcome-container" >
      <h1 className="welcome" >Welcome to the anime discovery hub!</h1>
      </div>
      <Login />
      <Signup />
    </div>
    </div>
  );
};

export default Home;