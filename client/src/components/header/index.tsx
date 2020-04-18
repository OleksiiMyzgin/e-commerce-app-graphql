import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import Header from "./component";

const GET_CLIENT_PROPERTIES = gql`
  {
    cartHidden @client
  }
`;

type Query = {
  cartHidden: boolean;
};

const HeaderContainer = () => {
  const { data } = useQuery<Query>(GET_CLIENT_PROPERTIES);

  if (!data) return null;

  return <Header hidden={data.cartHidden} />;
};

export default HeaderContainer;
