import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import ModalPokemon from './ModalPokemon';
import { getPokemonDetails, getPokemonSpecies} from '../../utils/HTTPRequests';

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
  const image = numberId ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${numberId}.png` : ""
  return (
    <Card lg={4}>
      <Card.Img  variant="top" src={image} />
      <Card.Body>
        <Card.Title>{`Pokemon ${numberId}`}</Card.Title>
        <Button onClick={() => setShowModal(true)}>Show Pokemon</Button>
        <ModalPokemon show={showModal} onHide={() => setShowModal(false)} pokemonDetails={pokemonDetails} pokemonSpecies={pokemonSpecies} image={image} numberId={numberId} />
      </Card.Body>
    </Card>
  )
}

export default Pokemon