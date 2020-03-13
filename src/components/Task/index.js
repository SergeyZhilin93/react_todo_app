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
    const { name, completed, id } = this.props.data  //достаем из объекта this.props.data нужные нам значения по ключам
    //строчка 24 короткая запись следующих строчек
    // const name = this.props.data.name
    // const completed = this.props.data.completed
    // const id = this.props.data.id
    e.preventDefault()
      this.props.onUpdateTask(name, completed, id)
      this.setState({ formActive: !this.state.formActive })
  }

  handleDelete = e => {
    e.preventDefault()
    api.delete(`/tasks/${this.props.data.id}`)
  }

  handleComplete = e => {
    const { name, completed, id } = this.props.data
    e.preventDefault()
    this.props.onCompletesdTask(name, completed, id)
    this.setState({ formActive: !this.state.formActive })
  }
  
  render() {
    return(
      <Fragment >
        <div>
          {
            this.props.data.completed ? 
            (
              <div className='complete-task-list'>
                <p className='completed-task'>{`${this.props.index} ${this.props.data.name}`}</p>
                <FontAwesomeIcon icon={faTrashAlt} className='deleteTask-button' onClick={this.handleDelete}/>
              </div>
            )
            : 
            (
              <div className='task-list'>
                <p className='text-list'>{`${this.props.index} ${this.props.data.name}`}</p>
                <p className='updateTask-button'>
                  <FontAwesomeIcon icon={faPenSquare} onClick={this.toggleForm} />
                </p>
                <p className='deleteTask-button'>
                  <FontAwesomeIcon icon={faTrashAlt} onClick={this.handleDelete}/>
                </p>
              </div>
            )
          }
        </div>
        {
          this.state.formActive ?
          (
            <div className='update-form'>
              <input 
              onChange={this.handleChange} 
              type='text' 
              name='update' 
              className='task-update' 
              defaultValue={this.props.data.name}></input>
              <button onClick={this.handleSubmit} className='task-update-button'>Изменить задание</button>
              <p className='task-complete-button'>
                <FontAwesomeIcon icon={faCalendarCheck} onClick={this.handleComplete}/>
              </p>
            </div>
          )
          : null
        }
      </Fragment>
    )
  }
}