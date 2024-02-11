import React from 'react';

import Login from '../components/LoginForm/Login';
import Signup from '../components/SignupForm/index';


const Home = () => {
  return (
    <div>
      <h1>Welcome to the board game discovery hub!</h1>
      <Login />
      <Signup />
    </div>
  );
};

export default Home;