import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const SideNav = () => {
  

  return (
    <>
      
        <div className="sidenav" >
          <Link to="/profile">Profile</Link>
          <Link to="/thread">Thread</Link>
          <a href="#section" onClick={Auth.logout}>
            Logout
          </a>
        </div>
  
    </>
  );
};

export default SideNav;
