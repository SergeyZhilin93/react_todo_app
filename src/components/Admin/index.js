import React, { Component, Fragment } from "react";
import { Header } from '../Header';
import { api } from '../../api';
import { Task } from '../Task';
import './style.css'

export class Admin extends Component {
  state = {
    task: '',
    tasks: [],
    createTaskDisabled: false 
  }
  
  componentDidMount() {
    api.get('/tasks', {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => this.setState({ tasks: res.data }))
      .catch(err => console.log('Error has accured during fetching tasks', err))
  }

  handleInputChange = e => this.setState({ task: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.task.length == 0) return
    const { createTaskDisabled, task, tasks } = this.state
    if (createTaskDisabled == false) {
      this.setState({ createTaskDisabled: true})
      api.post('/tasks', { name: task }, {headers: JSON.parse(localStorage.getItem('user'))})
        .then(res => this.setState({ tasks: [...tasks, res.data], createTaskDisabled: false}))
        .catch(() => this.setState({ createTaskDisabled: false}))
    }
  }

  handleUpdateTask = (name, completed, id) => {
    api.put(`/tasks/${id}`, { name, completed }, {headers: JSON.parse(localStorage.getItem('user'))})
    .then(res => {
      const updatedTask = this.state.tasks.find(task => res.data.id == task.id )
      if (!updatedTask) return
      updatedTask.name = res.data.name
      this.setState({ tasks: this.state.tasks})
    })
  }

  handleCompleteTask = (name, completed, id) => {
    const confirmComplete = window.confirm('Вы действительно хотите завершить задачу?')
    if (confirmComplete) {
      api.put(`/tasks/${id}`, { name, completed }, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => {
        const completedTask = this.state.tasks.find(task => res.data.id == task.id )
        completedTask.completed = res.data.completed
        this.setState({ tasks: this.state.tasks})
      })
    }
  }

  handleDeleteTask = id => {
    const confirmDelete = window.confirm('Вы действительно хотите удалить задачу?')
    if (confirmDelete) {
      api.delete(`/tasks/${id}`, {headers: JSON.parse(localStorage.getItem('user'))})
        .then(res => {
          const deleteTask = this.state.tasks.filter(task => res.data.id !== task.id)
          this.setState({tasks: deleteTask})
        })
    }
  }

  render() {
    // this.props.data = {
    //   name: 'asd',
    //   completed: false,
    //   created_at: 'sdvdfvdf',
    //   updated_at: 'asdasdas',
    //   id: 1
    // }
    return(
      <Fragment>
        <Header/>
        <div className='new-task'>
          <form className='form-task'>
            <span>Исполнитель: </span>
            <input type='email' placeholder='email'></input>
            <p className='new-task-head'>Новая задача:</p>
            <input onChange={this.handleInputChange} type='text' name='new-task' className='new-task-input'></input>
            <button onClick={this.handleSubmit} className='new-task-button' disabled={this.state.createTaskDisabled}>Создать задачу</button>
          </form>
          <div className='tasks-list'>
            <p className='tasks-list-head'>Список заданий:</p>
            {
              this.state.tasks.map((task, index) => <Task onDeleteTask={this.handleDeleteTask} onCompletesdTask={this.handleCompleteTask} onUpdateTask={this.handleUpdateTask} key={task.id} data={task} index={index + 1}/>)
            }
          </div>
        </div>
      </Fragment>
    )
  }
}