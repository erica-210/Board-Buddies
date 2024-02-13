import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_COMMENT } from "../../utils/mutations";
import { QUERY_POSTS, GET_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import { Typography, Button, Form, Input, } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

const PostForm = () => {
  const [formState, setFormState] = useState({ title: "", content: "" });
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error: postError }] = useMutation(ADD_POST, {
    refetchQueries: ["posts", "me"],
  });

  const [addComment, { error: commentError }] = useMutation(ADD_COMMENT, {
    refetchQueries: ["posts", "me"],
  });

  const handleFormSubmit = async () => {
    try {
      await addPost({
        variables: {
          title: formState.title,
          content: formState.content,
          user: Auth.getProfile().data._id,
          username: Auth.getProfile().data.username,
        },
      });
      setFormState({ title: "", content: "" });
      setCharacterCount(0);
    } catch (err) {
      console.error("An error occurred while adding your post:", err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "content") {
      setFormState((prevState) => ({
        ...prevState,
        content: value,
      }));
      setCharacterCount(value.length);
    } else if (name === "title") {
      setFormState((prevState) => ({
        ...prevState,
        title: value,
      }));
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || postError ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <Form onFinish={handleFormSubmit}>
            <Form.Item>
              <Input
                name="title"
                placeholder="Post Title (required)"
                value={formState.title}
                onChange={handleChange}
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, .5)" }}
              />
            </Form.Item>
            <Form.Item>
              <Input.TextArea
                name="content"
                placeholder="What's on your mind? (required)"
                value={formState.content}
                onChange={handleChange}
                autoSize={{ minRows: 3, maxRows: 6 }}
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, .5)" }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, .5)" }}
              >
                Add Post
              </Button>
            </Form.Item>
          </Form>
          {(postError || commentError) && (
            <p className="bg-danger text-white p-3">
              {postError ? postError.message : commentError.message}
            </p>
          )}
        </>
      ) : (
        <p>You need to be logged in to share your thoughts.</p>
      )}
    </div>
  );
};

export default PostForm;
