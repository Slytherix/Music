const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, playlist) => {
    const embed = new EmbedBuilder()
        .setDescription(`**Şarkı kuyruğa eklendi • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks) • ${playlist.user}`)
        .setColor('#A9E2F3')
  
      queue.textChannel.send({ embeds: [embed] })
}

