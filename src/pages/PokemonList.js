import React, {useEffect, useState} from 'react';
import Pokemons from '../components/pokemons/Pokemons';
import { useSelector, useDispatch } from 'react-redux';
import { getFullPokedex, getGender, getColor, getType } from '../utils/HTTPRequests';
import { changeFullPokedex, changePartialPokedex } from '../actions/search.actions'
import { Container, Button, Spinner, Row } from 'react-bootstrap';


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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setGenderFilter(fullPokedex)
    setColorFilter(fullPokedex)
    setTypeFilter(fullPokedex)
    setSearchFilter(fullPokedex)
  },[fullPokedex])

  useEffect(() => {
    async function getPokedex(){
      setLoading(true)
      const storedPokedex = JSON.parse(localStorage.getItem("fullPokedex"))
      const response = storedPokedex && storedPokedex.length > 0 ? storedPokedex :  await getFullPokedex()
      let fullPokedexArray = storedPokedex && storedPokedex.length > 0 ? storedPokedex :  [];
      if (storedPokedex && storedPokedex.length === 0) {
        response.pokemon_entries && response.pokemon_entries.map(elem => fullPokedexArray.push({name: elem.pokemon_species.name, id: elem.entry_number}))
      }
      const partialResponse = fullPokedexArray.filter((elem, index) => index < 20  )     
      setSearchFilter(fullPokedexArray)
      dispatch(changeFullPokedex(fullPokedexArray))
      localStorage.setItem("fullPokedex",JSON.stringify(fullPokedexArray))
      dispatch(changePartialPokedex(partialResponse))
    }
    getPokedex()
  }, [])

  useEffect(() => {    
    setLoading(true)
    const filterPokemons = fullPokedex.filter( elem => elem.name.includes(search) || elem.id.toString().includes(search)  )
    const searchArray = filterPokemons.length === 0 ? searchFilter : filterPokemons
    setSearchFilter(searchArray)       
  }, [search])

  useEffect(() => {
    async function getGenderFilters(){ 
      setLoading(true) 
      let genderArray = []  
      const fetchGender = gender !== "all" ? await getGender(gender) : fullPokedex;
      fetchGender.pokemon_species_details && fetchGender.pokemon_species_details.map(element => genderArray.push({name: element.pokemon_species.name, id: element.pokemon_species.url.split('/')[6] }) )
      let genderFiltered = genderArray.length === 0 ? fullPokedex : genderArray;
      setGenderFilter(genderFiltered)     
    }
    getGenderFilters();
  }, [gender])

  useEffect(() => {
    async function getColorFilters(){     
      setLoading(true)    
      let colorArray = []
      for (let [key, value] of Object.entries(color)) {
        if (value) {
          const color = await getColor(key)
          color.pokemon_species.map(element => colorArray.push({name: element.name, id: element.url.split('/')[6]}))
        }  
      }
      let colorFiltered = colorArray.length === 0 ? fullPokedex : colorArray;
      setColorFilter(colorFiltered)      
    }
    getColorFilters();
  }, [color])

  useEffect(() => {
    async function getTypeFilters(){  
      setLoading(true)       
      let typeArray = []
      for (let [key, value] of Object.entries(type)) {
        if (value) {
          const type = await getType(key)
          type.pokemon.map(element => typeArray.indexOf(element.pokemon.name) === -1 && element.pokemon.url.split('/')[6] <= 807 ? typeArray.push({name: element.pokemon.name, id: element.pokemon.url.split('/')[6]}) : null) 
        }  
      }  
      let typeFiltered = typeArray.length === 0 ? fullPokedex : typeArray    
      setTypeFilter(typeFiltered)
    }
    getTypeFilters();
  }, [type])

  useEffect(() => {    
    setLoading(true)
    let arrayOfFilters = [];
    let arrayIterable = [genderFilter, typeFilter, colorFilter, searchFilter];
    for (let value of arrayIterable){
        arrayOfFilters.push(...value)            
    }     
    const countRepeated = names => names.reduce((acc,elem) => ({...acc,
      [elem.name]: (acc[elem.name] || 0) + 1
    }), {})
    const repeated = elems => 
      Object.keys(elems).filter((element) => elems[element] >= 4);
    const commonArray = repeated(countRepeated(arrayOfFilters))
    let finalArray = arrayOfFilters.filter( (element,index) => commonArray.includes(element.name))
    let filteredArray = Array.from( new Set(finalArray.map( elem => elem.name))).map(element => {
      return finalArray.find( a => a.name === element)
    })
    dispatch(changePartialPokedex(filteredArray))
    setLoading(false)    
  }, [searchFilter, genderFilter, typeFilter, colorFilter])

  const handleLoadMore = () => {
    setLoading(true)
    const newLength = partialPokedex.length + 20
    if (fullPokedex.length > newLength) {
      const updatePartial = fullPokedex.filter((elem,index) => index < newLength )
      dispatch(changePartialPokedex(updatePartial))
    }
  }
  const isLoading = loading ? <Spinner animation="border" variant="primary" size="xl" /> : null
  return (
    <div className="pokemon-list">
      <h6>Choose a pokemon to get more information</h6>
      {isLoading}
      <Pokemons pokemons={partialPokedex} />
      {!search && <Button variant="info" onClick={handleLoadMore}>Load More</Button>}
    </div>
      
  )
}

export default PokemonList