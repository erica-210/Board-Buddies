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
  query posts {
    post {
      title
      content
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

export const GET_ANIME = gql`
  query GetAnime($id: ID!) {
    anime(id: $id) {
      title
      images {
        jpg {
          image_url
          small_image_url
          large_image_url
        }
      webp {
        image_url
        small_image_url
        large_image_url
      }
    }
      episodes
      synopsis
      genres {
        name
      }
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
