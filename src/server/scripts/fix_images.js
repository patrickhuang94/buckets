const Player = require('../models/playerModel')

async function runScript() {
  const allPlayers = await Player.findAll()

  for (let i = 0; i < allPlayers.length; i++) {
    const player = allPlayers[i]
    const strippedImage = player.image.replace(/[\{\}]/g, '').replace(/"/g, '')
    await Player.update({ name: player.name, image: strippedImage })
    console.log('Player updated for ', player.name)
  }
}

runScript()
