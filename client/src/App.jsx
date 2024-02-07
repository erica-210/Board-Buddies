import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import { Outlet } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { setContext } from '@apollo/client/link/context';

import HelloReact from './components/Header/HelloReact';
// import Header from './components/Header/index';
// import Footer from './components/Footer/index';
import Login from './components/LoginForm/Login';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
       
        <HelloReact />
        <Login />
        {/* <Header /> */}
        {/* <Footer /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
