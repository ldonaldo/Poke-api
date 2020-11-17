import { BrowserRouter as Router } from "react-router-dom";
import Helmet from 'react-helmet';
import Header from './pages/Header';
import Search from './pages/Search';
import PokemonList from './pages/PokemonList';
import Filters from './components/filters/Filters';
import './App.scss';
function App() {
  return (
    <Router>      
      <div className="App">
        <Helmet>
          <title>Pokeapi</title>
        </Helmet>
        <Header />
        <div className="all-content">
          <div className="filters">
            <Filters /> 
          </div>    
          <div className="list">
            <Search />
            <PokemonList />
          </div>
        </div>                  
      </div>
    </Router>
  );
}

export default App;
