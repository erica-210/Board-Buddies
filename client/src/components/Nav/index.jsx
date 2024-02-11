import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const SideNav = (props) => {
  // set modal display state

  return (
    <>
      
        <div className="sidenav" style={{ width: "20%", paddingTop: "20px" }}>
          <Link to="/profile">Profile</Link>
          <Link to="/search">Search</Link>
          <Link to="/thread">Thread</Link>
          <a href="#section" onClick={Auth.logout}>
            Logout
          </a>
        </div>
  
    </>
  );
};

export default SideNav;
