import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Outlet } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import "./App.css";

import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import NavBar from "./components/Nav";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={{ marginLeft: "25%", marginRight: 0, maxWidth: "600px" }}>
        <>
          <NavBar />
          <Header />
          <Outlet />
          <Footer />
        </>
      </div>
    </ApolloProvider>
  );
}

export default App;
