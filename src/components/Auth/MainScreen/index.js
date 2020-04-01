import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";
import './style.css'

export class MainScreen extends Component {
  render() {
    return(
      <Fragment>
        <div className='main-blok'>
          <div className='project'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Oikya_Front_Logo.png' className="logo"/>
            <p className='name-project'>Confirmation</p>
          </div>
          <div>
            <Link className='link' to='/login'>Login</Link>
            <Link className='link' to='/registration'>Registration</Link>
          </div>
        </div>
        <footer className='footer'>Created by Sergey Zhilin</footer>
      </Fragment>
    )
  }
}