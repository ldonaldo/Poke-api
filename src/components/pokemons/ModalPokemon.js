import React, {useEffect, useState} from 'react';
import { Modal, Table, Badge, Image} from 'react-bootstrap';
import { getPokemonSpecies, getPokemonDetails, getGender, getEvolutionChain } from '../../utils/HTTPRequests';
import './ModalPokemon.scss'

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
      let url = pokemonSpecies.evolution_chain ? pokemonSpecies.evolution_chain.url : ''
      console.log(url)
      const response = await getEvolutionChain(url) 
      console.log(response)
      for (let key in response.chain){
        if(key == 'species'){
          const pokemonNumber = response.chain.species.url.split("/")[6].toString().padStart(3,"000")   
          chain.push({name: response.chain.species.name, image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonNumber}.png`})
        }
        if (key == "evolves_to" && response.chain.evolves_to.length > 0){
          response.chain.evolves_to.map((element, index) => {
            for ( let secondKey in response.chain.evolves_to[index]){
              if(secondKey == 'species'){
                const pokemonNumber = response.chain.evolves_to[index].species.url.split("/")[6].toString().padStart(3,"000")  
                chain.push({name: response.chain.evolves_to[index].species.name, image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonNumber}.png`})
              }  
              if (secondKey == "evolves_to" && response.chain.evolves_to[index].evolves_to.length >= 0) {
                response.chain.evolves_to[index].evolves_to.map((secondElem, secondIndex) => {
                  for ( let thirdKey in response.chain.evolves_to[index].evolves_to[secondIndex]) {
                    if (thirdKey == "species"){
                      const pokemonNumber = response.chain.evolves_to[index].evolves_to[secondIndex].species.url.split("/")[6].toString().padStart(3,"000")  
                      chain.push({name: response.chain.evolves_to[index].evolves_to[secondIndex].species.name, image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonNumber}.png` })
                    }
                  }
                })                
              }
            }
          })          
        }
      }
      console.log(evolutionChain)
      setEvolutionChain(chain)      
    } 
    if (show) fetchEvolutions()
  },[show])
  const { name, flavor_text_entries, height, weight, types} = pokemonDetails || {};
  const { color, habitat } = pokemonSpecies || {};  
  const pokemonTypes = types && types.map(elem => <Badge pill variant="info"><h4>{elem.type.name.charAt(0).toUpperCase() + elem.type.name.slice(1)}</h4></Badge>)
  let gender = ''
  gender = isFemale ? gender += 'Female ' : gender += '' 
  gender = isMale ? gender += 'Male ' : gender += ' ' 
  gender = isGenderless ? gender += 'Genderless ' : gender += ' '
  let showEvolutionChain = evolutionChain && evolutionChain.length > 1 ? evolutionChain.map(element => <div><div className="pokemonImage"><Image src={element.image}></Image></div><div className="pokemonName">{element.name}</div></div>).reverse()  : "This pokemon does not evolve"

  return (
    <Modal show={show} onHide={onHide} size={'lg'}>      
        <div className="pokemon-details">
          <div className="image">
            <Image  src={image}></Image>
          </div>
          <div className="name">
            {name ? <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3> : null}            
          </div>
          <div className="number">
            <Badge pill variant="dark"><h4>{numberId}</h4></Badge>
          </div>
          <div className="data">       
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
          </div>
          <div className="types">
            <h5>Types:</h5>
            {pokemonTypes}
          </div>
          <div className="evolution">            
            <h6>Evolution Chain</h6>
            <div className="info">
              {showEvolutionChain}
            </div>            
          </div>        
      </div>
    </Modal>
  )
}

export default ModalPokemon