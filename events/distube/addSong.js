const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
    let embed = new EmbedBuilder()
    .setDescription(`**Şarkı kuyruğa eklendi • [${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`)
    .setColor('#A9E2F3')

    queue.textChannel.send({ content: ' ', embeds: [embed] })
}

