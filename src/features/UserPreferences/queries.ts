import { gql } from "@apollo/client";

export const GET_PLAYER = gql`
  query GetPlayer {
    player {
      id
      name
      balance
      level
      score
      frameUrl
      avatarUrl
      background
    }
  }
`;

export const GET_AVAILABLE_BACKGROUNDS = gql`
  query GetAvailableBackgrounds {
    backgrounds {
      id
      name
      status
      price
      backgroundImageName
    }
  }
`;

export const CHANGE_BACKGROUND = gql`
  mutation ChangeBackground($backgroundId: String!) {
    changeBackground(backgroundId: $backgroundId) {
      background
    }
  }
`;

export const BUY_BACKGROUND = gql`
  mutation BuyBackground($backgroundId: String!) {
    buyBackground(backgroundId: $backgroundId) {
      id
      name
      status
      price
    }
  }
`;
