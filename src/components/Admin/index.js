import React, { Fragment, useState, useEffect } from "react";
import { Header } from '../Header';
import { api } from '../../api';
import { Task } from '../Task';
import './style.css'

export function Admin(props) {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [createTaskDisabled, setCreateTaskDisabled] = useState(false)
  const [user, setUser] = useState({})
  const [email, setEmail] = useState('')
  
  useEffect(() => {
    api.post('/get_user', {}, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => {
        if (!res.data.isAdmin) return props.history.push('/')
        setUser(res.data)
      })
      .catch(() => props.history.push('/'))
    api.get('/tasks', {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => setTasks(res.data))
      .catch(err => console.log('Error has accured during fetching tasks', err))
  }, [])

  const handleInputChange = e => setTask(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    if (task.length == 0) return
    if (createTaskDisabled == false) {
      if (email == user.email || email.length == 0) return alert('Введите email пользователя!')
      setCreateTaskDisabled(true)
      api.post('/tasks', { name: task, email }, {headers: JSON.parse(localStorage.getItem('user'))})
        .then(res => {
          setTasks([...tasks, res.data])
          setCreateTaskDisabled(false)})
        .catch(() => setCreateTaskDisabled(false))
    }
  }

  const handleUpdateTask = (name, completed, id) => {
    api.put(`/tasks/${id}`, { name, completed }, {headers: JSON.parse(localStorage.getItem('user'))})
    .then(res => {
      const initialTasks = [...tasks]
      const updatedTask = initialTasks.find(task => res.data.id == task.id )
      if (!updatedTask) return
      updatedTask.name = res.data.name
      setTasks(initialTasks)
    })
  }

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

  const handleDeleteTask = id => {
    const confirmDelete = window.confirm('Вы действительно хотите удалить задачу?')
    if (confirmDelete) {
      api.delete(`/tasks/${id}`, {headers: JSON.parse(localStorage.getItem('user'))})
        .then(res => {
          const initialTasks = [...tasks]
          const filteredTasks = initialTasks.filter(task => res.data.id !== task.id)
          setTasks(filteredTasks)
        })
    }
  }

  const handleUserEmail = e => setEmail(e.target.value)

    const { isAdmin, email: userEmail, avatar_url } = user
    return(
      <Fragment>
        <Header author={userEmail} avatar={avatar_url}/>
        <div className='new-task'>
          <form className='form-task'>
            <span>Исполнитель: </span>
            <input type='email' placeholder='email' onChange={handleUserEmail}></input>
            <p className='new-task-head'>Новая задача:</p>
            <input onChange={handleInputChange} type='text' name='new-task' className='new-task-input'></input>
            <button onClick={handleSubmit} className='new-task-button' disabled={createTaskDisabled}>Создать задачу</button>
          </form>
          <div className='tasks-list'>
            <p className='tasks-list-head'>Список заданий:</p>
            {
              tasks.map((task, index) => {
                return (<Task 
                        isAdmin={isAdmin} 
                        onDeleteTask={handleDeleteTask} 
                        onCompletesdTask={handleCompleteTask} 
                        onUpdateTask={handleUpdateTask} 
                        key={task.id} 
                        data={task} 
                        index={index + 1}
                      />)
                    })
            }
          </div>
        </div>
      </Fragment>
    )
  }