import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const SideNav = (props) => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {Auth.loggedIn() ? (
        <div className="sidenav" style={{ width: "20%", paddingTop: "20px" }}>
          <Link to="/profiles/username">Profile</Link>
          <Link to="/search">Search BoardGames</Link>
          <Link to="/saved">Saved Games</Link>
          <a onClick={Auth.logout}>Logout</a>
        </div>
      ) : (
        <div onClick={() => setShowModal(true)}>Login/Sign Up</div>
      )}
    </>
  );
};

export default SideNav;
