import React, { Component, Fragment } from 'react';
import { api } from '../../api'
import { Comments } from '../Comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrashAlt, faCalendarCheck, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export class Task extends Component {
  
  state = {
    inputValue: '',
    formActive: false,
    isAdmin: true,
    commentActive: false,
    comments: []
  }

  componentDidMount() {
    this.setState({ comments: this.props.data.comments})
  }

  handleChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  toggleForm = e => {
    e.preventDefault()
    this.setState({ formActive: !this.state.formActive })
  }

  handleUpdate = e  => {
    const { completed, id } = this.props.data  //достаем из объекта this.props.data нужные нам значения по ключам
    //строчка 24 короткая запись следующих строчек
    // const name = this.props.data.name
    // const completed = this.props.data.completed
    // const id = this.props.data.id
    e.preventDefault()
      this.props.onUpdateTask(this.state.inputValue, completed, id)
      this.setState({ formActive: !this.state.formActive })
  }

  handleDelete = e => {
    const {id} = this.props.data
    e.preventDefault()
    this.props.onDeleteTask(id)
    // api.delete(`/tasks/${this.props.data.id}`)
  }

  handleComplete = e => {
    const { name, completed, id } = this.props.data
    e.preventDefault()
    this.props.onCompletesdTask(name, !completed, id)
    this.setState({ formActive: !this.state.formActive })
  }

  handleComments = () => this.setState({ commentActive: !this.state.commentActive })

  handleSubmitComments = (comment, taskId) => {
    api.post('/comments', {comment: comment, task_id: taskId }, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => this.setState({ comments: [...this.state.comments, res.data] }))
      .catch(() => alert('Все плохо!'))
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
                <p className='task-complete-button'>
                  <FontAwesomeIcon icon={faCalendarCheck} onClick={this.handleComplete}/>
                </p>
                <p className='task-comment-button'>
                  <FontAwesomeIcon icon={faCommentDots} onClick={this.handleComments}/>
                </p>
              </div>
            )
          }
        </div>
        {
          this.state.formActive ?
          (
            <form className='update-form'>
              <input 
              onChange={this.handleChange} 
              type='text' 
              name='update' 
              className='task-update' 
              defaultValue={this.props.data.name}
              onKeyPress={this.preventFormSubmit}
              >
              </input>
              <button onClick={this.handleUpdate} className='task-update-button'>Изменить задание</button>
            </form>
          )
          : null
        }
        {
          this.state.commentActive ? <Comments onSubmitComent={this.handleSubmitComments} taskId={this.props.data.id} comments={this.state.comments}/> : null
        }
      </Fragment>
    )
  }
}