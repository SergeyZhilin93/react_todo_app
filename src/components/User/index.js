import React, { Component, Fragment } from 'react'
import { Header } from '../Header';
import { api } from '../../api';
import { Task } from '../Task';
import './style.css'

export class User extends Component {
  state = {
    tasks: [],
    user: {}
  }
  
  componentDidMount() {
    api.post('/get_user', {}, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => this.setState({ user: res.data }))
      .catch(() => this.props.history.push('/'))
    api.get('/tasks', {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => this.setState({ tasks: res.data }))
      .catch(err => console.log('Error has accured during fetching tasks', err))
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
  
  render() {
    const { isAdmin } = this.state.user
    return(
      <Fragment>
        <Header/>
        <div className='new-task'>
          <div className='tasks-list'>
            <p className='tasks-list-head'>Список заданий:</p>
            {
              this.state.tasks.map((task, index) => <Task isAdmin={isAdmin} onCompletesdTask={this.handleCompleteTask} key={task.id} data={task} index={index + 1}/>)
            }
          </div>
        </div>
      </Fragment>
    )
  }
}