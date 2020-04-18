import { User, Shop, Cart, Directory, TCartItem, UserData } from "../index";

export interface RootState {
  user: User;
  shop: Shop;
  cart: Cart;
  directory: Directory;
}

export interface InitialData {
  cartHidden: boolean;
  cartItems: TCartItem[];
  itemCount: number;
  cartTotal: number;
  currentUser: UserData | null;
}
