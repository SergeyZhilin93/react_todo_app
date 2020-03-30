import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router";
import { api } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export class Profile extends Component {
  state = {
    editActive: false,
    userName: '',
    userAvatar: '',
    user: {}
  }

  componentDidMount() {
    api.post('/get_user', {}, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => this.setState({ user: res.data }))
      .catch(() => this.props.history.goBack())
  }

  handleBack = () => this.props.history.goBack()

  handleChangeInput = e => this.setState({ userName: e.target.value })

  handleAvatarChange = e => this.setState({ userAvatar: e.target.value })

  handleClickEdit = () => this.setState({ editActive: !this.state.editActive })

  handleSubmit = e => {
    e.preventDefault()
    const { userName, userAvatar, editActive } = this.state
    api.post('/update_user', { name: userName, avatar: userAvatar }, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => {
        this.setState({user: res.data})
      })
      .catch(() => alert('Не получилось изменить данные!'))
    this.setState({ editActive: !editActive })
  }

  render() {
    const { user: { email, name, avatar_url }, editActive  } = this.state
    return(
      <Fragment>
        <p className='back-button'>
          <FontAwesomeIcon type='button' icon={faArrowAltCircleLeft} onClick={this.handleBack}/>
        </p>
        {/* <button type='button' onClick={this.handleBack}>Back</button> */}
        <form className='form-profile'>
          <p className='profile-head'>Your Profile</p>
          <div className='avatar-edit-blok'>
            <img src={avatar_url} className='avatar-user'></img>
            {
              editActive ? <input type='url' defaultValue={avatar_url} onChange={this.handleAvatarChange}></input> : null
            }
            <p className='paragraf-name'>Avatar</p>
          </div>
          <div className='name-blok'>
            {
              editActive ? <input type='text' defaultValue={name} onChange={this.handleChangeInput}></input> : null
            }
            <p className='paragraf-name'>Name: {name}</p>
          </div>
          <p className='paragraf-name'>Email: {email}</p>
        {
          editActive ? <button onClick={this.handleSubmit}>SAVE</button> : <FontAwesomeIcon icon={faPenSquare} onClick={this.handleClickEdit}/>
        }
        </form>
      </Fragment>
    )
  }
}