const fs = require('fs')
const cheerio = require('cheerio')

async function parseData() {
  console.log('Parsing data from html...')

  const htmlFilename = 'per_game_stats.html'
  fs.readFile(htmlFilename, (err, data) => {
    if (err) console.error(`Parsing gone wrong: ${err}`)

    const $ = cheerio.load(data)
    const categories = $('#per_game_stats > thead > tr')
      .children()
      .toArray()
      .reduce((result, element) => {
        if ($(element).attr('data-tip') !== 'Rank') {
          result.push($(element).html())
        }
        return result
      }, [])

    const tableRows = $('#per_game_stats > tbody').children().toArray()

    const playerData = tableRows.map((tr) =>
      $(tr)
        .children()
        .toArray()
        .reduce((result, element) => {
          if ($(element).is('td')) {
            if (['player', 'team_id'].includes($(element).attr('data-stat'))) {
              result.push($(element).find('a').html())
            } else {
              result.push($(element).html())
            }
          }

          return result
        }, []),
    )

    const formattedPlayerData = playerData.map((player) => ({
      [player[0]]: categories.map((category, index) => ({
        [category]: player[index],
      })),
    }))

    // console.log({ formattedPlayerData: JSON.stringify(formattedPlayerData) })

    // write the data to database
  })
}

parseData()
