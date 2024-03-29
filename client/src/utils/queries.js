import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      email
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
          name
        }
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

export const meBasic = gql`
  {
    meBasic {
      _id
      username
      email
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
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
          name
        }
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
  query getPostById($_id: ID!) {
    postById(_id: $_id) {
      _id
      title
      content
      user {
        username
      }
      
    }
  }
`;

export const GET_ANIMES = gql`
  query getSearchAnime($name: String!) {
    searchAnime(name: $name) {
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
        name
      }
    }
  }
`;

export const GET_ANIME_BY_ID = gql`
  query getAnime($animeId: ID!) {
    anime(animeId: $animeId) {
      episodes
      genres {
        mal_id
        name
      }
      images {
        jpg {
          image_url
        }
      }
      score
      mal_id
      synopsis
      title
    }
  }
`;
