import './App.css';
import Header from './components/Header';
import SearchField from './components/SearchField';

function App() {
  return (
    <div className="flex-grow md:container md:mx-auto shadow-xl min-h-full">
      <Header />
      <div className="grid md:grid-flow-col grid-cols-4 grid-row gap-4">
        <SearchField />  
      </div>
    </div>
  );
}

export default App;
