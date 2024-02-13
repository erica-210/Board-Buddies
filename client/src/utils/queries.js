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
  query Post {
    Post {
      _id
      title
      content
      user {
        username
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

export const GET_ANIMES = gql`
  query anime($username: String) {
    anime(username: $username) {
      mal_id
      title
      images
      episodes
      synopsis
      genres
    }
  }
`;

export const GET_ANIME_BY_ID = gql`
  query animeById($animeId: ID!) {
    animeById(animeId: $animeId) {
      mal_id
      title
      images
      episodes
      synopsis
      genres
    }
  }
`;
