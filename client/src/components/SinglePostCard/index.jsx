import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST_BY_ID, GET_ME } from "../../utils/queries";
import { ADD_COMMENT } from "../../utils/mutations";

const SinglePost = () => {
  const { postId } = useParams();
  const { loading, error, data } = useQuery( GET_POST_BY_ID, {
    variables: { _id: postId},
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const posts =  data?.postById || {};


  return (
    <div>
      {posts && posts.map((post) => (
      <><h1 key={post._id}>{post.title}</h1>
      <p>{post.content}</p></>
      ))};
      <h2>Comments</h2>
      <ul>
        {post.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <CommentForm onSubmit={handleAddComment} />
    
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
