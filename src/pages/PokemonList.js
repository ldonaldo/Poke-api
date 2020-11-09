import React, {useEffect, useState} from 'react';
import Pokemons from '../components/pokemons/Pokemons';
import { useSelector, useDispatch } from 'react-redux';
import { getFullPokedex, getGender, getColor, getType } from '../utils/HTTPRequests';
import { changeFullPokedex, changePartialPokedex } from '../actions/search.actions'
import { Container, Button } from 'react-bootstrap';


const PokemonList = () => {
  const dispatch = useDispatch();
  const partialPokedex =  useSelector(state => state.searchReducer.partialPokedex)
  const fullPokedex = useSelector(state => state.searchReducer.fullPokedex)
  const search = useSelector(state => state.searchReducer.search)
  const type = useSelector(state => state.searchReducer.type)
  const color = useSelector(state => state.searchReducer.color)
  const gender = useSelector(state => state.searchReducer.gender)

  const [searchFilter, setSearchFilter] = useState([])
  const [typeFilter, setTypeFilter] = useState([])
  const [colorFilter, setColorFilter] = useState([])
  const [genderFilter, setGenderFilter] = useState([])

  useEffect(() => {
    async function getPokedex(){
      const response = await getFullPokedex()
      console.log(response.pokemon_entries)
      let fullPokedexArray = [];
      response.pokemon_entries.map(elem => fullPokedexArray.push(elem.pokemon_species.name))
      const partialResponse = fullPokedexArray.filter((elem, index) => index < 20  )
      dispatch(changeFullPokedex(fullPokedexArray))
      dispatch(changePartialPokedex(partialResponse))
    }
    getPokedex()
  }, [])

  useEffect(() => {
    async function getFilteredPokemons(){
      const filterPokemons = fullPokedex.filter( elem => elem.includes(search) /*|| elem.entry_number.toString().includes(search)*/  )
      console.log(filterPokemons)
      console.log(search)
      search ? setSearchFilter(filterPokemons) : setSearchFilter([])
    }
    getFilteredPokemons()    
  }, [search])

  useEffect(() => {
    async function getAllFilters(){    
      let genderFiltered = []  
      const fetchGender = gender !== "all" ? await getGender(gender) : partialPokedex;
      console.log(fetchGender)
      fetchGender.pokemon_species_details && fetchGender.pokemon_species_details.map(element => genderFiltered.push(element.pokemon_species.name) )
      console.log(genderFiltered)   
      setGenderFilter(genderFiltered)        
      //dispatch(changePartialPokedex(fetchGender.pokemon_species_details))
    }
    getAllFilters();
  }, [gender])

  useEffect(() => {
    async function getAllFilters(){          
      let colorFiltered = []
      for (let [key, value] of Object.entries(color)) {
        if (value) {
          const color = await getColor(key)
          color.pokemon_species.map(element => colorFiltered.push(element.name))
          console.log(colorFiltered)
        }  
      }
      setColorFilter(colorFiltered)      
      //dispatch(changePartialPokedex(fetchGender.pokemon_species_details))
    }
    getAllFilters();
  }, [color])

  useEffect(() => {
    async function getTypeFilters(){          
      let typeFiltered = []
      for (let [key, value] of Object.entries(type)) {
        if (value) {
          const type = await getType(key)
          type.pokemon.map(element => typeFiltered.push(element.pokemon.name))
          console.log(typeFiltered)
        }  
      }      
      setTypeFilter(typeFiltered)
      //dispatch(changePartialPokedex(fetchGender.pokemon_species_details))
    }
    getTypeFilters();
  }, [type])

  useEffect(() => {    
    let arrayOfFilters = [];
    let arrayIterable = [searchFilter, genderFilter, typeFilter, colorFilter];
    for (let value of arrayIterable){
      if (value.length > 0){
        arrayOfFilters.push(value)
      }   
    }
    console.log(arrayOfFilters)  
    let commonArray= arrayOfFilters.length > 0 ? arrayOfFilters.reduce((acc, elem) => 
      acc.filter(element => elem.includes(element))
    ) : []
    dispatch(changePartialPokedex(commonArray))
    console.log(commonArray)
  }, [searchFilter, genderFilter, typeFilter, colorFilter])

  const handleLoadMore = () => {
    const newLength = partialPokedex.length + 20
    if (fullPokedex.length > newLength) {
      const updatePartial = fullPokedex.filter((elem,index) => index < newLength )
      dispatch(changePartialPokedex(updatePartial))
    }
  }
  return (
    <Container>
      <h6>Choose a pokemon to get more information</h6>
      <Pokemons pokemons={partialPokedex} />
      {!search && <Button variant="info" onClick={handleLoadMore}>Load More</Button>}
    </Container>
  )
}

export default PokemonList