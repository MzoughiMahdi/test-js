import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Question from './Question';

const client = new ApolloClient({
  uri: 'https://api.sampleapis.com/futurama/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Question/>
    </ApolloProvider>
  );
}
export default App
