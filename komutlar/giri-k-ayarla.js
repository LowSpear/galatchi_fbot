const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
 
exports.run = async (client, message, args) => {
     if (!message.guild) {
    return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setTitle('Hatalı kullanım;').setDescription(message.author.tag + ', komutları direkt mesajda kullanamazsın.\nLütfen bu komutu bir sunucuda dene.').setFooter ("Galatchi Bot", client.user.avatarURL).setTimestamp()); }
  let guild = message.guild
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`);
 
  let channel = message.mentions.channels.first();
  if (!channel) {
    return message.reply("Resimli Hoşgeldin - Güle Güle Kanalı Yazın Örnek gh!gç-ayarla #gelen-giden");
  }
  db.set(`gçkanal_${message.guild.id}`, channel.id);
  message.channel.send(`✅ **Resimli Hoşgeldin - Güle Güle kanalı ${channel} Olarak Ayarlandı. \n[${message.author}]**.`);
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gç-ayarla"],
  permLevel: 0
};
 
exports.help = {
  name: "giriş-çıkış-ayarla",
  description: "Giriş Çıkış Kanalını Ayarlar.",
  usage: "gç-ayarla <#kanal>"
};