import React, {useEffect, useState} from 'react';
import { Modal, Button, Table, Badge, Image } from 'react-bootstrap';
import { getPokemonSpecies, getPokemonDetails, getGender, getEvolutionChain } from '../../utils/HTTPRequests';

const ModalPokemon = ({ show, onHide, image, pokemonDetails, pokemonSpecies}) => {
  let [isMale, setIsMale] = useState(false)
  let [isFemale, setIsFemale] = useState(false)
  let [isGenderless, setIsGenderless] = useState(false)  

  useEffect(() => {
    const fetchPokemonGender = async() => {
      for (let i = 1; i <= 3; i++){
        let response = await getGender(i)
        let filter = response.pokemon_species_details.some(elem => elem.pokemon_species.name === pokemonDetails.name )
        switch(i){
          case 1:
            setIsFemale(filter)
            break;
          case 2:
            setIsMale(filter)
            break;
          case 3:
            setIsGenderless(filter)
            break;
          default: 
            break; 
        }
      }
    }
    if (show) fetchPokemonGender()
  },[pokemonSpecies])

  useEffect(() => {
    const fetchEvolutions = async () => {
      let chain = {};
      const response = await getEvolutionChain(pokemonSpecies.evolution_chain.url) || {}
      chain['species'] = response.chain.species.name
      chain['evolves_to'] = response.chain.evolves_to
    } 
    if (show) fetchEvolutions()
  },[pokemonSpecies])
  const { name, flavor_text_entries, height, weight, types} = pokemonDetails || {};
  const { color, habitat } = pokemonSpecies || {};  
  const pokemonTypes = types && types.map(elem => <Badge pill variant="info">{elem.type.name}</Badge>)
  let gender = '';
  gender = isFemale ? gender += 'Female ' : gender += '' 
  gender = isMale ? gender += 'Male ' : gender += ' ' 
  gender = isGenderless ? gender += 'Genderless ' : gender += ' '

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={image} rounded></Image>
        <Table striped bordered hover variant="dark">
          <tbody>
            <tr>
              <th>Height</th>
              <th>{height}</th>
            </tr>
            <tr>
              <th>Weight</th>
              <th>{weight}</th>
            </tr>
            <tr>
              <th>Category</th>
              <th>{weight}</th>
            </tr>
            <tr>
              <th>Gender</th>
              <th>{gender}</th>
            </tr>
            <tr>
              <th>Habitat</th>
              <th>{habitat && habitat.name}</th>
            </tr>
            <tr>
              <th>Color</th>
              <th>{color && color.name}</th>
            </tr>
          </tbody>
        </Table>
        {pokemonTypes}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onHide}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalPokemon