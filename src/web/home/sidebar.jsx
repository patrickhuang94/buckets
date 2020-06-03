import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { store } from '../store'

const Sidebar = () => {
  const { state } = useContext(store)

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Link to="/">
          <p className="sidebar__title">Buckets</p>
        </Link>
      </div>
      <div className="sidebar__menu">
        {state.loggedIn && (
          <Link to="/team">
            <p>My Team</p>
          </Link>
        )}
        <Link to="/players">
          <p>Player Lookup</p>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
