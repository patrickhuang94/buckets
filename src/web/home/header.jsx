import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Button } from 'antd'
import classNames from 'classnames'

import { store } from '../store'
import Search from '../search'

function Header() {
  const { state } = useContext(store)
  const cookie = Cookies.get('token')

  return (
    <div
      className={classNames('header', {
        'header__flex-end': !cookie
      })}
    >
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
