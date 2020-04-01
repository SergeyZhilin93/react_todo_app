import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router";
import { registration } from '../../../api/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import './style.css'


class Registration extends Component {
  state = {
    email: '',
    password: '',
    PasswordConfirmation: ''
  }

  handleChangeEmail = e => this.setState({ email: e.target.value })

  hadleChangePassword = e => this.setState({ password: e.target.value })

  handlePasswordConfirmation = e => this.setState({ PasswordConfirmation: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    registration({email: this.state.email, password: this.state.password, password_confirmation: this.state.PasswordConfirmation})
      .then(() => this.props.history.push('/'))
      .catch(() => alert('Oops, you lose'))
  }

  handleBack = e => {
    e.preventDefault()
    this.props.history.goBack()
  }

  render() {
    return(
      <Fragment>
        <p className='back-button'>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={this.handleBack}/>
        </p>
        <form className='form-reg'>
          <p className='title-reg'>Registration</p>
          <div className='form-group'>
            <p className='title-input'>Email: </p>
            <input onChange={this.handleChangeEmail} type='email' name='email' className='form-group-input'></input>
          </div>
          <div className='form-group'>
            <p className='title-input'>Password: </p>
            <input onChange={this.hadleChangePassword} type='password' name='password' className='form-group-input'></input>
          </div>
          <div className='form-group'>
            <p className='title-input'>Again password: </p>
            <input onChange={this.handlePasswordConfirmation} type='password' className='form-group-input'></input>
          </div>
          <button onClick={this.handleSubmit} className='form-reg-button'>Registration</button>
        </form>
      </Fragment>
    )
  }
}

export default Registration = withRouter(Registration)