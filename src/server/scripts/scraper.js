const puppeteer = require('puppeteer')
const PlayerController = require('../controllers/playerController')
const TeamController = require('../controllers/teamController')
const ConferenceStandingController = require('../controllers/conferenceStandingController')
const StatsPerSeasonController = require('../controllers/statsPerSeasonController')

// const PlayerModel = require('../models/playerModel')
// const StatsPerSeasonModel = require('../models/statsPerSeasonModel')

async function main() {
  console.log('Starting to scrape...')
  const browser = await puppeteer.launch()
  await downloadPerGameStats(browser)
  // await downloadConferenceStandings(browser)
  await browser.close()
  console.log('Done!')
}

async function downloadPerGameStats(browser) {
  const url =
    'https://www.basketball-reference.com/leagues/NBA_2020_per_game.html'
  const page = await newPage(browser)

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  })

  await page.waitForSelector('table#per_game_stats > tbody')

  const playerUrls = await page.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll('table#per_game_stats > tbody > tr'),
    )
    return rows.reduce((acc, row) => {
      const player = row.querySelector('td[data-stat="player"] > a')
      if (!row.classList.contains('thead') && !acc.includes(player.href)) {
        acc.push(player.href)
      }
      return acc
    }, [])
  })

  for (let i = 0; i < playerUrls.length; i++) {
    await page.goto(playerUrls[i], {
      waitUntil: 'domcontentloaded',
    })

    console.log(`Grabbing image for ${playerUrls[i]} `)

    const player = await page.evaluate(() => {
      const url = document.querySelector('div.media-item > img')
      return {
        name: document.querySelector('h1[itemprop="name"]').textContent,
        weight: document.querySelector('span[itemprop="weight"]').textContent,
        height: document.querySelector('span[itemprop="height"]').textContent,
        image: url ? url.src : '',
        teamAbbreviation: document.querySelector(
          'table#per_game > tbody > tr:last-child > td[data-stat="team_id"] > a',
        ).textContent,
        position: document.querySelector(
          'table#per_game > tbody > tr:last-child > td[data-stat="pos"]',
        ).textContent,
      }
    })

    const seasonStats = await page.evaluate(() => {
      const seasonStatsRows = Array.from(
        document.querySelectorAll('table#per_game > tbody > tr'),
      )
      const careerStatsRow = Array.from(
        document.querySelectorAll('table#per_game > tfoot > tr:first-child'),
      )
      return [...seasonStatsRows, ...careerStatsRow].reduce((acc, row) => {
        if (
          row.querySelector('td[data-stat="team_id"]') &&
          row.querySelector('td[data-stat="team_id"]').textContent !== 'TOT' &&
          !row
            .querySelector('td:last-child')
            .textContent.includes('Did Not Play') // some players, like Embiid, didn't play in the first two years
        ) {
          const data = {
            season: row.id
              ? row.querySelector('th[data-stat="season"] > a').textContent
              : 'Career',
            gamesPlayed: parseFloat(
              row.querySelector('td[data-stat="g"]').textContent,
            ),
            gamesStarted: parseFloat(
              row.querySelector('td[data-stat="gs"]').textContent,
            ),
            minutesPerGame: parseFloat(
              row.querySelector('td[data-stat="mp_per_g"]').textContent,
            ),
            fieldGoals: parseFloat(
              row.querySelector('td[data-stat="fg_per_g"]').textContent,
            ),
            fieldGoalAttempts: parseFloat(
              row.querySelector('td[data-stat="fga_per_g"]').textContent,
            ),
            fieldGoalPercentage: parseFloat(
              row.querySelector('td[data-stat="fg_pct"]').textContent,
            ),
            threePointFieldGoals: parseFloat(
              row.querySelector('td[data-stat="fg3_per_g"]').textContent,
            ),
            threePointFieldGoalAttempts: parseFloat(
              row.querySelector('td[data-stat="fg3a_per_g"]').textContent,
            ),
            threePointFieldGoalPercentage: parseFloat(
              row.querySelector('td[data-stat="fg3_pct"]').textContent,
            ),
            twoPointFieldGoals: parseFloat(
              row.querySelector('td[data-stat="fg2_per_g"]').textContent,
            ),
            twoPointFieldGoalAttempts: parseFloat(
              row.querySelector('td[data-stat="fg2a_per_g"]').textContent,
            ),
            twoPointFieldGoalPercentage: parseFloat(
              row.querySelector('td[data-stat="fg2_pct"]').textContent,
            ),
            effectiveFieldGoalPercentage: parseFloat(
              row.querySelector('td[data-stat="efg_pct"]').textContent,
            ),
            freeThrows: parseFloat(
              row.querySelector('td[data-stat="ft_per_g"]').textContent,
            ),
            freeThrowAttempts: parseFloat(
              row.querySelector('td[data-stat="fta_per_g"]').textContent,
            ),
            freeThrowPercentage: parseFloat(
              row.querySelector('td[data-stat="ft_pct"]').textContent,
            ),
            offensiveRebounds: parseFloat(
              row.querySelector('td[data-stat="orb_per_g"]').textContent,
            ),
            defensiveRebounds: parseFloat(
              row.querySelector('td[data-stat="drb_per_g"]').textContent,
            ),
            totalRebounds: parseFloat(
              row.querySelector('td[data-stat="trb_per_g"]').textContent,
            ),
            assists: parseFloat(
              row.querySelector('td[data-stat="ast_per_g"]').textContent,
            ),
            steals: parseFloat(
              row.querySelector('td[data-stat="stl_per_g"]').textContent,
            ),
            blocks: parseFloat(
              row.querySelector('td[data-stat="blk_per_g"]').textContent,
            ),
            turnovers: parseFloat(
              row.querySelector('td[data-stat="tov_per_g"]').textContent,
            ),
            personalFouls: parseFloat(
              row.querySelector('td[data-stat="pf_per_g"]').textContent,
            ),
            points: parseFloat(
              row.querySelector('td[data-stat="pts_per_g"]').textContent,
            ),
          }

          if (row.id) {
            // skip "Career" row, which doesn't have a team and position column value
            data.team = row.querySelector(
              'td[data-stat="team_id"] > a',
            ).textContent
            data.position = row.querySelector('td[data-stat="pos"]').textContent
          }

          acc.push(data)
        }
        return acc
      }, [])
    })

    console.log(`Season stats for ${player.name}`, seasonStats)

    // backfilling some missing entries
    // const dbPlayer = await PlayerModel.find({ name: player.name })
    // const existingDbPlayerStats = await StatsPerSeasonModel.findAll({
    //   id: dbPlayer.id,
    // })

    // const missingSeasonStats = seasonStats.filter(
    //   ({ season: season1 }) =>
    //     !existingDbPlayerStats.some(
    //       ({ season: season2 }) => season1 === season2,
    //     ),
    // )

    // const stats = missingSeasonStats.length ? missingSeasonStats : seasonStats
    // if (missingSeasonStats.length) {
    // for (const stat of missingSeasonStats) {

    for (const stat of seasonStats) {
      await StatsPerSeasonController.create({
        player_name: player.name,
        team_name: stat.team,
        season: stat.season,
        games_played: stat.gamesPlayed,
        games_started: stat.gamesStarted,
        minutes_played: stat.minutesPerGame,
        field_goals: stat.fieldGoals,
        field_goal_attempts: stat.fieldGoalAttempts,
        field_goal_percentage: stat.fieldGoalPercentage,
        three_point_field_goals: stat.threePointFieldGoals,
        three_point_field_goal_attempts: stat.threePointFieldGoalAttempts,
        three_point_field_goal_percentage: stat.threePointFieldGoalPercentage,
        two_point_field_goals: stat.twoPointFieldGoals,
        two_point_field_goal_attempts: stat.twoPointFieldGoalAttempts,
        two_point_field_goal_percentage: stat.twoPointFieldGoalPercentage,
        effective_field_goal_percentage: stat.effectiveFieldGoalPercentage,
        free_throws: stat.freeThrows,
        free_throw_attempts: stat.freeThrowAttempts,
        free_throw_percentage: stat.freeThrowPercentage,
        offensive_rebounds: stat.offensiveRebounds,
        defensive_rebounds: stat.defensiveRebounds,
        total_rebounds: stat.totalRebounds,
        assists: stat.assists,
        steals: stat.steals,
        blocks: stat.blocks,
        turnovers: stat.turnovers,
        personal_fouls: stat.personalFouls,
        points: stat.points,
      })
    }

    const team = await TeamController.findByAbbreviation({
      abbreviation: player.teamAbbreviation,
    })
    console.log(`Grabbing full name team for ${player.name}: ${team.name}`)

    // some players have played for different teams throughout the season.
    // we just want the most recent team; overwrite previous entries with new team_id
    const existingPlayer = await PlayerController.find({ name: player.name })
    if (existingPlayer) {
      await PlayerController.update({
        name: player.name,
        image: player.image,
        weight: player.weight,
        height: player.height,
        position: player.position,
      })
    } else {
      await PlayerController.create({
        name: player.name,
        image: player.image,
        weight: player.weight,
        height: player.height,
        team_id: team.id,
      })
    }

    console.log('Player analysis done.')
  }

  await page.close()
}

