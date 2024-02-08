import { gql } from '@apollo/client';

// GraphQL query to fetch user data
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      gameCount
      savedGames {
        gameId
        gameName
        creators
        category
        players
        playTime
        description
        gameImage
        gamelink
      }
    }
  }
`;

export const QUERY_POSTS = gql`
query posts($username: String) {
  posts(username: $username) {
    _id
    title
    content
    username
  }
}
`;

export const QUERY_SINGLE_POST = gql`
query getSinglePost($postId: ID!) {
  post(postId: $postId) {
    _id
    title
    content
    username
    comments {
      _id
      commentText
      username
    }
  }
}
`;