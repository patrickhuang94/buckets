const fs = require('fs')
const puppeteer = require('puppeteer')
const PlayerController = require('../controllers/playerController')
const TeamController = require('../controllers/teamController')

async function main() {
  console.log('Starting to scrape...')
  const browser = await puppeteer.launch()
  await downloadPerGameStats(browser)
  await browser.close()
  console.log('Done!')
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

async function fetchUrl(browser, url) {
  const page = await newPage(browser)

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  })

  // fetch player image urls
  const selector = 'td[data-stat="player"] > a'
  await page.waitForSelector(selector)
  const playerUrls = await page.$$eval(selector, (row) => row.filter((e) => e.href).map((e) => e.href))

  for (let i = 0; i < playerUrls.length; i++) {
    await page.goto(playerUrls[i], {
      waitUntil: 'domcontentloaded',
    })

    console.log(`Grabbing image for ${playerUrls[i]} `)

    const name = await page.evaluate(() => document.querySelector('h1[itemprop="name"]').textContent)
    const image = await page.$$eval('div.media-item > img', (images) => images.map((img) => img.src))
    const teamAbbreviation = await page.evaluate(
      () => document.querySelector('table#per_game > tbody > tr:last-child > td[data-stat="team_id"] > a').textContent,
    )
    const team = await TeamController.getTeamByAbbreviation({ abbreviation: teamAbbreviation })

    console.log(`Grabbing team for ${playerUrls[i]}: ${team}`)

    // some players have played for different teams thorughout the season.
    // we just want the most recent team; overwrite previous entries with new team_id
    const existingPlayer = await PlayerController.findPlayer({ name })
    if (existingPlayer && existingPlayer.length) {
      await PlayerController.updatePlayer({ name, team_id: team.id })
    } else {
      PlayerController.createPlayer({
        name,
        image,
        team_id: team.id,
      })
    }

    console.log({ team: team.id })
  }

  // fetch entire page content
  const html = await page.content()
  await page.close()

  return html
}

async function downloadPerGameStats(browser) {
  const url = 'https://www.basketball-reference.com/leagues/NBA_2020_per_game.html'
  const htmlFilename = 'per_game_stats.html'

  console.log(`Downloading HTML from ${url}...`)

  const html = await fetchUrl(browser, url)
  fs.writeFile(htmlFilename, html)
}

main()
