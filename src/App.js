import React from 'react';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration'
import { Admin } from './components/Admin';
import { User } from './components/User';
import { Profile } from './components/Profile'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Admin}/>
        <Route path='/user' component={User}/>
        <Route path='/registration' component={Registration}/>
        <Route path='/profile' component={Profile}/>
        <Route path="/" component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
