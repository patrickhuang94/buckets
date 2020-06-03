import React, { useContext } from 'react'

import Player from '../player'
import { store } from '../store'

const Dashboard = () => {
  const { state } = useContext(store)
  return <div className="dashboard">{state.loggedIn ? <Player /> : 'Buckets'}</div>
}

export default Dashboard
