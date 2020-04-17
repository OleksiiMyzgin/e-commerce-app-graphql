import React from "react";

import CollectionPreview from "../collection-preview";

import { Collection } from "../../interfaces";

import { CollectionsOverviewContainer } from "./styles";

type Props = {
  collections: Collection[];
};

const CollectionsOverview = ({ collections }: Props): JSX.Element => (
  <CollectionsOverviewContainer>
    {collections.map((collection) => (
      <CollectionPreview key={collection.id} {...collection} />
    ))}
  </CollectionsOverviewContainer>
);

export default CollectionsOverview;
