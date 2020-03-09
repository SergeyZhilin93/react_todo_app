import React, { Component, Fragment } from 'react';
import { api } from '../../api'

export class Task extends Component {
  
  state = {
    inputValue: '',
    formActive: false
  }

  handleChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  toggleForm = e => {
    e.preventDefault()
    this.setState({ formActive: !this.state.formActive })
  }

  handleSubmit = e  => {
    e.preventDefault()
    api.put(`/tasks/${this.props.data.id}`, {name: this.state.inputValue, completed: this.props.data.completed })
  }
  
  render() {
    return(
      <Fragment >
        <div>
          <p>{`${this.props.index} ${this.props.data.name}`}</p>
          <button onClick={this.toggleForm} className='updateTask-button'>Изменить</button>
        </div>
        {
          this.state.formActive ?
          (
            <div>
              <input 
              onChange={this.handleChange} 
              type='text' 
              name='update' 
              className='task-update' 
              defaultValue={this.props.data.name}></input>
              <button onClick={this.handleSubmit} className='task-update-button'>Изменить задание</button>
            </div>
          )
          : null
        }
      </Fragment>
    )
  }
}