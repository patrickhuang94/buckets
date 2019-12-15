import React, { useState, useContext } from 'react'
import normalizeAxios from '../services/normalizeAxios'
import { Select, Input } from 'antd'
import { store } from '../store'

function Search() {
  const [name, setName] = useState('')
  const { dispatch } = useContext(store)
  // const [season, setSeason] = useState('')
  // const [playerInfo, setPlayerInfo] = useState(null)

  const handleChangeName = e => setName(e.target.value)
  // const handleChangeSeason = value => setSeason(value)

  const onSubmit = async e => {
    e.preventDefault()
    const request = {
      method: 'GET',
      url: `/player/stats?name=${name}`
    }
    const player = await normalizeAxios(request)
    dispatch({ type: 'FIND_PLAYER', payload: player })
    // setPlayerInfo(player)
  }

  // function renderPlayer() {
  //   if (!playerInfo) return null
  //   return <PlayerTable stats={playerInfo.playerStats} />
  // }

  return (
    <div className="search__container">
      <form onSubmit={onSubmit} className="search__form">
        <Input
          value={name}
          placeholder="Player name"
          onChange={handleChangeName}
        />
        {/* <Select placeholder="Select season" onChange={handleChangeSeason}>
          <Select.Option value="2019">2019-2020</Select.Option>
          <Select.Option value="2018">2018-2019</Select.Option>
          <Select.Option value="2017">2017-2018</Select.Option>
          <Select.Option value="2016">2016-2017</Select.Option>
        </Select> */}
        <input type="submit" value="Find player stats" />
      </form>
      {/* {renderPlayer()} */}
    </div>
  )
}

export default Search
