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
    isAdmin: false,
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
  }

  handleComments = () => this.setState({ commentActive: !this.state.commentActive })

  handleSubmitComments = (comment, taskId) => {
    api.post('/comments', {comment: comment, task_id: taskId }, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => this.setState({ comments: [...this.state.comments, res.data] }))
      .catch(() => alert('Все плохо!'))
  }
  
  render() {
    const { isAdmin, data: { completed } } = this.props
    return(
      <Fragment >
        <div>
          <div className='task-list'>
            <p className={completed ? 'completed-task' : ''}>{`${this.props.index} ${this.props.data.name}`}</p>
            { 
              isAdmin ? (
                <Fragment>
                  <p className='deleteTask-button'>
                    <FontAwesomeIcon icon={faTrashAlt} onClick={this.handleDelete}/>
                  </p>
                  {
                    !completed ? (
                    <p className='updateTask-button'>
                      <FontAwesomeIcon icon={faPenSquare} onClick={this.toggleForm} />
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
                    <FontAwesomeIcon icon={faCalendarCheck} onClick={this.handleComplete}/>
                  </p>
                  <p className='task-comment-button'>
                    <FontAwesomeIcon icon={faCommentDots} onClick={this.handleComments}/>
                  </p>
                </Fragment>
              ) : null
            }
          </div>
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
              />
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