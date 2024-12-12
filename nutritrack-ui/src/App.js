import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import SearchField from './components/ProductSearch/SearchField';
import SearchResults from './components/ProductSearch/SearchResults';
import ShowSearchUse from './components/ProductSearch/ShowSearchUse';

function App() {

  return (
    <div className="flex flex-col flex-grow-0 md:container md:mx-auto shadow-xl min-h-screen bg-white m-4">
      <Header />
      <div className="flex-1 gap-y-2">
        <SearchField />
        <ShowSearchUse />
        <SearchResults />
      </div>
      <Footer />
    </div>
  );
}

export default App;