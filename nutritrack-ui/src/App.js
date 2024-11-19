import './App.css';
import Header from './components/Header';
import SearchField from './components/SearchField';
import SearchResults from './components/SearchResults';
import { ProductResultsProvider } from './context/Products';

function App() {
  return (
    <div className="flex-grow md:container md:mx-auto shadow-xl min-h-full">
      <Header />
        <ProductResultsProvider>
        <div className="flex flex-col gap-y-2">
            <SearchField />
            <SearchResults />
          </div>
        </ProductResultsProvider>
    </div>
  );
}

export default App;
