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
          <h4>NBA</h4>
          <Link to="/player">
            <p>Player Lookup</p>
          </Link>
          <Link to="/standing">
            <p>Conference Standing</p>
          </Link>
        </div>
        <div>
          <h4>Fantasy NBA</h4>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
