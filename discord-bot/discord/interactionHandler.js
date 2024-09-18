// interactionHandler.js
import {
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    EmbedBuilder,
} from 'discord.js'
import {updateOrderState} from '../utills/updateState.js'
import client from './discordClient.js'
import {updateSettinge} from '../routes/updateSettinge.js'

const smsRequestOptions = {
    method: 'GET',
    redirect: 'follow',
}

const baseUrl = 'http://api.payamak-panel.com/post/Send.asmx/SendSimpleSMS'
const username = process.env.SMS_USER
const password = process.env.SMS_PASSWORD
const fromNumber = '50004001820357'
const isFlash = true

async function sendSMS(phonenumber, text) {
    // URL-encode the text
    const encodedText = encodeURIComponent(text)
    const url = `${baseUrl}?username=${username}&password=${password}&to=${phonenumber}&from=${fromNumber}&text=${encodedText}&isflash=${isFlash}`

    try {
        await fetch(url, smsRequestOptions)
    } catch (error) {
        console.error(`Error: ${error}`)
        return error
    }
}

// Helper function to get the current embed from a message
function getCurrentEmbed(message) {
    return message.embeds[0].toJSON()
}

// Function to handle interaction update
async function handleInteractionUpdate(interaction, newActionRow, newEmbed) {
    await interaction
        .update({
            components: [newActionRow],
            embeds: [newEmbed],
        })
        .catch((error) => console.error('Error updating interaction:', error))
}

//Function to handle order status change
async function handleOrderStatusChange(
    newEmbed,
    phonenumberField,
    combinedID,
    mID,
    statusEN,
    color,
    thumbnail,
    message
) {
    newEmbed.setColor(color).setThumbnail(thumbnail)

    try {
        await sendSMS(
            phonenumberField.value,
            `${message}\narkanburger.ir/tab/${mID}`
        )
        await updateOrderState(mID, statusEN)
    } catch (error) {
        console.error('Error sending SMS:', error)
        newEmbed.setDescription(`An error occurred.`)
    }
}

// Function to handle interaction creation
export function handleInteractionCreate() {
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isButton()) {
            const message = interaction.message
            const oldEmbed = getCurrentEmbed(message)
            const mID = message.content.split('-')[0].replace('## **', '')
            const combinedID = message.content.slice(5, -2)
            const phonenumberField = oldEmbed.fields.find(
                (field) => field.name === 'شماره تماس'
            )

            if (!oldEmbed || !phonenumberField) return

            const newEmbed = new EmbedBuilder(oldEmbed)
            const oldActionRow = message.components[0]
            const oldButtons = oldActionRow.components

            let newButtons, newActionRow

            // Update the buttons based on the interaction type
            if (interaction.customId === 'confirm') {
                newButtons = oldButtons.map((button) =>
                    button.customId === 'confirm'
                        ? new ButtonBuilder()
                              .setCustomId('confirm')
                              .setLabel('Confirmed')
                              .setStyle(ButtonStyle.Primary)
                              .setDisabled(true)
                        : button
                )

                newButtons.splice(
                    1,
                    0,
                    new ButtonBuilder()
                        .setCustomId('ready')
                        .setLabel('Ready')
                        .setStyle(ButtonStyle.Success)
                )
            } else {
                newButtons = [
                    new ButtonBuilder()
                        .setCustomId(interaction.customId)
                        .setLabel(
                            interaction.customId.charAt(0).toUpperCase() +
                                interaction.customId.slice(1) +
                                '!'
                        )
                        .setStyle(
                            ButtonStyle[
                                interaction.customId === 'cancel'
                                    ? 'Danger'
                                    : 'Success'
                            ]
                        )
                        .setDisabled(true),
                ]
            }

            newActionRow = new ActionRowBuilder().addComponents(newButtons)

            switch (interaction.customId) {
                case 'confirm':
                    await handleOrderStatusChange(
                        newEmbed,
                        phonenumberField,
                        combinedID,
                        mID,
                        'confirmed',
                        0x226ee1,
                        'https://i.imgur.com/FAgsP6m.png',
                        'سفارش شما تایید شد'
                    )
                    break
                case 'cancel':
                    await handleOrderStatusChange(
                        newEmbed,
                        phonenumberField,
                        combinedID,
                        mID,
                        'cancelled',
                        0xff0000,
                        'https://i.imgur.com/ebOJe23.png',
                        'سفارش شما لغو شد'
                    )
                    break
                case 'ready':
                    await handleOrderStatusChange(
                        newEmbed,
                        phonenumberField,
                        combinedID,
                        mID,
                        'ready',
                        0x11a43b,
                        'https://i.imgur.com/Fy6n8SW.png',
                        'سفارش شما آماده ی ارسال است'
                    )
                    break
                default:
                    return
            }
            await handleInteractionUpdate(interaction, newActionRow, newEmbed)
        } else if (interaction.isChatInputCommand()) {
            if (interaction.commandName === 'ping') {
                await interaction.reply('Pong!')
            } else if (interaction.commandName === 'opensite') {
                await updateSettinge(false)

                await interaction.reply('سفارش گیری فعال شد')
            } else if (interaction.commandName === 'closesite') {
                await updateSettinge(true)

                await interaction.reply('سفارش گیری غیرفعال شد')
            }
        }
    })

    client.login(process.env.TOKEN)
}
