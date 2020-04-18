import React from "react";
import { gql, ApolloError } from "apollo-boost";
import { useMutation } from "react-apollo";

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from "./styles";

import { TCartItem } from "../../interfaces";

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

type Props = {
  item: TCartItem;
};

type MutationVars = {
  item: TCartItem;
};

type QueryData = {
  error: ApolloError | undefined;
};

const CollectionItem = ({ item }: Props) => {
  const [addItemToCart, { error }] = useMutation<QueryData, MutationVars>(
    ADD_ITEM_TO_CART,
  );
  const { name, price, imageUrl } = item;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <CollectionItemContainer>
      <BackgroundImage className="image" imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton
        onClick={() =>
          addItemToCart({
            variables: { item },
          })
        }
        inverted
      >
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

export default CollectionItem;
