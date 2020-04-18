import firebase from "firebase/app";

export type FirebaseUser = firebase.User | null;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type DocumentReference = firebase.firestore.DocumentReference;

export interface InitialData {
  cartHidden: boolean;
  cartItems: TCartItem[];
  itemCount: number;
  cartTotal: number;
  currentUser: UserData | null;
}

export type TCartItem = {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
  quantity: number;
};

export type DocData = {
  title: string;
  items: TCartItem[];
};

export type Collection = {
  id: string;
  title: string;
  items: TCartItem[];
};

export type Collections = {
  [key: string]: Collection;
};

export type TCollections = {
  collections: Collection[];
};

export type Section = {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
  size?: string;
};

export type UserAdditionalData = { displayName: string };

export type UserData = {
  id?: string;
  displayName: string | null;
  email: string | null;
  createdAt: Date;
};
