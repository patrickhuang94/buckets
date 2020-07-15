import React from 'react'
import Spinner from '../components/spinner'
import useFetch from '../hooks/useFetch'

const Leaders = () => {
  const { isFetched, data } = useFetch('/leaders')

  if (!isFetched) return <Spinner />

  return (
    <div className="page__container">
      <h2>Season Leaderboard</h2>
      <div className="leaders-categories__container">
        <LeaderCategory
          category="Points Per Game"
          categoryKey="points"
          players={data.pointsLeaders}
        />
        <LeaderCategory
          category="Rebounds Per Game"
          categoryKey="total_rebounds"
          players={data.reboundsLeaders}
        />
        <LeaderCategory
          category="Assists Per Game"
          categoryKey="assists"
          players={data.assistsLeaders}
        />
        <LeaderCategory
          category="Blocks Per Game"
          categoryKey="blocks"
          players={data.blocksLeaders}
        />
        <LeaderCategory
          category="Steals Per Game"
          categoryKey="steals"
          players={data.stealsLeaders}
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
