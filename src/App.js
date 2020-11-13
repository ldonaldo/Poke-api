import { BrowserRouter as Router } from "react-router-dom";
import Header from './pages/Header';
import Search from './pages/Search';
import PokemonList from './pages/PokemonList';
import Filters from './components/filters/Filters';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
function App() {
  return (
    <Router>      
      <div className="App">
        <Header />
        <Container fluid>
          <Row>
            <Col md={3} lg={3}>
              <Filters />  
            </Col>
            <Col md={9} lg={9}>
              <Search />
              <PokemonList /> 
            </Col>            
          </Row> 
        </Container>                     
      </div>
    </Router>
  );
}

export default App;
