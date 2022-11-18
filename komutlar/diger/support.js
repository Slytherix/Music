const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    config: {
        name: "destek-sunucusu",
        aliases: [],
        kategori: "diger",
        description: "Botun destek sunucusu.",
    },
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
        .setColor("#A9E2F3")
        .setAuthor({ name: "Destek Sunucusu!"})
        .setDescription("```Sorun yaşadığın zaman destek sunucusuna Katıl!```")
        .setTimestamp()
        .setFooter({ text: `${message.author.tag} Tarafından Kullanıldı.`, iconURL: message.author.displayAvatarURL()});

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Destek Sunucusu")
                    .setURL(`https://discord.gg/pSA8VBn3`)
                    .setEmoji("🔗")
                    .setStyle(ButtonStyle.Link)
            )
        
        message.channel.send({ embeds: [embed], components: [row] });
    }
}
