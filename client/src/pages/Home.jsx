import React from 'react';

import Login from '../components/LoginForm/Login';
import Signup from '../components/SignupForm/index';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Login />
      <Signup />
      {/* Add your home page content here */}
    </div>
  );
};

export default Home;