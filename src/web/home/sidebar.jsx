import React, { useContext } from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

import { store } from '../store'

const { Item } = Menu
const { Sider } = Layout

const styles = {
  sidebar: {
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    margin: 0,
    fontSize: '16px',
    color: 'white'
  }
}

function Sidebar() {
  const { state } = useContext(store)
  return (
    <Sider trigger={null}>
      <div className="sidebar">
        <p className="title">Buckets</p>
      </div>
      <Menu theme="dark" mode="inline">
        <Item key="1" style={{ marginTop: 0 }}>
          <Link to="/players">
            <p>Player search</p>
          </Link>
        </Item>
        {state.loggedIn && (
          <Item key="2">
            <Link to="/team">
              <p>My Team</p>
            </Link>
          </Item>
        )}
      </Menu>
    </Sider>
  )
}

export default Sidebar
