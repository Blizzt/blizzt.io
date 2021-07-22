import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import Cookies from 'universal-cookie';

const customFetch = (uri, options) => {
  const cookies = new Cookies();
  const token = cookies.get('x-token');

  return fetch(uri, {
    ...options,
    headers: {
      ...options.headers,
      ...(token !== undefined && {
        'x-token': token
      })
    }
  });
};

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  const cookies = new Cookies();
  const token = cookies.get('x-token');

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: 'http://localhost:8000/graphql',
      credentials: 'same-origin',
      headers: {
        ...(token !== undefined && {
          'x-token': token
        })
      },
      fetch: customFetch
    }),

    cache: new InMemoryCache().restore(initialState)
  });
}
