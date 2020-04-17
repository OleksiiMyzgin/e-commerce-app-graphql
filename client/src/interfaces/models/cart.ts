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

export type Cart = {
  hidden: boolean;
  cartItems: TCartItem[];
};
