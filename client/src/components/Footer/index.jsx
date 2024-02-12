import React from "react";
import { GithubOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="footer" >
      <div className="container text-center mb-5">
        <div>
          <h4>
            Made with{" "}
            <span
              className="emoji"
              role="img"
              aria-label="heart"
              aria-hidden="false"
            >
              ❤️
            </span>{" "}
            by the <a className="teamname">Mighty Coding Program Rangers!</a>
          </h4>
          <h1>
          <GithubOutlined />
            <a href="https://github.com/erica-210">
              <strong>Erica San Miguel</strong>
            </a>
            <GithubOutlined />
            <a href="https://github.com/Lunafish01">
              <strong>Joshua Luna</strong>
            </a>
            <GithubOutlined />
            <a href="https://github.com/DamascusKraken">
              <strong>Nicholas Canchola</strong>
            </a>
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
