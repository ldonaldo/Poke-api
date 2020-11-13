import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
function Header() {
  return (
    <Navbar collapseOnSelect bg="primary" expand="lg" >      
      <Navbar.Brand href="#"><img width="80" height="40" alt="Logo" src="https://i.ibb.co/dkw6QvV/pokeapi.png" /></Navbar.Brand>
    </Navbar>        
  )
}

export default Header