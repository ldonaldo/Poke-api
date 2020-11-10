import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Pokemon from './Pokemon';

function Pokemons({ pokemons }){
  return (
    <Container>
      <Row>
      {pokemons.length > 0 ? pokemons.map( elem => {
        return <Pokemon key={elem.id} number={elem.id}  name={elem.name} />
      }) : <h6>No items found...</h6>}
      </Row>
    </Container>
  )
}

export default Pokemons