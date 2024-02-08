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