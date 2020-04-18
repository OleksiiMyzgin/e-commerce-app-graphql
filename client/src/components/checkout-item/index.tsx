import React from "react";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";

import CheckoutItem from "./component";
import { TCartItem } from "../../interfaces";

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($item: Item!) {
    removeItemFromCart(item: $item) @client
  }
`;

const CLEAR_ITEM_FROM_CART = gql`
  mutation ClearItemFromCart($item: Item!) {
    clearItemFromCart(item: $item) @client
  }
`;

type Props = {
  cartItem: TCartItem;
};

const CollectionItemContainer = ({ cartItem }: Props) => {
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
  const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);
  const [clearItemFromCart] = useMutation(CLEAR_ITEM_FROM_CART);

  const handleAddItemToCart = (item: TCartItem) =>
    addItemToCart({ variables: { item } });

  const handleRemoveItemFromCart = (item: TCartItem) =>
    removeItemFromCart({ variables: { item } });

  const handleClearItemFromCart = (item: TCartItem) =>
    clearItemFromCart({ variables: { item } });

  return (
    <CheckoutItem
      cartItem={cartItem}
      addItem={handleAddItemToCart}
      removeItem={handleRemoveItemFromCart}
      clearItem={handleClearItemFromCart}
    />
  );
};

export default CollectionItemContainer;
