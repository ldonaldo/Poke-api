import axios from 'axios';

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

export const getFullPokedex = async() => {
  try {
    const response = await axios({
      baseURL: POKEAPI_URL,
      url: '/pokedex/national',
      method: 'GET'
    })
    return response.data
  } catch(err){
    console.log(err)
  }
}

export const getPokemonSpecies = async(id) => {
  try {
    const response = await axios({
      baseURL: POKEAPI_URL,
      url: `pokemon-species/${id}`,
      method: 'GET'
    })
    return response.data
  } catch(err){
    console.log(err)
  } 
}

export const getPokemonDetails = async(id) => {
  try {
    const response = await axios({
      baseURL: POKEAPI_URL,
      url: `pokemon/${id}`,
      method: 'GET'
    })
    return response.data
  } catch(err){
    console.log(err)
  } 
}

export const getEvolutionChain = async(url) => {
  try {
    const response = await axios({
      url: url,
      method: 'GET'
    })
    return response.data
  } catch(err){
    console.log(err)
  }
}

export const getGender = async(gender) => {
  try {
    const response = await axios({
      baseURL: POKEAPI_URL,
      url: `gender/${gender}`,
      method: 'GET'
    })
    return response.data
  } catch(err){
    console.log(err)
  }
}

export const getColor = async(color) => {
  try {
    const response = await axios({
      baseURL: POKEAPI_URL,
      url: `pokemon-color/${color}`,
      method: 'GET'
    })
    return response.data
  } catch(err){

  }
}

export const getType = async(type) => {
  try {
    const response = await axios({
      baseURL: POKEAPI_URL,
      url: `type/${type}`,
      method: 'GET'
    })
    return response.data
  } catch(err){

  }
}