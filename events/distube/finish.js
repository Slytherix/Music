const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {
    const embed = new EmbedBuilder()
        .setDescription(`\`📛\` | **Şarkı sonlandırılmıştır**`)
        .setColor('#A9E2F3')

    queue.textChannel.send({ embeds: [embed] })
}

