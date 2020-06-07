import React, { useState, useEffect, useContext } from 'react'
import { Input } from 'antd'
import normalizeAxios from '../services/normalizeAxios'
import { store } from '../store'
import PlayerTable from './table'

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
    <div>
      <Search />
      <PlayerTable players={players} />
    </div>
  )
}

const Search = () => {
  const [name, setName] = useState('')
  const { dispatch, state } = useContext(store)

  const handleChangeName = (e) => setName(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    const playerRequest = {
      method: 'GET',
      url: `/player/stats?name=${name}`,
    }
    const player = await normalizeAxios(playerRequest)
    dispatch({ type: 'FIND_PLAYER', payload: player })
  }

  return (
    <div className="search__container">
      <form onSubmit={onSubmit} className="search__form">
        <Input value={name} placeholder="Player name" onChange={handleChangeName} />
        <input type="submit" value="Find player stats" />
      </form>
      {Object.keys(state.currentPlayer).length ? <Players /> : null}
    </div>
  )
}

export default Players
