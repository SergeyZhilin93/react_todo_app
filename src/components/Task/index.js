import React, { Component, Fragment } from 'react';
import { api } from '../../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrashAlt, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export class Task extends Component {
  
  state = {
    inputValue: '',
    formActive: false,
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

  handleDelete = e => {
    e.preventDefault()
    api.delete(`/tasks/${this.props.data.id}`)
  }

  handleComplete = e => {
    e.preventDefault()
    api.put(`/tasks/${this.props.data.id}`, {name: this.props.data.name, completed: !this.props.data.completed })
  }
  
  render() {
    return(
      <Fragment >
        <div>
          {
            this.props.data.completed ? 
            (
              <div>
                <p className='completed-task'>{`${this.props.index} ${this.props.data.name}`}</p>
                <button className='deleteTask-button' onClick={this.handleDelete}>Удалить</button>
              </div>
            )
            : 
            (
              <div>
                <p>{`${this.props.index} ${this.props.data.name}`}</p>
                <button onClick={this.toggleForm} className='updateTask-button'>Изменить</button>
                <button className='deleteTask-button' onClick={this.handleDelete}>Удалить</button>
              </div>
            )
          }
          {/* <p>{`${this.props.index} ${this.props.data.name}`}</p> */}
          {/* <button onClick={this.toggleForm} className='updateTask-button'>Изменить</button>
          <button className='deleteTask-button' onClick={this.handleDelete}>Удалить</button> */}
          {/* <button onClick={this.handleComplete}>com</button> */}
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
              <button onClick={this.handleComplete}>Complete</button>
            </div>
          )
          : null
        }
      </Fragment>
    )
  }
}