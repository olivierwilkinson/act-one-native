import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import Constants from "expo-constants";

import fetch from "../helpers/fetch";

const { apiBaseUrl = "" } = Constants.manifest.extra || {};
const uri = `${apiBaseUrl}/graphql`;

export default () =>
  new ApolloClient({
    link: createHttpLink({ uri, fetch }),
    cache: new InMemoryCache()
  });
