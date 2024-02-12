import React from 'react';

import Login from '../components/LoginForm/Login';
import Signup from '../components/SignupForm/index';


const Home = () => {
  return (
    <div>
      <div className="welcome-container" >
      <h1 className="welcome" >Welcome to the anime discovery hub!</h1>
      </div>
      <Login />
      <Signup />
    </div>
  );
};

export default Home;