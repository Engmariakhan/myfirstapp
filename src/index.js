import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
const client = new ApolloClient({
  uri: "https://engmariakhan.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "X-Hasura-Admin-Secret":
      "MzT4Vx2MSjTB6cUBMYZZ2qxEsKdKX1Pj0PaKi24ut2US1y5g3fg0S8borUV64OzG",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <App />
        
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
