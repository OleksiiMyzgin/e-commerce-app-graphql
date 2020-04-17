import { gql, ApolloClient } from "apollo-boost";

// Extend your server schema with a client-only field.
// Type definitions should be capital.
export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
  }
`;

const GET_CART_HIDDEN = gql`
  query {
    cartHidden @client
  }
`;

type ApolloClientType = ApolloClient<any>;
type Query = {
  cartHidden: boolean;
};

export const resolvers = {
  Mutation: {
    toggleCartHidden: (
      _root: any,
      _args: any,
      { cache }: { cache: ApolloClientType },
    ) => {
      const data = cache.readQuery<Query>({
        query: GET_CART_HIDDEN,
      });

      if (!data) return;
      const { cartHidden } = data;

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });

      return !cartHidden;
    },
  },
};
