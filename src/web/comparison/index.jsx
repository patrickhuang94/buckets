import React, { useState, useEffect } from 'react'
import { Card } from 'antd'

import normalizeAxios from '../services/normalizeAxios'
import SelectMenu from './selectMenu'
import PlayerAvatar from './playerAvatar'
// import BarChart from './barChart'

const PlayerComparison = () => {
  const [players, setPlayers] = useState(null)
  const [loading, setLoading] = useState(true)

  const [playerOneQuery, setPlayerOneQuery] = useState('')
  const [playerOneOptions, setPlayerOneOptions] = useState([])

  const [playerTwoQuery, setPlayerTwoQuery] = useState('')
  const [playerTwoOptions, setPlayerTwoOptions] = useState([])

  const [playerOneData, setPlayerOneData] = useState(null)
  const [playerTwoData, setPlayerTwoData] = useState(null)

  useEffect(() => {
    async function fetchPlayers() {
      const fetchedPlayers = await normalizeAxios({
        method: 'GET',
        url: `/player`,
      })

      setPlayers(fetchedPlayers)
      setLoading(false)
    }

    fetchPlayers()
  }, [])

  return (
    <div className="page__container">
      <div className="flex">
        <Card
          title="Player 1"
          className="card"
          headStyle={{ textAlign: 'end' }}
          actions={[
            <SelectMenu
              players={players}
              playerQuery={playerOneQuery}
              setPlayerQuery={setPlayerOneQuery}
              playerOptions={playerOneOptions}
              setPlayerOptions={setPlayerOneOptions}
              setPlayerData={setPlayerOneData}
              loading={loading}
              side="right"
            />,
          ]}
        >
          <PlayerAvatar playerData={playerOneData} side="right" />
        </Card>
        <Card
          title="Player 2"
          className="card"
          actions={[
            <SelectMenu
              players={players}
              playerQuery={playerTwoQuery}
              setPlayerQuery={setPlayerTwoQuery}
              playerOptions={playerTwoOptions}
              setPlayerOptions={setPlayerTwoOptions}
              playerData={playerTwoData}
              setPlayerData={setPlayerTwoData}
              loading={loading}
              side="left"
            />,
          ]}
        >
          <PlayerAvatar playerData={playerTwoData} side="left" />
        </Card>
      </div>
      <ComparisonChart
        playerOneData={playerOneData}
        playerTwoData={playerTwoData}
      />
    </div>
  )
}

const ComparisonChart = ({ playerOneData, playerTwoData }) => {
  const playerOneCurrentSeasonStats =
    playerOneData &&
    playerOneData.stats.find((stat) => stat.season === '2019-20')
  const playerTwoCurrentSeasonStats =
    playerTwoData &&
    playerTwoData.stats.find((stat) => stat.season === '2019-20')

  return (
    <div style={{ marginBottom: '15px' }}>
      <div className="flex__full-width">
        <div className="player-one__data-container">
          {playerOneData && <Stats playerStats={playerOneCurrentSeasonStats} />}
        </div>
        <div className="comparison-chart__stats-title">
          <h3>MPG</h3>
          <h3>PPG</h3>
          <h3>AST</h3>
          <h3>REB</h3>
          <h3>STL</h3>
          <h3>BLK</h3>
          <h3>TOV</h3>
          <h3>FG%</h3>
          <h3>3PT%</h3>
          <h3>FT%</h3>
        </div>
        <div className="player-two__data-container">
          {playerTwoData && <Stats playerStats={playerTwoCurrentSeasonStats} />}
        </div>
      </div>
    </div>
  )
}

const Stats = ({ playerStats }) => {
  if (!playerStats) {
    return (
      <div className="flex-column__center">
        <h3>-</h3>
        <h3>-</h3>
        <h3>-</h3>
        <h3>-</h3>
        <h3>-</h3>
        <h3>-</h3>
        <h3>-</h3>
        <h3>-</h3>
        <h3>-</h3>
        <h3>-</h3>
      </div>
    )
  }

  return (
    <div className="flex-column__center">
      <h3>{playerStats.minutes_played}</h3>
      <h3>{playerStats.points}</h3>
      <h3>{playerStats.assists}</h3>
      <h3>{playerStats.total_rebounds}</h3>
      <h3>{playerStats.steals}</h3>
      <h3>{playerStats.blocks}</h3>
      <h3>{playerStats.turnovers}</h3>
      <h3>{playerStats.field_goal_percentage || '-'}</h3>
      <h3>{playerStats.three_point_field_goal_percentage || '-'}</h3>
      <h3>{playerStats.free_throw_percentage || '-'}</h3>
    </div>
  )
}

export default PlayerComparison
