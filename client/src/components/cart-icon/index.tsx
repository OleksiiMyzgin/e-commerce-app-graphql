import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import CartIcon from "./component";

import { GET_ITEM_COUNT } from "../../graphql/queries";

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const CartIconContainer = () => {
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);
  const { error, data } = useQuery(GET_ITEM_COUNT);

  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <CartIcon toggleCartHidden={toggleCartHidden} itemCount={data.itemCount} />
  );
};

export default CartIconContainer;
