const lyricsfinder = require('lyrics-finder');
const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "lyrics",
        aliases: [],
        description: "Şarkı sözlerini gösterir",
        kategori: "muzik"

    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Yükleniyor Lütfen Bekleyin");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`Şu anda kuyrukta hiçbir şey yok.!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı / sesli kanalda olmanız gerekmektedir.`\`🤬\`")

        let song = args.join(" ");
            let CurrentSong = queue.songs[0];
        if (!song && CurrentSong) song = CurrentSong.name;

        let lyrics = null;

        try {
            lyrics = await lyricsfinder(song, "");
            if (!lyrics) msg.edit("Bu şarkı için herhangi bir şarkı sözü bulamadım!");
        } catch (err) {
            console.log(err);
            msg.edit("Bu şarkı için herhangi bir şarkı sözü bulamadım!");
        }
        let lyricsEmbed = new EmbedBuilder()
            .setColor('#A9E2F3')
            .setTitle(`Lyrics`)
            .setDescription(`**${song}**\n${lyrics}`)
            .setFooter({ text: `${message.author.username} Tarafından Kullanıldı.`})
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription("Şarkı sözleri görüntülenemeyecek kadar uzun!");
        }

        msg.edit({ content: ' ', embeds: [lyricsEmbed] })
        .then(n => {
            var total = queue.songs[0].duration * 1000;
            var current = queue.currentTime * 1000;
            let time = total - current;
            setTimeout(() => { msg.delete(); }, time);
        });
    }
};