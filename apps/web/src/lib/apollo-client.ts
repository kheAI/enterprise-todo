// apps/web/src/lib/apollo-client.ts
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333/graphql',
});

// Log errors in development
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (process.env.NODE_ENV === 'development') {
    graphQLErrors?.forEach(({ message, locations, path }) =>
      console.error(`GraphQL error: ${message}`, { locations, path }),
    );
    if (networkError) console.error('Network error:', networkError);
  }
});

// Part 07: adds an authLink that reads localStorage.getItem('accessToken')
// and injects Authorization: Bearer <token> into every request

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getTodos: {
            // Merge paginated results into a single list
            keyArgs: ['filter', 'sorting'],
            merge(existing, incoming) {
              return {
                ...incoming,
                edges: [...(existing?.edges ?? []), ...(incoming?.edges ?? [])],
              };
            },
          },
        },
      },
    },
  }),
});
