import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


import HelloReact from './components/HelloReact';
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
      </div>
    </ApolloProvider>
  );
}

export default App;
