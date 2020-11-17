import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { changeType, changeColor, changeGender} from '../../actions/search.actions';
import './Filters.scss';

const Filters = () => {
  const dispatch = useDispatch();
  const typeFilter = useSelector( state => state.searchReducer.type)
  const colorFilter = useSelector( state => state.searchReducer.color)
  const genderFilter = useSelector( state => state.searchReducer.gender)

  const checkBoxType = [
    {
      name: 'bug',
      key: '1',
      label: 'Bug'
    },
    {
      name: 'psychic',
      key: '2',
      label: 'Psychic'
    },
    {
      name: 'electric',
      key: '3',
      label: 'Electric'
    },
    {
      name: 'fighting',
      key: '4',
      label: 'Fighting'
    },
    {
      name: 'water',
      key: '5',
      label: 'Water'
    },
    {
      name: 'fairy',
      key: '6',
      label: 'Fairy'
    },
    {
      name: 'ground',
      key: '7',
      label: 'Ground'
    },
    {
      name: 'dark',
      key: '8',
      label: 'Dark'
    },
    {
      name: 'fire',
      key: '9',
      label: 'Fire'
    },
    {
      name: 'dragon',
      key: '10',
      label: 'Dragon'
    },
    {
      name: 'ice',
      key: '11',
      label: 'Ice'
    },
    {
      name: 'steel',
      key: '12',
      label: 'Steel'
    },
    {
      name: 'flying',
      key: '13',
      label: 'Flying'
    },
    {
      name: 'plant',
      key: '14',
      label: 'Plant'
    },
    {
      name: 'rock',
      key: '15',
      label: 'Rock'
    },
    {
      name: 'poison',
      key: '16',
      label: 'Poison'
    },
    {
      name: 'normal',
      key: '17',
      label: 'Normal'
    },
    {
      name: 'ghost',
      key: '18',
      label: 'Ghost'
    },
    {
      name: 'grass',
      key: '19',
      label: 'Grass'
    },
    {
      name: 'unknown',
      key: '20',
      label: 'Unknown'
    },
  ]

  const radioButton = [
    {name: 'All', value: 'all'},
    {name: 'Male', value: 'male'},
    {name: 'Female', value: 'female'},
    {name: 'Undefined', value: 'genderless'}
  ]
  const checkBoxColor = [
    {
      name: 'blue',
      key: '1',
      label: 'Blue'
    },
    {
      name: 'yellow',
      key: '2',
      label: 'Yellow'
    },
    {
      name: 'red',
      key: '3',
      label: 'Red'
    },
    {
      name: 'brown',
      key: '4',
      label: 'Brown'
    },
    {
      name: 'gray',
      key: '5',
      label: 'Gray'
    },
    {
      name: 'green',
      key: '6',
      label: 'Green'
    },
    {
      name: 'purple',
      key: '7',
      label: 'Purple'
    },
    {
      name: 'white',
      key: '8',
      label: 'White'
    },
    {
      name: 'pink',
      key: '9',
      label: 'Pink'
    },
    {
      name: 'black',
      key: '10',
      label: 'Black'
    },
  ];

  const handleChangeType = (event) => {
    let obj = {...typeFilter, [event.target.name]: event.target.checked};
    dispatch(changeType(obj))
  }
  const handleChangeColor = (event) => {
    let obj = {...colorFilter, [event.target.name] : event.target.checked};
    dispatch(changeColor(obj))
  }
  const handleChangeGender = (value) => {
    dispatch(changeGender(value))
  }

  const typeCheckboxes = checkBoxType.map((element, index) => (
    <div key={index}>      
        <input name={element.name} type="checkbox" checked={typeFilter.name} onChange={handleChangeType} />
        <label>{element.label}</label>      
    </div>
  ))
  const colorCheckboxes = checkBoxColor.map((element, index) => (
    <div key={index}>      
      <input name={element.name} type="checkbox" checked={colorFilter.name} onChange={handleChangeColor} />
      <label>{element.label}</label>      
    </div>
  ))
  const genderRadioButtons = radioButton.map((element, index) => (        
    <div key={index}>      
      <input type="radio" name="radio" onChange={() => handleChangeGender(element.value)} />
      <label>{element.name}</label>      
    </div>        
  ))  
  return (
    <div className="filter-content">
      <h3 className="title">Filters</h3>      
      <div className="filter-type">
        <h6 className="title">Type</h6>  
        <div className="type-checkboxes">
          {typeCheckboxes}
        </div>        
      </div>
      <div className="filter-color">
        <h6 className="title">Color</h6>
        <div className="color-checkboxes">
          {colorCheckboxes}
        </div>        
      </div>
      <div className="filter-gender">
        <h6 className="title">Gender</h6>
        <div className="gender-radiobuttons">
          {genderRadioButtons} 
        </div>
      </div> 
    </div>
  )

}

export default Filters;