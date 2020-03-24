import React from 'react';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration'
import { Admin } from './components/Admin';
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
        <Route path="/admin" component={Admin}></Route>
        <Route path='/registration' component={Registration}></Route>
        <Route path="/" component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
