import { ApolloClient, createHttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import Constants from "expo-constants";

import fetch from "../helpers/fetch";

const { apiBaseUrl = "" } = Constants.manifest.extra || {};
const uri = `${apiBaseUrl}/graphql`;

const batchHttpLink = new BatchHttpLink({ uri, fetch });
const httpLink = createHttpLink({ uri, fetch });

export default ({ batchHttpRequests = true } = {}) =>
  new ApolloClient({
    link: batchHttpRequests ? batchHttpLink : httpLink,
    cache: new InMemoryCache()
  });
