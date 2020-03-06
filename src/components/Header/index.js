import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import './style.css'


export class Header extends Component {
  state = {
    showDropDown: false
  }
  toggleDropdown = () => this.setState({showDropDown: !this.state.showDropDown })
  
  render() {
    return (
      <header className='header' >
        <p className="header-logo">Эльдорадо</p>
        <div className='header-profile'>
          <img  className='header-img' src='https://cdn.cnn.com/cnnnext/dam/assets/180226110801-elettro-domestici-logo.jpg' alt='avatar'/>
          <span className='header-userName'>userName@mail.com</span>
          <FontAwesomeIcon icon={faEllipsisV} className='header-more-icon' onClick={this.toggleDropdown} />
          {
            this.state.showDropDown == true ? (
              <div className='header-dropdown'>
                <p className='dropdown-link'>Профиль</p>
                <p className='dropdown-link'>Настройки</p>
                <Link to='/' className='dropdown-link'>Выход</Link>
              </div>
            ) : null
          }
        </div>
      </header>
    )
  }
}