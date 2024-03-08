import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST_BY_ID, GET_USERS } from "../../utils/queries";
// import { ADD_COMMENT } from "../../utils/mutations";

const SinglePost = () => {
  const { _id } = useParams();
  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: { _id },
  });

  // const [addCommentMutation] = useMutation(ADD_COMMENT);

  // const handleAddComment = async (comment) => {
  //   try {
  //     await addCommentMutation({
  //       variables: { postId, comment },
  //       refetchQueries: [{ query: GET_POST_BY_ID, variables: { postId } }],
  //     });
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  console.log("Data:", data); // Log the fetched data

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.postById) return <p>No post data available</p>;

  const { postById: post } = data;

  return (
    <div>
      <h1>{post.title}</h1>
      <h2>username: {post.user.username}</h2>
      <p>{post.content}</p>

      {/* <h2>Comments</h2>
    <ul>
      {post.comments.map((comment) => (
        <li key={comment._id}>{comment.content}</li>
      ))}
    </ul> */}
    </div>
  );
};
// const CommentForm = ({ onSubmit }) => {
//   const [commentText, setCommentText] = useState("");

//   const handleChange = (event) => {
//     setCommentText(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSubmit(commentText);
//     setCommentText("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={commentText}
//         onChange={handleChange}
//         placeholder="Add your comment..."
//       />
//       <button type="submit">Submit Comment</button>
//     </form>
//   );
// };

export default SinglePost;
