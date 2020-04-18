import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import App from "./App";
import { UserData } from "../interfaces";

const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;

const GET_CURRENT_USER = gql`
  query {
    currentUser @client
  }
`;

type Query = {
  currentUser: UserData | null;
};

type Mutation = {
  user: UserData;
};

const AppContainer = () => {
  const { error, data } = useQuery<Query>(GET_CURRENT_USER);
  const [setCurrentUser] = useMutation<Mutation>(SET_CURRENT_USER);

  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  const handleSetCurrentUser = (user: UserData) => {
    return setCurrentUser({ variables: { user } });
  };

  return (
    <App currentUser={data.currentUser} setCurrentUser={handleSetCurrentUser} />
  );
};

export default AppContainer;
