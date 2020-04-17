import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import CollectionsOverview from "./component";
import Spinner from "../spinner";
import { TCollections } from "../../interfaces";

const GET_COLLECTIONS = gql`
  query {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewContainer = () => {
  const { loading, error, data } = useQuery<TCollections>(GET_COLLECTIONS);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return <CollectionsOverview collections={data.collections} />;
};

export default CollectionsOverviewContainer;
