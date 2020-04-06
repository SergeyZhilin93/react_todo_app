import React, { Fragment, useState, useEffect } from 'react'
import { Header } from '../Header';
import { api } from '../../api';
import { Task } from '../Task';
import './style.css'

export function User(props) {
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState({})
  
  useEffect(() => {
    api.post('/get_user', {}, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => setUser(res.data))
      .catch(() => props.history.push('/'))
    api.get('/tasks', {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => setTasks(res.data))
      .catch(err => console.log('Error has accured during fetching tasks', err))
  }, [])

  const handleCompleteTask = (name, completed, id) => {
    const confirmComplete = window.confirm('Вы действительно хотите завершить задачу?')
    if (confirmComplete) {
      api.put(`/tasks/${id}`, { name, completed }, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => {
        const initialTasks = [...tasks]
        const completedTask = initialTasks.find(task => res.data.id == task.id )
        completedTask.completed = res.data.completed
        setTasks(initialTasks)
      })
    }
  }
  
    const { isAdmin } = user
    return(
      <Fragment>
        <Header author={user.email} avatar={user.avatar_url}/>
        <div className='new-task'>
          <div className='tasks-list'>
            <p className='tasks-list-head'>Список заданий:</p>
            {
              tasks.map((task, index) => <Task isAdmin={isAdmin} onCompletesdTask={handleCompleteTask} key={task.id} data={task} index={index + 1}/>)
            }
          </div>
        </div>
      </Fragment>
    )
  }