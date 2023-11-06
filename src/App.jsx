import './App.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Important for API Consumption: Create an instance of the ApolloClient class and specify the endpoint of your GraphQL API (e.g., 'http://localhost:3001')—the proxy set up in the previous activity facilitates this. 
// We also instantiate a new InMemoryCache class that automatically caches queried data, enhancing performance.
const client = new ApolloClient({
  // GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data
  // This tells where to run the graphql server
  uri: '/graphql',
  // If we are to cach e it should be to memory on computer
  cache: new InMemoryCache(),
});

function App() {
  return (

    // Wrap your component tree with the ApolloProvider component to enable access all other components using the ApolloClient and as a result add data to each component if need be

    // This is because it is a parent to everything in the client 

    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Navbar />
        <div className="container">
          <Outlet />

        </div>
      </div>

    </ApolloProvider >
  );
}

export default App;
