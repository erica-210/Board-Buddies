import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_COMMENT } from "../../utils/mutations";
import { QUERY_POSTS, GET_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

const PostForm = () => {
  const [postText, setPostText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error: postError }] = useMutation(ADD_POST, {
    refetchQueries: [QUERY_POSTS, "posts", GET_ME, "me"],
  });

  const [addComment, { error: commentError }] = useMutation(ADD_COMMENT, {
    refetchQueries: [QUERY_POSTS, "posts", GET_ME, "me"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
   // Check if the user is logged in
   if (!Auth.loggedIn()) {
    console.error("User is not logged in. Please log in to post.");
    return;
  }

// Inside your component:
const userData = Auth.getProfile().data;

// Example usage:
console.log("User data:", userData);
    try {
      const { data } = await addPost({
       
        variables: {
          title: "New Post Title", // Add title field
          commentText: postText, // Rename variable to commentText
            
        },
      });
      console.log("Post added successfully:", data);

      if (postText) {
        await addComment({
          variables: {
            postId: data.addPost.postId,
            commentText: postText,
          },
        });
        console.log("Comment added successfully for post:", data.addPost.postId);
      }

      setPostText("");
      setCharacterCount(0); // Reset character count after successful submission
    } catch (err) {
        console.error("An error occurred while adding the post:", err.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" && value.length <= 280) {
        console.log("Post text changed:", value);
      setPostText(value);
      setCharacterCount(value.length);
    }
  };

  //   const username = Auth.getProfile().data.username;
  //   console.log('Username:', username);

  const profileData = Auth.getProfile().data;
  console.log("Profile Data:", profileData);

  return (
    <div>
      <h3>What do you have to say about this board game?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || postError ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="postText"
                placeholder="Here's a new thought..."
                value={postText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Post
              </button>
             </div>
            {(postError || commentError) && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {postError ? postError.message : commentError.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>You need to be logged in to share your thoughts.</p>
      )}
    </div>
  );
};

export default PostForm;
