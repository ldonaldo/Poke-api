import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';

function Header() {
  return (
    <Navbar collapseOnSelect bg="primary" expand="lg" >      
      <Navbar.Brand>PokeApi</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#">Home</Nav.Link>
        <Nav.Link href="#">Pokemons</Nav.Link> 
      </Nav>
    </Navbar>        
  )
}

export default Header