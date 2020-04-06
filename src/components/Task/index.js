import React, { Fragment, useState, useEffect } from 'react';
import { api } from '../../api'
import { Comments } from '../Comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrashAlt, faCalendarCheck, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export function Task({data, onUpdateTask, onDeleteTask, onCompletesdTask, isAdmin: isAdminProp, index}) {
  const [inputValue, setInputValue] = useState('')
  const [formActive, setFormActive] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [commentActive, setCommentActive] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    setComments(data.comments)
  }, [])

  const handleChange = e => {
    setInputValue(e.target.value)
  }

  const toggleForm = e => {
    e.preventDefault()
    setFormActive(!formActive)
  }

  const handleUpdate = e  => {
    const { completed, id } = data  //достаем из объекта this.props.data нужные нам значения по ключам
    //строчка 24 короткая запись следующих строчек
    // const name = this.props.data.name
    // const completed = this.props.data.completed
    // const id = this.props.data.id
    e.preventDefault()
      onUpdateTask(inputValue, completed, id)
      setFormActive(!formActive)
  }

  const handleDelete = e => {
    const {id} = data
    e.preventDefault()
    onDeleteTask(id)
    // api.delete(`/tasks/${this.props.data.id}`)
  }

  const handleComplete = e => {
    const { name, completed, id } = data
    e.preventDefault()
    onCompletesdTask(name, !completed, id)
  }

  const handleComments = () => setCommentActive(!commentActive)

  const handleSubmitComments = (comment, taskId) => {
    api.post('/comments', {comment, task_id: taskId }, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => setComments([...comments, res.data]))
      .catch(() => alert('Все плохо!'))
  }
  
  const {completed, performer, name, id} = data
  return(
    <Fragment >
      <div>
        <div className='task-list'>
          <p className={completed ? 'completed-task' : ''}>{`${index} ${name}`}</p>
          <span>({performer})</span>
          { 
            isAdminProp ? (
              <Fragment>
                <p className='deleteTask-button'>
                  <FontAwesomeIcon icon={faTrashAlt} onClick={handleDelete}/>
                </p>
                {
                  !completed ? (
                  <p className='updateTask-button'>
                    <FontAwesomeIcon icon={faPenSquare} onClick={toggleForm} />
                  </p>
                  ) : null
                }
              </Fragment>
            ) : null 
          }
          {
            !completed ? (
              <Fragment>
                <p className='task-complete-button'>
                  <FontAwesomeIcon icon={faCalendarCheck} onClick={handleComplete}/>
                </p>
                <p className='task-comment-button'>
                  <FontAwesomeIcon icon={faCommentDots} onClick={handleComments}/>
                </p>
              </Fragment>
            ) : null
          }
        </div>
    </div>
      {
        formActive ?
        (
          <form className='update-form'>
            <input 
              onChange={handleChange} 
              type='text' 
              name='update' 
              className='task-update' 
              defaultValue={name}
            />
            <button onClick={handleUpdate} className='task-update-button'>Изменить задание</button>
          </form>
        )
        : null
      }
      {
        commentActive ? <Comments onSubmitComent={handleSubmitComments} taskId={id} comments={comments}/> : null
      }
    </Fragment>
  )
}