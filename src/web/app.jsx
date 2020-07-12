import React, { useContext, useEffect } from 'react'

import Sidebar from './home/sidebar'
import Header from './home/header'

import Dashboard from './dashboard'
import SignUp from './onboarding/signUp'
import Login from './onboarding/login'
import Player from './player'
import PlayerPage from './player/page'
import Standing from './standing'
import PlayerComparison from './comparison'
import Leaders from './leaders'

import { store } from './store'
import normalizeAxios from './services/normalizeAxios'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './stylesheets/app.css'

function App() {
  const { dispatch } = useContext(store)

  useEffect(() => {
    async function fetchUser() {
      const request = {
        method: 'GET',
        url: '/user',
      }

      const user = await normalizeAxios(request)
      const payload = { name: user.name, email: user.email }
      dispatch({ type: 'LOG_IN', payload })
    }

    fetchUser()
  }, [])

  return (
    <div className="app">
      <Router>
        <div className="app__full-container">
          <Sidebar />
          <div className="app__container">
            <Header />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/player" component={Player} />
            <Route exact path="/player/:id" component={PlayerPage} />
            <Route exact path="/standing" component={Standing} />
            <Route exact path="/comparison" component={PlayerComparison} />
            <Route exact path="/leaders" component={Leaders} />
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
