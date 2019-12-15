import React, { useEffect } from 'react'
import { Table } from 'antd'

import normalizeAxios from '../services/normalizeAxios'

const columns = [
  {
    key: 'position',
    dataIndex: 'position',
    title: 'POS',
    width: 50
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'NAME',
    width: 200
  },
  {
    key: 'rankings',
    dataIndex: 'rankings',
    title: 'RANKINGS',
    width: 700
  }
]

const dataSource = [
  {
    position: 'PG',
    name: 'Eric Bledsoe',
    id: 51
  },
  {
    position: 'SG',
    name: 'Bradley Beal',
    id: 37
  },
  {
    position: 'G',
    name: 'Ricky Rubio',
    id: 404
  },
  {
    position: 'SF',
    name: 'Paul George',
    id: 172
  },
  {
    position: 'PF',
    name: 'Moritz Wagner',
    id: 462
  },
  {
    position: 'F',
    name: 'Bam Adebayo',
    id: 4
  },
  {
    position: 'C',
    name: 'Kristaps Porzingis',
    id: 378
  },
  {
    position: 'C',
    name: 'Steven Adams',
    id: 3
  },
  {
    position: 'Util',
    name: 'Eric Paschall',
    id: 666831
  },
  {
    position: 'Util',
    name: 'T.J. Warren',
    id: 469
  },
  {
    position: 'IL',
    name: 'De′Aaron Fox',
    id: 161
  },
  {
    position: 'IL',
    name: 'Brandon Clarke'
  }
]

function TeamTable() {
  useEffect(() => {
    const playerIds = dataSource.map(player => player.id)
    console.log({ playerIds })
    // const request = {
    //   method: 'GET',
    // }
  }, [])

  return <Table columns={columns} dataSource={dataSource} size="middle" />
}

export default TeamTable
