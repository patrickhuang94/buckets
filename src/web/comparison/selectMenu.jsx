import React, { useRef, useEffect } from 'react'
import classNames from 'classnames'
import { Select } from 'antd'
import normalizeAxios from '../services/normalizeAxios'

const { Option } = Select

const SelectMenu = ({
  players,
  playerQuery,
  setPlayerQuery,
  playerOptions,
  setPlayerOptions,
  setPlayerData,
  loading,
  side,
}) => {
  const selectRef = useRef(null)

  useEffect(() => {
    async function fetchPlayer() {
      const fetchedPlayer = await normalizeAxios({
        method: 'GET',
        url: `/player/name/${playerQuery}`,
      })

      setPlayerData(fetchedPlayer)
    }

    fetchPlayer()
  }, [playerQuery])

  const handleOnSearch = (query) => {
    if (query) {
      const foundPlayers = players.filter((player) =>
        player.name.includes(query),
      )
      setPlayerOptions(foundPlayers)
    } else {
      setPlayerOptions([])
    }
  }

  const handleOnChange = (playerName) => setPlayerQuery(playerName)

  const handleOnFocus = () => {
    setPlayerQuery('')
    setPlayerOptions(players)
  }

  const handleOnSelect = () => selectRef.current.blur()

  const options = playerOptions.map((option) => (
    <Option key={option.id} value={option.name}>
      {option.name}
    </Option>
  ))

  return (
    <div
      className={classNames('flex-column__end', {
        'flex-column__start': side === 'left',
      })}
    >
      <Select
        ref={selectRef}
        showSearch
        value={playerQuery}
        onSearch={handleOnSearch}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onSelect={handleOnSelect}
        disabled={loading}
        style={{ width: '300px', margin: '0 24px' }}
      >
        {options}
      </Select>
    </div>
  )
}

export default SelectMenu
