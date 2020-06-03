import React, { useContext } from 'react'
import className from 'classnames'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import Button from '../components/button'

import { store } from '../store'

function Header() {
  const { state } = useContext(store)
  const cookie = Cookies.get('token')

  return (
    <div
      className={className('header', {
        'flex-end': cookie,
      })}
    >
      {cookie ? (
        <div className="flex-end">{state.user ? `Hello, ${state.user.name}` : ''}</div>
      ) : (
        <React.Fragment>
          <div>My Dashboard</div>
          <div>
            <Link to="/login">
              <Button title="Login" />
            </Link>
            <Link to="/signUp">
              <Button style={{ marginLeft: '15px' }} title="Sign Up" />
            </Link>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default Header
