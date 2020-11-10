import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {Formik} from "formik"
import * as Yup from "yup";
import { changeSearch } from '../actions/search.actions';

const Search = () => {
  const dispatch = useDispatch();
  let timeout;

  const formSchema = Yup.object().shape({
    search: Yup.string()
  }) 

  const handleChange = (event, setFieldValue, dispatch) => {
    const { value } = event.target
    dispatch(changeSearch(value))
    setFieldValue("search", value)    
  }
  return (
    <Formik
      initialValues = {{ search: ''}}
      validationSchema = {formSchema}
    >
      {({ values, touched, errors, setFieldValue, resetForm}) => (
        <Form>
          <Form.Group controlId="searchInput">
            <Form.Label>Search</Form.Label>
            <Form.Control name="search" type="text" placeholder="Search" onChange={(e) => handleChange(e, setFieldValue, dispatch) } value={values.search} className={touched.search && errors.search ? "is-invalid" : null} />
            {touched.search && errors.search ? (
              <div className="error-message">{errors.search}</div>
            ) : null}            
          </Form.Group>
        </Form>
      )}
    
    </Formik>
  )

}

export default Search