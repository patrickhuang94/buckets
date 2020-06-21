import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Input } from 'antd'
import normalizeAxios from '../services/normalizeAxios'

const Players = () => {
  const [players, setPlayers] = useState(null)

  useEffect(() => {
    async function fetchPlayers() {
      const fetchedPlayers = await normalizeAxios({
        method: 'GET',
        url: '/player',
      })

      setPlayers(fetchedPlayers)
    }

    fetchPlayers()
  }, [])

  if (!players) return <div>Loading...</div>
  return (
    <div className="horizontal__padding">
      <PlayersTable players={players} />
    </div>
  )
}

const PlayersTable = ({ players }) => {
  const [playerData, setPlayerData] = useState(players)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    function searchPlayers() {
      setSearchQuery(searchQuery)

      const filteredPlayerData = players.filter((player) => {
        // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
        const normalizedPlayerName = player.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        return normalizedPlayerName.toUpperCase().includes(searchQuery.toUpperCase())
      })
      setPlayerData(filteredPlayerData)
    }

    searchPlayers()
  }, [searchQuery])

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
    },
    {
      key: 'position',
      dataIndex: 'position',
      title: 'Position',
    },
    {
      key: 'team',
      dataIndex: 'team',
      title: 'Team',
    },
  ]

  const dataSource = playerData.map((player, index) => ({
    key: index,
    id: player.id,
    name: player.name,
    position: player.position,
    team: player.team_name,
  }))

  const history = useHistory()

  const handleOnRow = (player) => ({
    onClick: () => history.push(`/player/${player.id}`),
  })

  return (
    <div>
      <div style={{ width: '400px', marginBottom: '20px' }}>
        <Input placeholder="Search" onChange={(event) => setSearchQuery(event.target.value)} />
      </div>
      <Table columns={columns} dataSource={dataSource} size="middle" onRow={handleOnRow} rowClassName="players__row" />
    </div>
  )
}

export default Players
