import React, { Fragment, useState, useEffect } from 'react';
import { api } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export function Profile({history}) {
  const [editActive, setEditActive] = useState(false)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    api.post('/get_user', {}, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => setUser(res.data))
      .catch(() => history.goBack())
  }, {})

  const handleBack = () => history.goBack()

  const handleChangeInput = e => setUserName(e.target.value)

  const handleAvatarChange = e => setUserAvatar(e.target.value)

  const handleClickEdit = () => setEditActive(!editActive)

  const handleSubmit = e => {
    e.preventDefault()
    api.post('/update_user', { name: userName, avatar: userAvatar }, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => {
        setUser(res.data)
      })
      .catch(() => alert('Не получилось изменить данные!'))
    setEditActive(!editActive)
  }

  const { email, name, avatar_url } = user
  return(
    <Fragment>
      <p className='back-button'>
        <FontAwesomeIcon type='button' icon={faArrowAltCircleLeft} onClick={handleBack}/>
      </p>
      <form className='form-profile'>
        <p className='profile-head'>Your Profile</p>
        <div className='avatar-edit-blok'>
          <img src={avatar_url} className='avatar-user'></img>
          {
            editActive ? <input type='url' defaultValue={avatar_url} onChange={handleAvatarChange}></input> : null
          }
          <p className='paragraf-name'>Avatar</p>
        </div>
        <div className='name-blok'>
          {
            editActive ? <input type='text' defaultValue={name} onChange={handleChangeInput}></input> : null
          }
          <p className='paragraf-name'>Name: {name}</p>
        </div>
        <p className='paragraf-name'>Email: {email}</p>
      {
        editActive ? <button onClick={handleSubmit}>SAVE</button> : <FontAwesomeIcon icon={faPenSquare} onClick={handleClickEdit}/>
      }
      </form>
    </Fragment>
  )
}