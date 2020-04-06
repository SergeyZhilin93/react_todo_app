import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import './style.css'


export function Header({avatar, author}) {
  const [showDropDown, setShowDropDown] = useState(false)

  const toggleDropdown = () => setShowDropDown(!showDropDown)

  const toogleLogout = () => {
    localStorage.clear("user")
  }

  return (
    <header className='header' >
      <div className='logo-blok'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Oikya_Front_Logo.png' className="header-logo"/>
        <p className='name-project'>Confirmation</p>
      </div>
      <div className='header-profile'>
        <img  className='header-img' src={avatar} alt='avatar'/>
        <span className='header-userName'>{author}</span>
        <FontAwesomeIcon icon={faEllipsisV} className='header-more-icon' onClick={toggleDropdown} />
        {
          showDropDown == true ? (
            <div className='header-dropdown'>
              <Link to='/profile' className='dropdown-link'>Profile</Link>
              <p className='dropdown-link'>Настройки</p>
              <Link to='/' onClick={toogleLogout} className='dropdown-link'>Выход</Link>
            </div>
          ) : null
        }
      </div>
    </header>
  )
}
