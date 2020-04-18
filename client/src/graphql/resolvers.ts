import { gql, ApolloClient } from "apollo-boost";

import { addItemToCart } from "./utils";
import { TCartItem } from "../interfaces";

// Extend your server schema with a client-only field.
// Type definitions should be capital.
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;

const GET_CART_HIDDEN = gql`
  query {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

type Context = {
  cache: ApolloClient<any>;
};

type CartHiddenQuery = {
  cartHidden: boolean;
};

type CartItemsQuery = {
  cartItems: TCartItem[];
};

const updateCartItemsRelatedQueries = (
  cache: ApolloClient<any>,
  newCartItems: TCartItem[],
) => {
  // cache.writeQuery({
  //   query: GET_ITEM_COUNT,
  //   data: { itemCount: getCartItemCount(newCartItems) }
  // });

  // cache.writeQuery({
  //   query: GET_CART_TOTAL,
  //   data: { cartTotal: getCartTotal(newCartItems) }
  // });

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
  },
};
