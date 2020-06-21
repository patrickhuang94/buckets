import React, { useState, useEffect } from 'react'
import { Table, Card } from 'antd'
import normalizeAxios from '../services/normalizeAxios'

const PlayerPage = () => {
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    const playerId = window.location.pathname.split('/').pop()

    async function fetchPlayerProfile() {
      const playerProfile = await normalizeAxios({
        method: 'GET',
        url: `/player/${playerId}`,
      })

      setPlayer(playerProfile)
    }

    fetchPlayerProfile()
  }, [])

  if (!player) return <div className="horizontal__padding">Loading...</div>
  return (
    <div>
      <div className="cards__container horizontal__padding">
        <div className="cards__wrapper">
          <Card title="Player" className="card__margin-right">
            <div className="flex">
              <img src={player.image} />
              <div className="player-card__container">
                <h3>{player.name}</h3>
                <p>{player.team}</p>
                <p>{`Position: ${player.position}`}</p>
                <p>{`${player.height}, ${player.weight}`}</p>
              </div>
            </div>
          </Card>
          <Card title="Player Bio" className="card__margin-left">
            <h3>Hahahahaha</h3>
          </Card>
        </div>
        <Card title="Stats" className="player-stats__container">
          <PlayerStats player={player} />
        </Card>
      </div>
    </div>
  )
}

const PlayerStats = ({ player }) => {
  const columns = [
    {
      key: 'season',
      dataIndex: 'season',
      title: 'SEASON',
      width: 100,
    },
    {
      key: 'team',
      dataIndex: 'team',
      title: 'TEAM',
    },
    {
      key: 'minutes_played',
      dataIndex: 'minutes_played',
      title: 'MPG',
    },
    {
      key: 'points',
      dataIndex: 'points',
      title: 'PPG',
    },
    {
      key: 'two_point_field_goal_percentage',
      dataIndex: 'two_point_field_goal_percentage',
      title: 'FG%',
    },
    {
      key: 'three_point_field_goal_percentage',
      dataIndex: 'three_point_field_goal_percentage',
      title: '3P%',
    },
    {
      key: 'effective_field_goal_percentage',
      dataIndex: 'effective_field_goal_percentage',
      title: 'eFG%',
    },
    {
      key: 'free_throw_percentage',
      dataIndex: 'free_throw_percentage',
      title: 'FT%',
    },
    {
      key: 'total_rebounds',
      dataIndex: 'total_rebounds',
      title: 'RPG',
    },
    {
      key: 'assists',
      dataIndex: 'assists',
      title: 'APG',
    },
    {
      key: 'steals',
      dataIndex: 'steals',
      title: 'ST',
    },
    {
      key: 'blocks',
      dataIndex: 'blocks',
      title: 'BPG',
    },
    {
      key: 'turnovers',
      dataIndex: 'turnovers',
      title: 'TO',
    },
  ]

  if (!player) return <div>Loading...</div>

  const dataSource = player.stats.reverse().map((data) => ({
    id: data.id,
    season: data.season,
    team: data.team_abbreviation,
    minutes_played: data.minutes_played,
    points: data.points,
    two_point_field_goal_percentage: data.two_point_field_goal_percentage,
    three_point_field_goal_percentage: data.three_point_field_goal_percentage,
    effective_field_goal_percentage: data.effective_field_goal_percentage,
    free_throw_percentage: data.free_throw_percentage,
    total_rebounds: data.total_rebounds,
    assists: data.assists,
    steals: data.steals,
    blocks: data.blocks,
    turnovers: data.turnovers,
  }))

  return <Table columns={columns} dataSource={dataSource} size="middle" scroll={{ y: 135 }} />
}

export default PlayerPage
