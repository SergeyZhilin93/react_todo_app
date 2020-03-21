import React, { Component } from 'react';
import { withRouter } from "react-router";
import { registration } from '../../../api/auth'


class Registration extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChangeEmail = e => this.setState({ email: e.target.value })

  hadleChangePassword = e => this.setState({ password: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    registration({email: this.state.email, password: this.state.password})
      .then(() => this.props.history.push('/'))
      .catch(() => alert('Oops, you lose'))
  }

  render() {
    return(
      <form>
        <div>
          <p>Email: </p>
          <input onChange={this.handleChangeEmail} type='email' name='email'></input>
        </div>
        <div>
          <p>Password: </p>
          <input onChange={this.hadleChangePassword} type='password' name='password'></input>
        </div>
        <button onClick={this.handleSubmit}>Registration</button>
      </form>
    )
  }
}

export default Registration = withRouter(Registration)