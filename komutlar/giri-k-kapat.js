const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
     if (!message.guild) {
    return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setTitle('Hatalı kullanım;').setDescription(message.author.tag + ', komutları direkt mesajda kullanamazsın.\nLütfen bu komutu bir sunucuda dene.').setFooter('WILFLEAX Bot', client.user.avatarURL).setTimestamp()); }
  let guild = message.guild
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.reply(`Bu komutu kullanabilmek için **Sunucuyu Yönet** iznine sahip olmalısın!`);
  
  if (db.has(`gçkanal_${message.guild.id}`) === false) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Resimli Hoşgeldin - Güle Güle Kanalını Ayarlamadığın İçin Sıfırlayamazsın!`)
      .setColor("RED")
      .setTimestamp(`Ayarlamak İçin Örnek wx!gç-ayarla #gelen-giden`);
    message.channel.send(embed);
    return;
  }
  db.delete(`gçkanal_${message.guild.id}`);

  const embed = new Discord.MessageEmbed()
    .setDescription(`Resimli Hoşgeldin - Güle Güle Sistemi Kapatıldı Yeniden Açmak İçin Örnek wx!gç-ayarla #gelen-giden`)
    .setColor("RANDOM")
    .setTimestamp();
  message.channel.send(embed);
  return;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["giriş-çıkış-sıfırla",'gç-kapat','giriş-çıkış-kapat'],
  permLevel: 0
};

exports.help = {
  name: "giriş-çıkış-kapat",
  description: "Giriş çıkışı kapatır",
  usage: "giriş-çıkış-kapat"
};
