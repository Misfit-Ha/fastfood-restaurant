// orderHandler.js
import { sendOrderDiscordMessage } from '../discord/sendDiscordOrderMessage.js'
import client from '../discord/discordClient.js'

export async function handleNewOrder(req, res) {
  console.log('order received')
  const ordersChannel = client.channels.cache.get('1071502330077397044')
  const sentMessage = await sendOrderDiscordMessage(
    ordersChannel,
    req.body.data
  )
  res.send('POST request received!')
}
