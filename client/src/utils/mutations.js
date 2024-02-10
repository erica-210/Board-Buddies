import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOARD_GAME = gql`
  mutation saveBoardGame($gameData: ID!) {
    saveBoardGame(gameData: $gameData) {
      _id
      username
      savedGames {
        gameId
        gameName
      }
    }
  }
`;

export const REMOVE_BOARD_GAME = gql`
  mutation removeBoardGame($gameId: ID!) {
    removeBoardGame(gameId: $gameId) {
      _id
      username
      savedGames {
        gameId
        gameName
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($commentText: String!) {
    addPost(commentText: $commentText) {
      postId
      title
      content
      
      comments {
        CommentId
        commentText
        user {
          _id
          username
        }
      }
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: String!) {
    removePost(postId: $postId) {
      postId
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      postId
      comments {
        CommentId
        commentText
        user {
          _id
          username
        }
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      postId
      comments {
        CommentId
      }
    }
  }
`;