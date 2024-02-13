import React from "react";

import Login from "../components/LoginForm/Login";
import Signup from "../components/SignupForm/index";
import { Row, Typography, Col } from "antd";
import meme from "../assets/code-meme.jpg";

const { Title } = Typography;

const Home = () => {
  return (
    <div className="homepage">
      <div>
        <div className="welcome-container">
          <h1 className="welcome">Welcome to the anime discovery hub!</h1>
        </div>
        <div className="login-signup">
          <Row>
            <div>
              <Col span={18} className="meme">
                <img
                  id="meme-image meme-overlay"
                  src={meme}
                  alt="meme"
                  style={{ width: "100%", height: "100%" }}
                />
              </Col>
            </div>

            <Col span={6} className="forms">
              <Login />
              <Signup />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
