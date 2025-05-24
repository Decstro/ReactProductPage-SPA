import './App.css';
import Header from './components/Header';
import ProductPage from './components/ProductPage';

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
