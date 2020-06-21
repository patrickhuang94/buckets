const query = require('../db')

function populateTeams() {
  const teams = [
    {
      name: 'Atlanta Hawks',
      abbreviation: 'ATL',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/ATL-2020.png',
    },
    {
      name: 'Boston Celtics',
      abbreviation: 'BOS',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/BOS-2020.png',
    },
    {
      name: 'Brooklyn Nets',
      abbreviation: 'BRK',
      alternate_name: 'New Jersey Nets',
      alternate_abbreviation: 'NJN',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/BRK-2020.png',
    },
    {
      name: 'Charlotte Hornets',
      abbreviation: 'CHO',
      alternate_name: 'Charlotte Bobcats',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/CHO-2020.png',
    },
    {
      name: 'Chicago Bulls',
      abbreviation: 'CHI',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/CHI-2020.png',
    },
    {
      name: 'Cleveland Cavaliers',
      abbreviation: 'CLE',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/CLE-2020.png',
    },
    {
      name: 'Dallas Mavericks',
      abbreviation: 'DAL',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/DAL-2020.png',
    },
    {
      name: 'Denver Nuggets',
      abbreviation: 'DEN',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/DEN-2020.png',
    },
    {
      name: 'Detroit Pistons',
      abbreviation: 'DET',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/DET-2020.png',
    },
    {
      name: 'Golden State Warriors',
      abbreviation: 'GSW',
      alternate_name: 'San Francisco Warriors',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/GSW-2020.png',
    },
    {
      name: 'Houston Rockets',
      abbreviation: 'HOU',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/HOU-2020.png',
    },
    {
      name: 'Indiana Pacers',
      abbreviation: 'IND',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/IND-2020.png',
    },
    {
      name: 'Los Angeles Clippers',
      abbreviation: 'LAC',
      alternate_name: 'San Diego Clippers',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/LAC-2020.png',
    },
    {
      name: 'Los Angeles Lakers',
      abbreviation: 'LAL',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/LAL-2020.png',
    },
    {
      name: 'Memphis Grizzlies',
      abbreviation: 'MEM',
      alternate_name: 'Vancouver Grizzlies',
      alternate_abbreviation: 'VAN',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/MEM-2020.png',
    },
    {
      name: 'Miami Heat',
      abbreviation: 'MIA',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/MIA-2020.png',
    },
    {
      name: 'Milwaukee Bucks',
      abbreviation: 'MIL',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/MIL-2020.png',
    },
    {
      name: 'Minnesota Timberwolves',
      abbreviation: 'MIN',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/MIN-2020.png',
    },
    {
      name: 'New Orleans Pelicans',
      abbreviation: 'NOP',
      alternate_name: 'New Orleans Hornets',
      alternate_abbreviation: 'NOH',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/NOP-2020.png',
    },
    {
      name: 'New York Knicks',
      abbreviation: 'NYK',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/NYK-2020.png',
    },
    {
      name: 'Oklahoma City Thunder',
      abbreviation: 'OKC',
      alternate_name: 'Seattle Supersonics',
      alternate_abbreviation: 'SEA',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/OKC-2020.png',
    },
    {
      name: 'Orlando Magic',
      abbreviation: 'ORL',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/ORL-2020.png',
    },
    {
      name: 'Philadelphia Sixers',
      abbreviation: 'PHI',
      alternate_name: 'Philadelphia 76ers',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/PHI-2020.png',
    },
    {
      name: 'Phoenix Suns',
      abbreviation: 'PHO',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/PHO-2020.png',
    },
    {
      name: 'Portland Trail Blazers',
      abbreviation: 'POR',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/POR-2020.png',
    },
    {
      name: 'Sacramento Kings',
      abbreviation: 'SAC',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/SAC-2020.png',
    },
    {
      name: 'San Antonio Spurs',
      abbreviation: 'SAS',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/SAS-2020.png',
    },
    {
      name: 'Toronto Raptors',
      abbreviation: 'TOR',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/TOR-2020.png',
    },
    {
      name: 'Utah Jazz',
      abbreviation: 'UTA',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/UTA-2020.png',
    },
    {
      name: 'Washington Wizards',
      abbreviation: 'WAS',
      alternate_name: 'Washington Bullets',
      logo: 'https://d2p3bygnnzw9w3.cloudfront.net/req/202005291/tlogo/bbr/WAS-2020.png',
    },
  ]

  teams.forEach((team) => {
    query('INSERT INTO "team" (name, abbreviation, alternate_name, logo) VALUES ($1, $2, $3, $4)', [
      team.name,
      team.abbreviation,
      team.alternate_name,
      team.logo,
    ])
  })
}

populateTeams()
