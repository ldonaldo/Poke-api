import {createStore, combineReducers} from 'redux';
import {searchReducer} from './searchReducer';

const rootReducer = combineReducers({ searchReducer });

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store