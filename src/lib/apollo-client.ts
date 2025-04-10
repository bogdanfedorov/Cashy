import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://cashy-backend-production.up.railway.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
