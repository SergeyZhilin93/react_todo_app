import React, { Fragment, useState } from 'react'

export function Comments({onSubmitComent, taskId, comments}) {
  const [inputValue, setInputValue] = useState('')

  const handleChangeComment = e => setInputValue(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    onSubmitComent(inputValue, taskId )
  }

    return(
      <Fragment>
        <form>
          <input type='text' onChange={handleChangeComment}></input>
          <button onClick={handleSubmit}>Добавить коментарий</button>
        </form>
          {
            comments.map(comment => {
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