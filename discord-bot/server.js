// server.js
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {initializeDiscordCommands} from './discord/discordCommands.js'
import {handleInteractionCreate} from './discord/interactionHandler.js'
import {handleNewOrder} from './routes/orderHandler.js'

const app = express()

app.use(express.json())

app.listen(3001, () => {
    console.log('Server listening on port 3001')
})

app.post('/new-order', handleNewOrder)

initializeDiscordCommands()
handleInteractionCreate()

/***
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'ping') {
      await interaction.reply({
        content: orderContent,
        components: [row],
      })
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === 'confirm') {
      console.log('confirm order')
      await interaction.update({
        content: orderContent + 'Order Confirmed',
        components: [],
      })
    } else if (interaction.customId === 'ready') {
      console.log('ready order')
    } else if (interaction.customId === 'cancel') {
      console.log('cancel order')
    }
  }
}) 

 */
