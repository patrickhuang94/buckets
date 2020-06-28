import React, { useEffect, useState } from 'react'
import { Table, Spin } from 'antd'

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

      setWesternConference(
        fetchedConferenceStandings.filter((team) => team.division === 'west'),
      )
      setEasternConference(
        fetchedConferenceStandings.filter((team) => team.division === 'east'),
      )
    }

    fetchStandings()
  }, [])

  if (!westernConference || !easternConference)
    return (
      <div className="page__container">
        <Spin />
      </div>
    )

  const westernConferenceData = westernConference.map((team) => ({
    key: team.id,
    seed: team.seed,
    name: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={team.logo} style={{ width: '24px', height: '24px' }} />
        <p style={{ marginLeft: '8px' }}>{team.name}</p>
      </div>
    ),
    win: team.win,
    loss: team.loss,
    win_loss_percentage: `${(team.win_loss_percentage * 100).toFixed(1)}%`,
    games_back: team.games_back || '-',
  }))

  const easternConferenceData = easternConference.map((team) => ({
    key: team.id,
    seed: team.seed,
    name: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={team.logo} style={{ width: '24px', height: '24px' }} />
        <p style={{ marginLeft: '8px' }}>{team.name}</p>
      </div>
    ),
    win: team.win,
    loss: team.loss,
    win_loss_percentage: `${(team.win_loss_percentage * 100).toFixed(1)}%`,
    games_back: team.games_back,
  }))

  return (
    <div className="page__container">
      <h2>2019-2020 Rankings</h2>
      <div className="conferences">
        <div className="western-conference">
          <h3>Western Conference</h3>
          <Table
            columns={columns}
            dataSource={westernConferenceData}
            size="middle"
            pagination={{
              hideOnSinglePage: true,
              pageSize: westernConferenceData.length,
            }}
          />
        </div>
        <div className="eastern-conference">
          <h3>Eastern Conference</h3>
          <Table
            columns={columns}
            dataSource={easternConferenceData}
            size="middle"
            pagination={{
              hideOnSinglePage: true,
              pageSize: easternConferenceData.length,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Standing
