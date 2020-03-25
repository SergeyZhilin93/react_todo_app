import React, { Component, Fragment } from 'react'
import { api } from '../../api';

export class Comments extends Component {
  state = {
    inputValue: ''
  }

  handleChangeComment = e => this.setState({ inputValue: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmitComent(this.state.inputValue, this.props.taskId )
  }

  render() {
    return(
      <Fragment>
        <form>
          <input type='text' onChange={this.handleChangeComment}></input>
          <button onClick={this.handleSubmit}>Добавить коментарий</button>
        </form>
          {
            this.props.comments.map(comment => {
              return (
                <div key={comment.id}>
                  <span>{comment.author}</span>
                  <span>{comment.comment}</span>
                </div>)
            })
          }
      </Fragment>
    )
  }
}