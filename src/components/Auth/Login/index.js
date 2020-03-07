import React, { Component } from 'react';
import { withRouter } from "react-router";
import { login } from '../../../api/auth.js';
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
      .then(() => this.props.history.push("/todo"))
      .catch(() => alert('Неправильный email или пароль!'))
  }

  render() {
    return (
      <form className='login-form'>
        <p className='form-heading'>Test Site</p>
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
    )
  }
}

export default Login = withRouter(Login)