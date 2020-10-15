import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import Form from './Form';
import {schema} from './Schema';


const initialFormValues = {
  name: '',
  email: '',
  password: '',
  serviceTerms: false,
};
const initialFormErrors = {
  username: '',
  email: '',
  password: '',
  serviceTerms: '',
};



function App() {

  let [ users, setUsers ] = useState([]);
  let [ formValues, setFormValues ] = useState(initialFormValues);
  let [ formErrors, setFormErrors ] = useState(initialFormErrors);
  let [ disabled, setDisabled ] = useState(true)

  let postUser = (newUser) => {
    Axios
      .post(`https://reqres.in/api/users`, newUser)
      .then((res) => {
        setUsers([...users, res.data]);
      })
      .catch((err) => {
        debugger
        alert(`Got an error there bud.`)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  let change = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch((err) => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })

    setFormValues({...formValues, [name]: value })
  }

  let submit = () => {
    let newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      serviceTerms: formValues.serviceTerms,
    }
    postUser(newUser)
  }

  useEffect(() => {
    Axios
      .get(`https://reqres.in/api/users`)
      .then((res) => {
        setUsers(res.data.data)
      })
      .catch((err) => {
        alert(`Got an error there bud.`)
      })
  }, [])

  useEffect(() => {
    schema.isValid(formValues)
      .then((valid) => {
        setDisabled(!valid)
      })
  }, [formValues])




  return (
    <>
      <Form
      values={formValues}
      change={change}
      submit={submit}
      disabled={disabled}
      errors={formErrors}
      />
      {users.map((user) => {
        return(
          <div>
            <h1>{user.name}</h1>
            <p>Contact: {user.email}</p>
          </div>
        )
      })}
    </>
  );
}

export default App;
