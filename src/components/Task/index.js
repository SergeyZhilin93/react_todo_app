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
    const { name, completed, id } = this.props.data  //достаем их объекта this.props.data нужные нам значения по ключам
    //строчка 24 короткая запись следующих строчек
    // const name = this.props.data.name
    // const completed = this.props.data.completed
    // const id = this.props.data.id
    e.preventDefault()
    this.props.onUpdateTask(name, completed, id)
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
                <FontAwesomeIcon icon={faTrashAlt} className='deleteTask-button' onClick={this.handleDelete}/>
              </div>
            )
            : 
            (
              <div>
                <p>{`${this.props.index} ${this.props.data.name}`}</p>
                <FontAwesomeIcon icon={faPenSquare} onClick={this.toggleForm} className='updateTask-button'/>
                <FontAwesomeIcon icon={faTrashAlt} className='deleteTask-button' onClick={this.handleDelete}/>
              </div>
            )
          }
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
              <FontAwesomeIcon icon={faCalendarCheck} onClick={this.handleComplete}/>
            </div>
          )
          : null
        }
      </Fragment>
    )
  }
}