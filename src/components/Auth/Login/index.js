import React, { Component } from 'react';
import './style.css'

export class Login extends Component {
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
    console.log(this.state)
  }

  render() {
    return (
      <form className='login-form'>
        <div className='form-group'>
          <label>Email:</label>
          <input onChange={this.handleUserNameChange} type='email' name='login' className='form-group-input'></input>
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input onChange={this.handlePasswordChange} type='password' name='password' className='form-group-input'></input>
        </div>
        <button onClick={this.handleSubmit} className='form-button'>Enter</button>
      </form>
    )
  }
}