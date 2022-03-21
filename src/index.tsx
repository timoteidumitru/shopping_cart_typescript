import App from 'App';
import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
const client = new QueryClient();

render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root'),
);
