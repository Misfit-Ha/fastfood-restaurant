import { REST, Routes } from 'discord.js'
import 'dotenv/config'

export async function initializeDiscordCommands() {
  const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
    {
      name: 'opensite',
      description: 'Opens the site!',
    },
    {
      name: 'closesite',
      description: 'Closes the site!',
    },
    {
      name: 'refreshjwt',
      description:
        'Refreshes jwt token, use it if ypur getting 403 error but propebly wouldnt need it',
    },
  ]

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

  try {
    console.log('Refreshing application (/) commands.')
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    })
    console.log('Application (/) commands reloaded.')
  } catch (error) {
    console.error('Error refreshing application (/) commands:', error.message)
  }
}
