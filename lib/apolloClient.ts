// import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// const httpLink = createHttpLink({
//   uri: "/api/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// export default client;

import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const authLink = setContext((_, { headers }) => {
  // Get token from local storage
  let token;
  if (typeof window !== "undefined" && window.localStorage) {
    token = localStorage.getItem("token");
  }

  // Return headers with the token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),

    link: authLink.concat(
      new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: "http://localhost:3000/api/graphql",
        // you can disable result caching here if you want to
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        // fetchOptions: { cache: "no-store" },
      })
    ),
  });
});
