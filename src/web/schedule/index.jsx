import React, { useState, useEffect } from 'react'
import { Card, Menu, Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

import useFetch from '../hooks/useFetch'
import Spinner from '../components/spinner'
import { formatMonth, formatDayOfWeek } from '../services/formatDate'

const Schedule = ({}) => {
  const [month, setMonth] = useState('July')
  const history = useHistory()

  useEffect(() => {
    history.push(`/schedule?month=${month.toLowerCase()}`)
  }, [month])

  const { isFetched, data } = useFetch(`/schedule?month=${month.toLowerCase()}`)

  if (!isFetched) return <Spinner />

  const groupedSchedule = data.reduce((acc, item) => {
    const formattedDate = new Date(item.date)
    const day = formattedDate.getDate()
    const month = formattedDate.getMonth()
    const key = `${formatMonth(month)} ${day}`

    acc[key] = acc[key] || []
    acc[key].push(item)
    return acc
  }, {})

  const handleMenuClick = (item) => setMonth(item.key)

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="July">July</Menu.Item>
      <Menu.Item key="August">August</Menu.Item>
    </Menu>
  )

  return (
    <div className="page__container">
      <div style={{ display: 'flex' }}>
        <h2 style={{ marginRight: '20px' }}>{`Schedule for ${month}`}</h2>
        <Dropdown
          overlay={menu}
          overlayStyle={{ width: '160px' }}
          trigger="click"
        >
          <Button>
            {month} <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      {Object.keys(groupedSchedule).map((key) => {
        const schedule = groupedSchedule[key]
        const formattedDate = new Date(schedule[0].date)
        const day = formattedDate.getDate()
        const month = formattedDate.getMonth()
        const dayOfWeek = formattedDate.getDay()

        return (
          <div className="schedule__container" key={key}>
            <div className="schedule__date-column">
              <h3>{`${formatDayOfWeek(dayOfWeek)}, ${formatMonth(
                month,
              )} ${day}`}</h3>
            </div>
            <div className="schedule__cards-column">
              <div className="schedule__cards-container">
                {schedule.map((s, index) => (
                  <Card
                    key={index}
                    title={
                      <div className="schedule__card-title">
                        <p>{s.start_time ? `${s.start_time}m ET` : 'TBA'}</p>
                      </div>
                    }
                    className="schedule__card"
                  >
                    <div className="flex__center schedule__team-container">
                      <img
                        src={s.home_team_logo}
                        className="schedule__card-image"
                      />
                      <p>{s.home_team_name}</p>
                      <p className="schedule__win-loss">{`(${s.home_team_wins}-${s.home_team_losses})`}</p>
                    </div>
                    <div className="flex__center">
                      <img
                        src={s.visitor_team_logo}
                        className="schedule__card-image"
                      />
                      <p>{s.visitor_team_name}</p>
                      <p className="schedule__win-loss">{`(${s.visitor_team_wins}-${s.visitor_team_losses})`}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Schedule
