import { ApolloClient } from "apollo-boost";
import { TCartItem } from "../interfaces";

export type Context = {
  cache: ApolloClient<any>;
};

export type CartHiddenQuery = {
  cartHidden: boolean;
};

export type CartItemsQuery = {
  cartItems: TCartItem[];
};
