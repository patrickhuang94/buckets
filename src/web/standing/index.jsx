import React, { useEffect, useState } from 'react'
import { Table } from 'antd'

import normalizeAxios from '../services/normalizeAxios'

const columns = [
  {
    key: 'seed',
    dataIndex: 'seed',
    title: 'Seed',
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Name',
  },
  {
    key: 'win',
    dataIndex: 'win',
    title: 'Win',
  },
  {
    key: 'loss',
    dataIndex: 'loss',
    title: 'Loss',
  },
  {
    key: 'win_loss_percentage',
    dataIndex: 'win_loss_percentage',
    title: 'Win %',
  },
  {
    key: 'games_back',
    dataIndex: 'games_back',
    title: 'GB',
  },
]

const Standing = () => {
  const [westernConference, setWesternConference] = useState(null)
  const [easternConference, setEasternConference] = useState(null)

  useEffect(() => {
    async function fetchStandings() {
      const fetchedConferenceStandings = await normalizeAxios({
        method: 'GET',
        url: '/conference_standing',
      })

      setWesternConference(fetchedConferenceStandings.filter((team) => team.division === 'west'))
      setEasternConference(fetchedConferenceStandings.filter((team) => team.division === 'east'))
    }

    fetchStandings()
  }, [])

  if (!westernConference || !easternConference) return <div>Loading...</div>

  const westernConferenceData = westernConference.map((team) => ({
    key: team.id,
    seed: team.seed,
    name: team.name,
    win: team.win,
    loss: team.loss,
    win_loss_percentage: `${(team.win_loss_percentage * 100).toFixed(1)}%`,
    games_back: team.games_back,
  }))

  const easternConferenceData = easternConference.map((team) => ({
    key: team.id,
    seed: team.seed,
    name: team.name,
    win: team.win,
    loss: team.loss,
    win_loss_percentage: `${(team.win_loss_percentage * 100).toFixed(1)}%`,
    games_back: team.games_back,
  }))

  return (
    <div>
      <h2>2019-2020 Rankings</h2>
      <div className="conferences">
        <div className="western-conference">
          <h3>Western Conference</h3>
          <Table columns={columns} dataSource={westernConferenceData} size="middle" />
        </div>
        <div className="eastern-conference">
          <h3>Eastern Conference</h3>
          <Table columns={columns} dataSource={easternConferenceData} size="middle" />
        </div>
      </div>
    </div>
  )
}

export default Standing
