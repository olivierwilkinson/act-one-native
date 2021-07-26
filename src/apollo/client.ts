import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

import fetch from "../helpers/fetch";
import { apiBaseUrl } from "../services/baseUrls";

export default () =>
  new ApolloClient({
    link: createHttpLink({ fetch, uri: `${apiBaseUrl}/graphql` }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            play(_, { args, toReference }) {
              return toReference({
                __typename: "Play",
                id: args?.where.id,
              });
            },
            scene(_, { args, toReference }) {
              return toReference({
                __typename: "Scene",
                id: args?.where.id,
              });
            },
            line(_, { args, toReference }) {
              return toReference({
                __typename: "Line",
                id: args?.where.id,
              });
            },
            lineRow(_, { args, toReference }) {
              return toReference({
                __typename: "LineRow",
                id: args?.where.id,
              });
            },
          },
        },
      },
    }),
  });
