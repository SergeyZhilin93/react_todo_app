import React, { Fragment, useState } from 'react';
import { withRouter } from "react-router";
import { registration } from '../../../api/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import './style.css'


function Registration(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleChangeEmail = e => setEmail(e.target.value)

  const hadleChangePassword = e => setPassword(e.target.value)

  const handlePasswordConfirmation = e => setPasswordConfirmation(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    registration({email, password, password_confirmation: passwordConfirmation})
      .then(() => props.history.push('/'))
      .catch(() => alert('Oops, you lose'))
  }

  const handleBack = e => {
    e.preventDefault()
    props.history.goBack()
  }

    return(
      <Fragment>
        <p className='back-button'>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={handleBack}/>
        </p>
        <form className='form-reg'>
          <p className='title-reg'>Registration</p>
          <div className='form-group'>
            <p className='title-input'>Email: </p>
            <input onChange={handleChangeEmail} type='email' name='email' className='form-group-input'></input>
          </div>
          <div className='form-group'>
            <p className='title-input'>Password: </p>
            <input onChange={hadleChangePassword} type='password' name='password' className='form-group-input'></input>
          </div>
          <div className='form-group'>
            <p className='title-input'>Again password: </p>
            <input onChange={handlePasswordConfirmation} type='password' className='form-group-input'></input>
          </div>
          <button onClick={handleSubmit} className='form-reg-button'>Registration</button>
        </form>
      </Fragment>
    )
  }

export default Registration = withRouter(Registration)