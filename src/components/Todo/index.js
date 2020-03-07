import React, { Component, Fragment } from "react";
import { Header } from '../Header';
import './style.css'

export class Todo extends Component {
  state = {
    task: '',
    tasks: []
  }

  handleInputChange = e => this.setState({ task: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ tasks: [...this.state.tasks, this.state.task] })
  }

  render() {
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
              this.state.tasks.map((task, index) => <p key={index}>{`${index + 1} ${task}`}</p>)
            }
          </div>
          <div></div>
        </form>
      </Fragment>
    )
  }
}