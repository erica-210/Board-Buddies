import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
        $username: String!
        $email: String!
        $password: String!
  ) {
    addUser(
        username: $username
        email: $email
        password: $password
    ) {
      token
      user {
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
  }
`;

export const SAVE_GAME = gql`
  mutation saveGame($game: savedGameInput!) {
    saveGame(game: $game) {
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

export const REMOVE_GAME = gql`
  mutation removeGame($gameId: ID!) {
    removeGame(gameId: $gameId) {
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

export const ADD_POST = gql`
  mutation addPost($title: String!, $user: String!) {
    addPost(title: $title, user: $user) {
      _id
      title
      content
      user {
        _id
        username
      }
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      content
      user {
        _id
        username
      }
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      _id
      content
      user {
        _id
        username
      }
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;