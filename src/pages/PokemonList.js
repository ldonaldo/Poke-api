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
      let fullPokedexArray = [];
      response.pokemon_entries.map(elem => fullPokedexArray.push({name: elem.pokemon_species.name, id: elem.entry_number}))
      const partialResponse = fullPokedexArray.filter((elem, index) => index < 20  )
      setSearchFilter(fullPokedexArray)
      dispatch(changeFullPokedex(fullPokedexArray))
      dispatch(changePartialPokedex(partialResponse))
    }
    getPokedex()
  }, [])

  useEffect(() => {    
    const filterPokemons = fullPokedex.filter( elem => elem.name.includes(search) || elem.id.toString().includes(search)  )
    search ? setSearchFilter(filterPokemons) : setSearchFilter(filterPokemons)       
  }, [search])

  useEffect(() => {
    async function getAllFilters(){    
      let genderFiltered = []  
      const fetchGender = gender !== "all" ? await getGender(gender) : partialPokedex;
      fetchGender.pokemon_species_details && fetchGender.pokemon_species_details.map(element => genderFiltered.push({name: element.pokemon_species.name, id: element.pokemon_species.url.split('/')[6] }) )
      setGenderFilter(genderFiltered)     
    }
    getAllFilters();
  }, [gender])

  useEffect(() => {
    async function getAllFilters(){          
      let colorFiltered = []
      for (let [key, value] of Object.entries(color)) {
        if (value) {
          const color = await getColor(key)
          color.pokemon_species.map(element => colorFiltered.push({name: element.name, id: element.url.split('/')[6]}))
        }  
      }
      setColorFilter(colorFiltered)      
    }
    getAllFilters();
  }, [color])

  useEffect(() => {
    async function getTypeFilters(){          
      let typeFiltered = []
      for (let [key, value] of Object.entries(type)) {
        if (value) {
          const type = await getType(key)
          type.pokemon.map(element => typeFiltered.indexOf(element.pokemon.name) === -1 && element.pokemon.url.split('/')[6] <= 807 ? typeFiltered.push({name: element.pokemon.name, id: element.pokemon.url.split('/')[6]}) : null) 
        }  
      }      
      setTypeFilter(typeFiltered)
    }
    getTypeFilters();
  }, [type])

  useEffect(() => {    
    let arrayOfFilters = [];
    let arrayIterable = [genderFilter, typeFilter, colorFilter];
    for (let value of arrayIterable){
      if (value.length > 0){
        arrayOfFilters.push(...value)  
      }      
    }    
    arrayOfFilters.push(...searchFilter)
    console.log(arrayOfFilters)  
    const countRepeated = names => names.reduce((acc,elem) => ({...acc,
      [elem.name]: (acc[elem.name] || 0) + 1
    }), {})
    const repeated = elems => 
      Object.keys(elems).filter((element) => elems[element] > 1);
    const commonArray = repeated(countRepeated(arrayOfFilters))
    console.log(commonArray)
    let finalArray = arrayOfFilters.filter( (element,index) => commonArray.includes(element.name))
    console.log(finalArray)
    let filteredArray = Array.from( new Set(finalArray.map( elem => elem.name))).map(element => {
      return finalArray.find( a => a.name === element)
    })
    console.log(filteredArray)
    dispatch(changePartialPokedex(filteredArray))
    
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