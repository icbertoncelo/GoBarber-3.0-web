import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Routes from './routes';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
