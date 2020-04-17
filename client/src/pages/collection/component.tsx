import React from "react";

import { Collection } from "../../interfaces";

import CollectionItem from "../../components/collection-item";

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from "./styles";

type Props = {
  collection: Collection;
};

const CollectionPage = ({ collection }: Props): JSX.Element | null => {
  if (!collection) {
    return null;
  }

  const { title, items } = collection;

  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

export default CollectionPage;
