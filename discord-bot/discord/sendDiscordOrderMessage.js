// sendDiscordOrderMessage.js
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} from 'discord.js'

// Function to send a formatted order message to a Discord channel
function sendOrderDiscordMessage(channel, info) {
    const orderEmbed = new EmbedBuilder()
        .setColor(0xffa500)
        .setTitle('فاکتور سفارش')
        .setURL(
            `${process.env.API_URL}/admin/content-manager/collectionType/api::order.order/${info.id}`
        )
        .setThumbnail(
            'https://www.iconsdb.com/icons/preview/orange/new-xxl.png'
        )
        .addFields(
            ...info.cartItems.map((item) => ({
                name: item.title.toString(),
                value: '‫' + `x${item.quantity.toString()}`,
                inline: true,
            })),
            {
                name: 'قیمت کل',
                value: '‫' + info.total.toString(),
                inline: false,
            },
            {
                name: 'نام',
                value:
                    '‫' +
                    `${info.deliveryInformation.firstName} ${info.deliveryInformation.lastName}`,
                inline: true,
            },
            {
                name: 'شماره تماس',
                value: '‫' + info.deliveryInformation.phonenumber.toString(),
                inline: true,
            },
            {
                name: 'آدرس',
                // Check if the address is empty and set a default value
                value: info.deliveryInformation.address
                    ? '‫' + info.deliveryInformation.address
                    : 'آدرسی وارد نشده است',
                inline: false,
            },
            {
                name: 'یادداشت',
                value: '‫' + info.note,
                inline: false,
            },
            {
                name: 'نمایش روی نقشه',
                value: `https://www.google.com/maps/dir/${info.coordinates.lat},${info.coordinates.lng}/28.9596254,50.8307452/@${info.coordinates.lat},${info.coordinates.lng},17z`,
            }
        )
        .setTimestamp()
        .setFooter({
            text: 'Order date',
            iconURL: 'https://i.imgur.com/AsaD74G.png',
        })

    const confirmButton = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel('Confirm ')
        .setStyle(ButtonStyle.Primary)

    const cancelButton = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Danger)

    const actionRow = new ActionRowBuilder().addComponents(
        confirmButton,
        cancelButton
    )

    channel.send({
        content: `## **${info.id}-${info.uuid}**`,
        embeds: [orderEmbed],
        components: [actionRow],
    })
}

export {sendOrderDiscordMessage}
