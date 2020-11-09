import {ACTIONS} from '../reducers/searchReducer';

export const changeSearch = (payload) => {
  return {
    type: ACTIONS.CHANGE_SEARCH,
    payload
  }
}

export const changeFullPokedex = (payload) => {
  return {
    type: ACTIONS.CHANGE_FULL_POKEDEX,
    payload
  }
}

export const changePartialPokedex = (payload) => {
  return {
    type: ACTIONS.CHANGE_PARTIAL_POKEDEX,
    payload
  }
}

export const changeType = (payload) => {
  return {
    type: ACTIONS.CHANGE_TYPE,
    payload
  }

}

export const changeColor = (payload) => {
  return {
    type: ACTIONS.CHANGE_COLOR,
    payload
  }
}

export const changeGender = (payload) => {
  return {
    type: ACTIONS.CHANGE_GENDER,
    payload
  }
}