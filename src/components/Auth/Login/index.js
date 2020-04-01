import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router";
import { login } from '../../../api/auth.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import './style.css'

class Login extends Component {
  state = {
    login: '',
    password: ''
  }
  
  handleUserNameChange = e => {
    this.setState({ login: e.target.value })
  }

  handlePasswordChange = e => {
    this.setState({ password: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    login({email: this.state.login, password: this.state.password})
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.headers))
        const route = res.data.data.isAdmin ? '/admin' : '/user'
        this.props.history.push(route)
      })
      .catch(() => alert('Неправильный email или пароль!'))
  }

  handleBack = e => {
    e.preventDefault()
    this.props.history.goBack()
  }

  render() {
    return (
      <Fragment>
        <p className='back-button'>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={this.handleBack}/>
        </p>
        <form className='login-form'>
          <p className='form-heading'>Login</p>
          <div className='form-group'>
            <label>Email :</label>
            <input onChange={this.handleUserNameChange} type='email' name='login' className='form-group-input'></input>
          </div>
          <div className='form-group'>
            <label>Password :</label>
            <input onChange={this.handlePasswordChange} type='password' name='password' className='form-group-input'></input>
          </div>
          <button onClick={this.handleSubmit} className='form-button'>Enter</button>
        </form>
      </Fragment>
    )
  }
}

export default Login = withRouter(Login)