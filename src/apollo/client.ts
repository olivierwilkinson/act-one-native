import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

import fetch from "../helpers/fetch";
import { apiBaseUrl } from "../services/baseUrls";

export default () =>
  new ApolloClient({
    link: createHttpLink({ fetch, uri: `${apiBaseUrl}/graphql` }),
    cache: new InMemoryCache(),
  });
