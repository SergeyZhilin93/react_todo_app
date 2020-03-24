import React, { Component, Fragment } from 'react'

export class Comments extends Component {
  render() {
    return(
      <Fragment>
        <form>
          <input></input>
          <button>Добавить коментарий</button>
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