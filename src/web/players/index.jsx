import React, { useContext } from 'react'
import { Table } from 'antd'
import moment from 'moment'
import { store } from '../store'

const columns = [
  {
    key: 'game',
    dataIndex: 'game',
    title: 'GAME',
    className: 'players__column'
  },
  {
    key: 'field_goals',
    dataIndex: 'field_goals',
    title: 'FGM/A',
    className: 'players__column'
  },
  {
    key: 'field_goal_percentage',
    dataIndex: 'field_goal_percentage',
    title: 'FG%',
    className: 'players__column'
  },
  {
    key: 'free_throw_percentage',
    dataIndex: 'free_throw_percentage',
    title: 'FT%',
    className: 'players__column'
  },
  {
    key: 'three_pointers_made',
    dataIndex: 'three_pointers_made',
    title: '3PTM',
    className: 'players__column'
  },
  {
    key: 'points',
    dataIndex: 'points',
    title: 'PTS',
    className: 'players__column'
  },
  {
    key: 'rebounds',
    dataIndex: 'rebounds',
    title: 'REB',
    className: 'players__column'
  },
  {
    key: 'assists',
    dataIndex: 'assists',
    title: 'AST',
    className: 'players__column'
  },
  {
    key: 'steals',
    dataIndex: 'steals',
    title: 'ST',
    className: 'players__column'
  },
  {
    key: 'blocks',
    dataIndex: 'blocks',
    title: 'BLK',
    className: 'players__column'
  },
  {
    key: 'turnovers',
    dataIndex: 'turnovers',
    title: 'TO',
    className: 'players__column'
  }
]

function roundToThreeDecimals(number) {
  // 0 -> .000
  if (number === 0) {
    return '.000'
  }

  // 1 -> 1.000
  if (number === 100) {
    return '1.000'
  }

  // 48.5 --> .485
  if (number.toString().includes('.')) {
    const formattedNumber = number
      .toString()
      .split('.')
      .join('')
    return `.${formattedNumber}`
  }

  // 50 -> .500
  return `.${number}0`
}

function Players() {
  const { state } = useContext(store)
  const stats = state.currentPlayer.playerStats || []
  const dataSource = stats.map((stats, index) => ({
    key: index,
    game: `${moment(stats.game.date)
      .utc()
      .format('MMM DD')}`,
    field_goals: `${stats.fgm}/${stats.fga}`,
    field_goal_percentage: roundToThreeDecimals(stats.fg3_pct),
    free_throw_percentage: roundToThreeDecimals(stats.ft_pct),
    three_pointers_made: `${stats.fg3m}/${stats.fg3a}`,
    points: stats.pts,
    rebounds: stats.dreb + stats.oreb,
    assists: stats.ast,
    steals: stats.stl,
    blocks: stats.blk,
    turnovers: stats.turnover
  }))

  return <Table columns={columns} dataSource={dataSource} size="middle" />
}

export default Players
