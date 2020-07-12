import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Link to="/">
          <p className="sidebar__title">Buckets</p>
        </Link>
      </div>
      <div className="sidebar__menu">
        <div>
          <Link to="/player">
            <p className="sidebar__menu-item">Player Lookup</p>
          </Link>
          <Link to="/standing">
            <p className="sidebar__menu-item">Conference Standing</p>
          </Link>
          <Link to="/comparison">
            <p className="sidebar__menu-item">Player Comparison</p>
          </Link>
          <Link to="/leaders">
            <p className="sidebar__menu-item">Season Leaders</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
