import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
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
        recommendedAge
        description
        gameImage
        gamelink
      }
      posts {
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
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      _id
      username
      email
      gameCount
      savedGames {
        gameId
        gameName
      }
      posts {
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
  }
`;

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
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

export const GET_POST_BY_ID = gql`
  query postById($postId: ID!) {
    postById(postId: $postId) {
      postId
      title
      content
      user {
        _id
        username
      }
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

export const GET_BOARD_GAMES = gql`
  query boardGames($username: String) {
    boardGames(username: $username) {
      gameId
      gameName
      creators
      category
      players
      playTime
      recommendedAge
      description
      gameImage
      gamelink
    }
  }
`;

export const GET_BOARD_GAME_BY_ID = gql`
  query boardGameById($gameId: ID!) {
    boardGameById(gameId: $gameId) {
      gameId
      gameName
      creators
      category
      players
      playTime
      recommendedAge
      description
      gameImage
      gamelink
    }
  }
`;
