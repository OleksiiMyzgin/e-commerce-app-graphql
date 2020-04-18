import { gql } from "apollo-boost";

export const GET_CART_HIDDEN = gql`
  query {
    cartHidden @client
  }
`;

export const GET_CART_ITEMS = gql`
  query {
    cartItems @client
  }
`;

export const GET_ITEM_COUNT = gql`
  query {
    itemCount @client
  }
`;

export const GET_CART_TOTAL = gql`
  query {
    cartTotal @client
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    currentUser @client
  }
`;
