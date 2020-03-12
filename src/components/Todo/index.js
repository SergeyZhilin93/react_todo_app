import React, { Component, Fragment } from "react";
import { Header } from '../Header';
import { api } from '../../api';
import { Task } from '../Task';
import './style.css'

export class Todo extends Component {
  state = {
    task: '',
    tasks: []
  }
  
  componentDidMount() {
    api.get('/tasks')
      .then(res => this.setState({ tasks: res.data }))
      .catch(err => console.log('Error has accured during fetching tasks', err))
  }

  handleInputChange = e => this.setState({ task: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    api.post('/tasks', { name: this.state.task })
      .then(res => this.setState({ tasks: [...this.state.tasks, res.data]}) )
      .catch(err => console.log('Error has accured during creating task', err))
  }

  handleUpdateTask = (name, completed, id) => {
    api.put(`/tasks/${id}`, { name, completed })
    .then(res => {
      const updatedTask = this.state.tasks.find(task => res.data.id == task.id )
      if (!updatedTask) return
      updatedTask.name = res.data.name
      this.setState({ tasks: this.state.tasks})
    })
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
        <form className='form-tasks'>
          <div className='new-task'>
            <p className='new-task-head'>Новая задача:</p>
            <input onChange={this.handleInputChange} type='text' name='new-task' className='new-task-input'></input>
            <button onClick={this.handleSubmit} className='new-task-button' >Создать задачу</button>
          </div>
          <div className='tasks-list'>
            <p className='tasks-list-head'>Список заданий:</p>
            {
              this.state.tasks.map((task, index) => <Task onUpdateTask={this.handleUpdateTask} key={task.id} data={task} index={index + 1}/>)
            }
          </div>
        </form>
      </Fragment>
    )
  }
}