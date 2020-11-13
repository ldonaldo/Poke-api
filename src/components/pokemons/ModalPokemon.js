import React, {useEffect, useState} from 'react';
import { Modal, Button, Table, Badge, Image, Row, Col } from 'react-bootstrap';
import { getPokemonSpecies, getPokemonDetails, getGender, getEvolutionChain } from '../../utils/HTTPRequests';

const ModalPokemon = ({ show, onHide, image, pokemonDetails, pokemonSpecies, numberId}) => {
  let [isMale, setIsMale] = useState(false)
  let [isFemale, setIsFemale] = useState(false)
  let [isGenderless, setIsGenderless] = useState(false)  
  let [evolutionChain, setEvolutionChain] = useState([])

  useEffect(() => {
    const fetchPokemonGender = async() => {
      for (let i = 1; i <= 3; i++){
        let response = await getGender(i)
        let filter = response.pokemon_species_details && response.pokemon_species_details.some(elem => elem.pokemon_species.name === pokemonDetails.name )
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
  },[show])

  useEffect(() => {
    const fetchEvolutions = async () => {
      let chain = [];
      const response = await getEvolutionChain(pokemonSpecies.evolution_chain.url) 
      for (let key in response.chain){
        if(key == 'species'){
          chain.push(response.chain.species.name)
        }
        if (key == "evolves_to" && response.chain.evolves_to.length > 0){
          response.chain.evolves_to.map((element, index) => {
            for ( let secondKey in response.chain.evolves_to[index]){
              if(secondKey == 'species'){
                chain.push(response.chain.evolves_to[index].species.name)
              }  
              if (secondKey == "evolves_to" && response.chain.evolves_to[index].evolves_to.length >= 0) {
                response.chain.evolves_to[index].evolves_to.map((secondElem, secondIndex) => {
                  for ( let thirdKey in response.chain.evolves_to[index].evolves_to[secondIndex]) {
                    if (thirdKey == "species"){
                      chain.push(response.chain.evolves_to[index].evolves_to[secondIndex].species.name)
                    }
                  }
                })                
              }
            }
          })          
        }
      }
      setEvolutionChain(chain)      
    } 
    if (show) fetchEvolutions()
  },[show])
  const { name, flavor_text_entries, height, weight, types} = pokemonDetails || {};
  const { color, habitat } = pokemonSpecies || {};  
  const pokemonTypes = types && types.map(elem => <Badge pill variant="info">{elem.type.name}</Badge>)
  let gender = ''
  gender = isFemale ? gender += 'Female ' : gender += '' 
  gender = isMale ? gender += 'Male ' : gender += ' ' 
  gender = isGenderless ? gender += 'Genderless ' : gender += ' '
  let showEvolutionChain = evolutionChain.length > 1 ? evolutionChain.map(element => <Badge pill variant="dark">{element}</Badge>).reverse()  : "This pokemon does not evolve"

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{name}-{numberId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={image}></Image>
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
        Evolution Chain
        {showEvolutionChain}
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