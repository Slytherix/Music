const Discord = require("discord.js");

module.exports = {
    config: {
        name: "ping",
        aliases: ["pong"],
        usage: "(komut)",
        kategori: "diger",
        description: "Ping komutu.",
    },
    run: async (client, message, args) => {


  const ping = new Discord.EmbedBuilder()
.setDescription(`Gecikme sürem → ${client.ws.ping} ms 🏓`)
.setColor("#A9E2F3")
 message.channel.send({ embeds: [ping] })
     }
    }
