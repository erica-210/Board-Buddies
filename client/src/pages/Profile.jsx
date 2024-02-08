import React from 'react';

import Login from '../components/LoginForm/Login';
import Signup from '../components/SignupForm/index';

const Profile = () => {
  return (
    <div>
      <h1>Welcome to the Profile Page</h1>
      <Login />
      <Signup />
    </div>
  );
};

export default Profile;