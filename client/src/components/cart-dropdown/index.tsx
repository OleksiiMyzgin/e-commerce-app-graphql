import React from "react";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";

import CartDropdown from "./component";
import { TCartItem } from "../../interfaces";

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  query {
    cartItems @client
  }
`;

const CartDropdownContainer = () => {
  const { error, data } = useQuery<{ cartItems: TCartItem[] }>(GET_CART_ITEMS);
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);

  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <CartDropdown
      cartItems={data.cartItems}
      toggleCartHidden={toggleCartHidden}
    />
  );
};

export default CartDropdownContainer;
