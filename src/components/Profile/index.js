import React, { Component } from 'react';
import { withRouter } from "react-router";

export class Profile extends Component {

  handleBack = e => {
    e.preventDefault()
    this.props.history.push('/admin')
  }

  render() {
    return(
      <div>
        <button onClick={this.handleBack}>Back</button>
        <p>user Name</p>
        <p>Nikname</p>
      </div>
    )
  }
}