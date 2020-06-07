import React, { useContext } from 'react'
import ConferenceStanding from '../standing'

import Team from '../team'
import { store } from '../store'

const Dashboard = () => {
  const { state } = useContext(store)
  return (
    <div className="dashboard">
      <div className="box__container taller">
        <div className="box__two">Hello</div>
        <div className="box__two">Hello</div>
      </div>
      <div className="box__container shorter">
        <div className="box__three">Hello</div>
        <div className="box__three">Hello</div>
        <div className="box__three">Hello</div>
      </div>
    </div>
  )
}

export default Dashboard
