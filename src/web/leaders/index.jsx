import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'

const Leaders = () => {
  const [pointsLeaders, setPointsLeaders] = useState([])
  const [reboundsLeaders, setReboundsLeaders] = useState([])
  const [assistsLeaders, setAssistsLeaders] = useState([])
  const [blocksLeaders, setBlocksLeaders] = useState([])
  const [stealsLeaders, setStealsLeaders] = useState([])
  const [fgLeaders, setFgLeaders] = useState([])

  useFetch('/leaders', { method: 'GET' }, (data) => {
    setPointsLeaders(data.pointsLeaders)
    setReboundsLeaders(data.reboundsLeaders)
    setAssistsLeaders(data.assistsLeaders)
    setBlocksLeaders(data.blocksLeaders)
    setStealsLeaders(data.stealsLeaders)
    setFgLeaders(data.fieldGoalPercentageLeaders)
  })

  return (
    <div className="page__container">
      <h2>Season Leaderboard</h2>
      <div className="leaders-categories__container">
        <LeaderCategory
          category="Points Per Game"
          categoryKey="points"
          players={pointsLeaders}
        />
        <LeaderCategory
          category="Rebounds Per Game"
          categoryKey="total_rebounds"
          players={reboundsLeaders}
        />
        <LeaderCategory
          category="Assists Per Game"
          categoryKey="assists"
          players={assistsLeaders}
        />
        <LeaderCategory
          category="Blocks Per Game"
          categoryKey="blocks"
          players={blocksLeaders}
        />
        <LeaderCategory
          category="Steals Per Game"
          categoryKey="steals"
          players={stealsLeaders}
        />
        <LeaderCategory
          category="Field Goal Percentage"
          categoryKey="field_goal_percentage"
          players={fgLeaders}
        />
      </div>
    </div>
  )
}

const LeaderCategory = ({ category, categoryKey, players }) => {
  return (
    <div className="category__container">
      <h3>{category}</h3>
      {players.map((player) => (
        <div key={player.id} className="player__container">
          <div className="player__left">
            <img src={player.image} className="player__icon" />
            <p className="player__name">{player.name}</p>
          </div>
          <p>{player[categoryKey]}</p>
        </div>
      ))}
    </div>
  )
}

export default Leaders
