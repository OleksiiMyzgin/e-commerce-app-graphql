import { ApolloClient } from "apollo-boost";

import {
  addItemToCart,
  removeItemFromCart,
  getCartItemCount,
  getCartTotal,
  clearItemFromCart,
} from "./utils";
import { TCartItem, UserData } from "../interfaces";
import { Context, CartHiddenQuery, CartItemsQuery } from "./types";
import {
  GET_CART_HIDDEN,
  GET_CART_ITEMS,
  GET_ITEM_COUNT,
  GET_CART_TOTAL,
  GET_CURRENT_USER,
} from "./queries";

const updateCartItemsRelatedQueries = (
  cache: ApolloClient<any>,
  newCartItems: TCartItem[],
) => {
  cache.writeQuery({
    query: GET_ITEM_COUNT,
    data: { itemCount: getCartItemCount(newCartItems) },
  });

  cache.writeQuery({
    query: GET_CART_TOTAL,
    data: { cartTotal: getCartTotal(newCartItems) },
  });

  cache.writeQuery({
    query: GET_CART_ITEMS,
    data: { cartItems: newCartItems },
  });
};

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root: any, _args: any, { cache }: Context) => {
      const data = cache.readQuery<CartHiddenQuery>({
        query: GET_CART_HIDDEN,
      });

      if (!data) return;
      const { cartHidden } = data;

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });

      return !cartHidden;
    },

    addItemToCart: (
      _root: any,
      { item }: { item: TCartItem },
      { cache }: Context,
    ) => {
      const data = cache.readQuery<CartItemsQuery>({
        query: GET_CART_ITEMS,
      });

      if (!data) return;

      const { cartItems } = data;
      const newCartItems = addItemToCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    removeItemFromCart: (
      _root: any,
      { item }: { item: TCartItem },
      { cache }: Context,
    ) => {
      const data = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      if (!data) return;
      const { cartItems } = data;

      const newCartItems = removeItemFromCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    clearItemFromCart: (
      _root: any,
      { item }: { item: TCartItem },
      { cache }: Context,
    ) => {
      const data = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      if (!data) return;
      const { cartItems } = data;

      const newCartItems = clearItemFromCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    setCurrentUser: (
      _root: any,
      { user }: { user: UserData },
      { cache }: Context,
    ) => {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { currentUser: user },
      });

      return user;
    },
  },
};
