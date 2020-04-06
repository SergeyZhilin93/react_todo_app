import React, { Fragment, useState } from 'react';
import { withRouter } from "react-router";
import { login as loginRequest } from '../../../api/auth.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import './style.css'

function Login(props) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  
  const handleUserNameChange = e => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    loginRequest({email: login, password})
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.headers))
        const route = res.data.data.isAdmin ? '/admin' : '/user'
        props.history.push(route)
      })
      .catch(() => alert('Неправильный email или пароль!'))
  }

  const handleBack = e => {
    e.preventDefault()
    props.history.goBack()
  }

    return (
      <Fragment>
        <p className='back-button'>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={handleBack}/>
        </p>
        <form className='login-form'>
          <p className='form-heading'>Login</p>
          <div className='form-group'>
            <label>Email :</label>
            <input onChange={handleUserNameChange} type='email' name='login' className='form-group-input'></input>
          </div>
          <div className='form-group'>
            <label>Password :</label>
            <input onChange={handlePasswordChange} type='password' name='password' className='form-group-input'></input>
          </div>
          <button onClick={handleSubmit} className='form-button'>Enter</button>
        </form>
      </Fragment>
    )
}

export default Login = withRouter(Login)