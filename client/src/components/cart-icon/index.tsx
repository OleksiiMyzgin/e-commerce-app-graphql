import React from "react";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";

import CartIcon from "./component";

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const CartIconContainer = () => {
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);
  return <CartIcon toggleCartHidden={toggleCartHidden} />;
};

export default CartIconContainer;
