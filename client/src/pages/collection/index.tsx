import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouteMatch } from "react-router-dom";

import CollectionPage from "./component";
import Spinner from "../../components/spinner";
import { GET_COLLECTION_BY_TITLE } from "./query";
import { CollectionByTitle, QueryVars } from "./types";

const CollectionsOverviewContainer = () => {
  const match = useRouteMatch<{ collectionId: string }>();
  const { loading, error, data } = useQuery<CollectionByTitle, QueryVars>(
    GET_COLLECTION_BY_TITLE,
    { variables: { title: match.params.collectionId } },
  );

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return <CollectionPage collection={data.getCollectionsByTitle} />;
};

export default CollectionsOverviewContainer;
