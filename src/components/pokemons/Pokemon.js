import React, {useState, useEffect} from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import ModalPokemon from './ModalPokemon';
import { getPokemonDetails, getPokemonSpecies} from '../../utils/HTTPRequests';
import './Pokemon.css'

function Pokemon({ name, number }) {
  let [showModal, setShowModal] = useState(false);  
  let [pokemonDetails, setPokemonDetails] = useState({})
  let [pokemonSpecies, setPokemonSpecies] = useState({})

  useEffect(() => {
    const fetchPokemonData = async () => {
      const getDetails = await getPokemonDetails(name);
      setPokemonDetails(getDetails)
      const getSpecies = await getPokemonSpecies(name);
      setPokemonSpecies(getSpecies)
      /*const flavorText = pokemonDetails.flavor_text_entries[0].flavor_text      
      const category = pokemonSpecies.colcr.name*/
    }
    fetchPokemonData()
  },[])

  const numberId = number.toString().padStart(3,"000") 
  const image = numberId ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numberId}.png` : ""
  return (
    <Col lg={4} md={4}>
      <Card hover style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px', marginBottom: '10px', marginTop: '10px'}}>
        <Card.Img  variant="top" src={image} />
        <Card.Body>
          <Card.Title>{`Pokemon ${numberId}`}</Card.Title>
          <Button onClick={() => setShowModal(true)}>Show Pokemon</Button>
          <ModalPokemon show={showModal} onHide={() => setShowModal(false)} pokemonDetails={pokemonDetails} pokemonSpecies={pokemonSpecies} image={image} numberId={numberId} />
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Pokemon