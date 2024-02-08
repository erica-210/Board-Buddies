import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from '@apollo/client/link/context';

import HelloReact from "./components/Header/HelloReact";
// import Header from './components/Header/index';
// import Footer from './components/Footer/index';

const httpLink = createHttpLink({
  uri: '/graphql',
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
      <div>
        <>
          {/* <Header /> */}
          <HelloReact />
          <Outlet />
          {/* <Footer /> */}
        </>
      </div>
    </ApolloProvider>
  );
}

export default App;
