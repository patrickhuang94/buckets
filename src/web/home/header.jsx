import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Button } from 'antd'

import { store } from '../store'
import Search from '../search'

function Header() {
  const { state } = useContext(store)
  const cookie = Cookies.get('token')

  return (
    <div className="header">
      {cookie ? (
        <React.Fragment>
          <Search />
          {state.user ? `Hello, ${state.user.name}` : ''}
        </React.Fragment>
      ) : (
        <div>
          <Link to="/login">
            <Button type="primary">Login</Button>
          </Link>
          <Link to="/signUp">
            <Button type="primary" style={{ marginLeft: '15px' }}>
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
