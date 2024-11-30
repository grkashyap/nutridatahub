import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import SearchField from './components/SearchField';
import SearchResults from './components/SearchResults';
import { ProductResultsProvider } from './context/Products';

function App() {
  return (
    <div className="flex-grow-0 md:container md:mx-auto shadow-xl min-h-full bg-white">
      <Header />
        <ProductResultsProvider>
        <div className="flex flex-col gap-y-2">
            <SearchField />
            <SearchResults />
          </div>
        </ProductResultsProvider>
      <Footer />
    </div>
  );
}

export default App;
