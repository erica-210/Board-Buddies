import { gql } from "@apollo/client";

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

export const SAVE_ANIME = gql`
  mutation saveAnime($animeData: AnimeInput!) {
    saveAnime(animeData: $animeData) {
      _id
      username
      savedAnime {
        mal_id
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
          mal_id
          name
        }
      }
    }
  }
`;

export const REMOVE_ANIME = gql`
  mutation removeAnime($animeId: ID!) {
    removeAnime(animeId: $animeId) {
      mal_id
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
        mal_id
        name
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      _id
      user
      title
      content
      comments {
        CommentId
        commentText
        user {
          _id
        }
        post {
          _id
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
