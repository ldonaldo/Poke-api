let initialState = {
  search: '',
  fullPokedex : [],
  partialPokedex : [],
  type: {
    bug: false,
    psychic: false,
    electric: false,
    fighting: false,
    water: false,
    fairy: false,
    ground: false,
    sinister: false,
    fire: false,
    dragon: false,
    ice: false,
    steel: false,
    flying: false,
    plant: false,
    rock: false,
    poison: false,
    normal: false,
    ghost: false,
    grass: false,
    unknown: false
  },
  color: {
    blue: false,
    yellow: false,
    red: false,
    brown: false,
    orange: false,
    green: false,
    purple: false,
    white: false,
    pink: false,
    black: false
  },
  gender: 'all'
}

export const ACTIONS = {
  CHANGE_SEARCH : 'CHANGE_SEARCH',
  CHANGE_FULL_POKEDEX : 'CHANGE_FULL_POKEDEX',
  CHANGE_PARTIAL_POKEDEX : 'CHANGE_PARTIAL_POKEDEX',
  CHANGE_TYPE: 'CHANGE_TYPE',
  CHANGE_COLOR: 'CHANGE_COLOR',
  CHANGE_GENDER: 'CHANGE_GENDER'
}

export const searchReducer = (state = initialState, action) => {
  switch(action.type){
    case ACTIONS.CHANGE_SEARCH:
      return {
        ...state,
        search: action.payload
      }
    case ACTIONS.CHANGE_FULL_POKEDEX:
      return {
        ...state,
        fullPokedex: action.payload
      }
    case ACTIONS.CHANGE_PARTIAL_POKEDEX:
      return {
        ...state,
        partialPokedex: action.payload
      }
    case ACTIONS.CHANGE_TYPE:
      return {
        ...state,
        type: action.payload
      }
    case ACTIONS.CHANGE_COLOR:
      return {
        ...state,
        color: action.payload
      }
    case ACTIONS.CHANGE_GENDER:
      return {
        ...state,
        gender: action.payload
      }
    default:
      return state
  }
}