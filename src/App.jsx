import './App.css';
import Header from './components/Header';
import ProductPage from './components/ProductPage';
import Footer from './components/Footer';

import { Box } from '@mui/material';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <Box width="100%" maxWidth="1280px">
          <ProductPage />
        </Box>
      </main>
      <Footer />
    </div>
  );
}

export default App;
