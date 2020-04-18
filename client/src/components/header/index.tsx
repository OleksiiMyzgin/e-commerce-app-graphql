import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import Header from "./component";
import { UserData } from "../../interfaces";

const GET_CLIENT_PROPERTIES = gql`
  {
    cartHidden @client
    currentUser @client
  }
`;

type Query = {
  cartHidden: boolean;
  currentUser: UserData | null;
};

const HeaderContainer = () => {
  const { data } = useQuery<Query>(GET_CLIENT_PROPERTIES);

  if (!data) return null;

  return <Header hidden={data.cartHidden} currentUser={data.currentUser} />;
};

export default HeaderContainer;
