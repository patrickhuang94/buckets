const puppeteer = require('puppeteer')
const PlayerController = require('../controllers/playerController')
const TeamController = require('../controllers/teamController')
const ConferenceStandingController = require('../controllers/conferenceStandingController')

async function main() {
  console.log('Starting to scrape...')
  const browser = await puppeteer.launch()
  await downloadPerGameStats(browser)
  await downloadConferenceStandings(browser)
  await browser.close()
  console.log('Done!')
}

async function downloadPerGameStats(browser) {
  const url = 'https://www.basketball-reference.com/leagues/NBA_2020_per_game.html'
  const page = await newPage(browser)

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  })

  const selector = 'td[data-stat="player"] > a'
  await page.waitForSelector(selector)
  const playerUrls = await page.$$eval(selector, (row) => row.filter((e) => e.href).map((e) => e.href))

  for (let i = 0; i < playerUrls.length; i++) {
    await page.goto(playerUrls[i], {
      waitUntil: 'domcontentloaded',
    })

    console.log(`Grabbing image for ${playerUrls[i]} `)

    const name = await page.evaluate(() => document.querySelector('h1[itemprop="name"]').textContent)
    const image = await page.evaluate(() => {
      const url = document.querySelector('div.media-item > img')
      return url ? url.src : ''
    })

    const teamAbbreviation = await page.evaluate(
      () => document.querySelector('table#per_game > tbody > tr:last-child > td[data-stat="team_id"] > a').textContent,
    )
    const team = await TeamController.getTeamByAbbreviation({ abbreviation: teamAbbreviation })
    console.log(`Grabbing team for ${name}: ${team.name}`)

    // some players have played for different teams thorughout the season.
    // we just want the most recent team; overwrite previous entries with new team_id
    const existingPlayer = await PlayerController.findPlayer({ name })
    if (existingPlayer) {
      await PlayerController.updatePlayer({ name, image })
    } else {
      await PlayerController.createPlayer({
        name,
        image,
        team_id: team.id,
      })
    }

    console.log('Player analysis done.')
  }
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
    const rows = Array.from(document.querySelectorAll('table#confs_standings_E > tbody > tr'))
    return rows.map((element) => {
      const teamName = element.querySelector('th[data-stat="team_name"] > a').textContent
      const seed = element.querySelector('th[data-stat="team_name"] > span').textContent.replace(/[()]/g, '').trim()
      const wins = element.querySelector('td[data-stat="wins"]').textContent
      const losses = element.querySelector('td[data-stat="losses"]').textContent
      const winLossPercentage = element.querySelector('td[data-stat="win_loss_pct"').textContent
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

  const westernConference = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table#confs_standings_W > tbody > tr'))
    return rows.map((element) => {
      const teamName = element.querySelector('th[data-stat="team_name"] > a').textContent
      const seed = element.querySelector('th[data-stat="team_name"] > span').textContent.replace(/[()]/g, '').trim()
      const wins = element.querySelector('td[data-stat="wins"]').textContent
      const losses = element.querySelector('td[data-stat="losses"]').textContent
      const winLossPercentage = element.querySelector('td[data-stat="win_loss_pct"').textContent
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
