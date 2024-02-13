import { useState } from "react";
// import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth.js";
import { ADD_USER } from "../../utils/mutations.js";
import { Typography, Button, Form, Input, Row } from "antd";

const { Title } = Typography;

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Row gutter={[16, 16]}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title level={3}>Signup</Title>
        <Form
          name=""
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleFormSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email address!" },
            ]}
          >
            <Input
              placeholder="Enter email address"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, .5)" }}
            />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your email address!" },
            ]}
          >
            <Input
              placeholder="Enter username"
              name="username"
              type="username"
              id="username"
              onChange={handleChange}
              style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, .5)" }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="**********"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, .5)" }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                color: "black",
                boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.5)",
                transition: "background-color 0.3s, color 0.3s, box-shadow .5s",
              }}
              className="custom-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Row>
  );
}

export default Signup;
