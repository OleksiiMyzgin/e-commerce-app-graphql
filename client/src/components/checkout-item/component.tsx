import React from "react";
import { ExecutionResult } from "react-apollo";

import { TCartItem } from "../../interfaces";

import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer,
} from "./styles";

type Props = {
  cartItem: TCartItem;
  clearItem(item: TCartItem): Promise<ExecutionResult>;
  addItem(item: TCartItem): Promise<ExecutionResult>;
  removeItem(item: TCartItem): Promise<ExecutionResult>;
};

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }: Props) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt="item" />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <div onClick={() => removeItem(cartItem)}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={() => addItem(cartItem)}>&#10095;</div>
      </QuantityContainer>
      <TextContainer>{price}</TextContainer>
      <RemoveButtonContainer onClick={() => clearItem(cartItem)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
