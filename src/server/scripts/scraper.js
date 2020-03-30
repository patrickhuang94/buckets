const fs = require('fs')
const puppeteer = require('puppeteer')

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
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'
  )

  await page.setViewport({
    width: 1980,
    height: 1080
  })

  return page
}

async function fetchUrl(browser, url) {
  const page = await newPage(browser)

  await page.goto(url, {
    waitUntil: 'domcontentloaded'
  })

  const html = await page.content()
  await page.close()

  return html
}

async function downloadPerGameStats(browser) {
  const url =
    'https://www.basketball-reference.com/leagues/NBA_2020_per_game.html'
  const htmlFilename = 'per_game_stats.html'

  console.log(`Downloading HTML from ${url}...`)

  const html = await fetchUrl(browser, url)
  fs.writeFile(htmlFilename, html)
}

main()
