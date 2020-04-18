import React from "react";

import { CartContainer, ShoppingIcon, ItemCountContainer } from "./styles";

type Props = {
  toggleCartHidden(): void;
  itemCount: number;
};

const CartIcon = ({ toggleCartHidden, itemCount }: Props) => (
  <CartContainer onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartContainer>
);

export default CartIcon;
