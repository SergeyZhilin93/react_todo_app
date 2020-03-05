import React, { Component } from 'react';

export class Header extends Component {
  state = {
    showDropDown: false
  }
  toggleDropdown = () => this.setState({showDropDown: !this.state.showDropDown })
  
  render() {
    return (
      <header>
        <p className="header-logo">sadasad</p>
        <div className='header-profile'>
          <img onClick={this.toggleDropdown} src='https://cdn.cnn.com/cnnnext/dam/assets/180226110801-elettro-domestici-logo.jpg' alt='avatar'></img>
          <span>userName@mail.com</span>
          {
            this.state.showDropDown == true ? (
              <div>
                <p>Профиль</p>
                <p>Настройки</p>
              </div>
            ) : null
          }
        </div>
      </header>
    )
  }
}