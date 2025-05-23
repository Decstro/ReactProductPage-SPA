import './App.css';
import Header from './components/Header';
import ProductPage from './components/ProductPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <ProductPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
