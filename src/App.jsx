import './App.css';
import React from 'react';
import Header from './components/layout/Header';
import ProductPage from './components/product/ProductPage';

import { Box } from '@mui/material';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <Box width="100%">
          <ProductPage />
        </Box>
      </main>
    </div>
  );
}

export default App;
