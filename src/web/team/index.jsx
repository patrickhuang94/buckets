import React from 'react'
import TeamTable from './teamTable'

function Team() {
  function renderTeam() {
    return <TeamTable />
  }

  return (
    <div className="team">
      <h2>My Team</h2>
      {renderTeam()}
    </div>
  )
}

export default Team
