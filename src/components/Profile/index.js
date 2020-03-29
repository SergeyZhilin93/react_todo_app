import React, { Component } from 'react';
import { withRouter } from "react-router";
import { api } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'

export class Profile extends Component {
  state = {
    nameActive: false,
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

  handleClickEdit = () => this.setState({ nameActive: !this.state.nameActive })

  handleSubmit = e => {
    e.preventDefault()
    const { userName, userAvatar } = this.state
    api.post('/update_user', { name: userName, avatar: userAvatar }, {headers: JSON.parse(localStorage.getItem('user'))})
      .then(res => {
        this.setState({user: res.data})
      })
      .catch(() => alert('Не получилось изменить данные!'))
  }

  render() {
    const { email, name, avatar_url } = this.state.user
    return(
      <form>
        <button type='button' onClick={this.handleBack}>Back</button>
        <div>
          <p className='avatar-icon'></p>
          <img src={avatar_url}></img>
          <p>Avatart</p>
          <input type='url' onChange={this.handleAvatarChange}></input>
        </div>
        <div>
          <div>
            <input type='text' defaultValue={name} onChange={this.handleChangeInput}></input>
          </div>
          <p>Name: {name}</p>
        </div>
        <p>Email: {email}</p>
      <FontAwesomeIcon icon={faPenSquare} onClick={this.handleClickEdit} />
      <button onClick={this.handleSubmit}>SAVE</button>
      </form>
    )
  }
}