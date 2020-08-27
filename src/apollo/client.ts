import { ApolloClient, createHttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import Constants from "expo-constants";

import fetch from "../helpers/fetch";

const { apiBaseUrl = "" } = Constants.manifest.extra || {};
const uri = `${apiBaseUrl}/graphql`;

export default () =>
  new ApolloClient({
    link: createHttpLink({ uri, fetch, useGETForQueries: true }),
    cache: new InMemoryCache()
  });
