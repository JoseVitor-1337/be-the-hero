import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import NewCase from './pages/NewCase'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/case/new" component={NewCase}/>
      </Switch>
    </BrowserRouter>
  )
}