async function downloadConferenceStandings(browser) {
  const url = 'https://www.basketball-reference.com/leagues/NBA_2020.html'
  const page = await newPage(browser)

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  })

  const selector = 'table#confs_standings_E > tbody'
  await page.waitForSelector(selector)

  const easternConference = await page.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll('table#confs_standings_E > tbody > tr'),
    )
    return rows.map((element) => {
      const teamName = element.querySelector('th[data-stat="team_name"] > a')
        .textContent
      const seed = element
        .querySelector('th[data-stat="team_name"] > span')
        .textContent.replace(/[()]/g, '')
        .trim()
      const wins = element.querySelector('td[data-stat="wins"]').textContent
      const losses = element.querySelector('td[data-stat="losses"]').textContent
      const winLossPercentage = element.querySelector(
        'td[data-stat="win_loss_pct"]',
      ).textContent
      const gamesBack = element.querySelector('td[data-stat="gb"]').textContent

      return {
        teamName,
        seed: parseInt(seed),
        win: parseInt(wins),
        loss: parseInt(losses),
        winLossPercentage: parseFloat(winLossPercentage),
        gamesBack: parseInt(gamesBack),
      }
    })
  })

  const westernConference = await page.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll('table#confs_standings_W > tbody > tr'),
    )
    return rows.map((element) => {
      const teamName = element.querySelector('th[data-stat="team_name"] > a')
        .textContent
      const seed = element
        .querySelector('th[data-stat="team_name"] > span')
        .textContent.replace(/[()]/g, '')
        .trim()
      const wins = element.querySelector('td[data-stat="wins"]').textContent
      const losses = element.querySelector('td[data-stat="losses"]').textContent
      const winLossPercentage = element.querySelector(
        'td[data-stat="win_loss_pct"',
      ).textContent
      const gamesBack = element.querySelector('td[data-stat="gb"').textContent

      return {
        teamName,
        seed: parseInt(seed),
        win: parseInt(wins),
        loss: parseInt(losses),
        winLossPercentage: parseFloat(winLossPercentage),
        gamesBack: parseInt(gamesBack),
      }
    })
  })

  for (const team of easternConference) {
    await ConferenceStandingController.create({ division: 'east', data: team })
  }

  for (const team of westernConference) {
    await ConferenceStandingController.create({ division: 'west', data: team })
  }

  await page.close()
}

async function newPage(browser) {
  const page = await browser.newPage()
  page.setDefaultTimeout(20000)

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
  )

  await page.setViewport({
    width: 1980,
    height: 1080,
  })

  return page
}

main()
