import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";

import "./index.css";
import AppContainer from "./App";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import { INITIAL_DATA } from "./graphql/initial-data";

const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com/",
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
  typeDefs,
});

client.writeData({ data: INITIAL_DATA });

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root"),
);

serviceWorker.register();
