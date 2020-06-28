import React from 'react'
import classNames from 'classnames'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const PlayerAvatar = ({ playerData, side }) => {
  return (
    <div
      className={classNames('player-data__container-left', {
        'player-data__container-right': side === 'right',
      })}
    >
      {playerData ? (
        <PlayerInfo playerData={playerData} side={side} />
      ) : (
        <React.Fragment>
          <Avatar
            shape="square"
            size={180}
            icon={<UserOutlined />}
            style={{ objectFit: 'contain' }}
          />
        </React.Fragment>
      )}
    </div>
  )
}

const PlayerInfo = ({ playerData, side }) => {
  if (side === 'left') {
    return (
      <React.Fragment>
        <img src={playerData.image} className="player-image" />
        <div className="flex-column">
          <h3>{playerData.name}</h3>
          <p>{`Position: ${playerData.position}`}</p>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div className="flex-column">
        <h3 className="text__end-align">{playerData.name}</h3>
        <p className="text__end-align">{`Position: ${playerData.position}`}</p>
      </div>
      <img src={playerData.image} className="player-image" />
    </React.Fragment>
  )
}

export default PlayerAvatar
