import { Collection } from "../../interfaces";

export type CollectionByTitle = {
  getCollectionsByTitle: Collection;
};

export type QueryVars = {
  title: string;
};
