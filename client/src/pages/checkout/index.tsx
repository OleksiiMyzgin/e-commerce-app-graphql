import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import CheckoutPage from "./component";
import { TCartItem } from "../../interfaces";

const GET_CART_ITEMS_AND_TOTAL = gql`
  {
    cartItems @client
    cartTotal @client
  }
`;

type Query = {
  cartItems: TCartItem[];
  cartTotal: number;
};

const CheckoutPageContainer = () => {
  const { data } = useQuery<Query>(GET_CART_ITEMS_AND_TOTAL);
  if (!data) return null;

  const { cartItems, cartTotal } = data;
  return <CheckoutPage cartItems={cartItems} total={cartTotal} />;
};

export default CheckoutPageContainer;
