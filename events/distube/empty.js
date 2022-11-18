const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {
    const embed = new EmbedBuilder()
    .setColor('#A9E2F3')
    .setDescription(`**Kanal boş!**`)

    queue.textChannel.send({ embeds: [embed] })
}
