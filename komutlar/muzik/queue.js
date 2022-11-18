const { EmbedBuilder } = require("discord.js");
const pagequeue = require('../../structures/pagequeue.js');

module.exports = {
    config: {
        name: "queue",
        aliases: ["q", "que"],
        description: "Şarkı kuyruğunu görüntülersiniz.",
		kategori: "muzik"

    },
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!queue) message.channel.send(`Şu anda kuyrukta hiçbir şey yok.!`)
        const { channel } = message.member.voice;
		if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("Aynı / sesli kanalda olmanız gerekmektedir.`\`🤬\`")

		const pagesNum = Math.ceil(queue.songs.length / 10);
		if(pagesNum === 0) pagesNum = 1;

        const qduration = queue.formattedDuration;

		const songStrings = [];
		for (let i = 1; i < queue.songs.length; i++) {
			const song = queue.songs[i];
			songStrings.push(
				`**${i}.** [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}
				`);
		}

		const pages = [];
		for (let i = 0; i < pagesNum; i++) {
			const str = songStrings.slice(i * 10, i * 10 + 10).join('');
			const embed = new EmbedBuilder()
                .setAuthor({ name: `Kuyruk - ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true })})
                .setThumbnail(queue.songs[0].thumbnail)
				.setColor('#A9E2F3')
				.setDescription(`**Şuan Çalan Şarkı:**\n**[${queue.songs[0].name}](${queue.songs[0].url})** \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n**Sıranın geri kalanı:**${str == '' ? '  Bulunamadı' : '\n' + str }`)
				.setFooter({ text: `Sayfa • ${i + 1}/${pagesNum} | ${queue.songs.length} • Şarkı | ${queue.formattedDuration} • Toplam Süresi`});
			pages.push(embed);
		}

		if (!args[0]) {
			if (pages.length == pagesNum && queue.songs.length > 10) pagequeue(client, message, pages, 60000, queue.songs.length, qduration);
			else return message.channel.send({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[0])) return message.channel.send('Bir sayı belirtmelisiniz.');
			if (args[0] > pagesNum) return message.channel.send(`Yalnızca ${pagesNum} sayfaları kullanılabilir.`);
			const pageNum = args[0] == 0 ? 1 : args[0] - 1;
			return message.channel.send({ embeds: [pages[pageNum]] });
		}
	}
}
