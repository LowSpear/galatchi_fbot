   const db = require('quick.db')
   const Discord = require('discord.js')

exports.run = async (client, message, args) => { 
     if (!message.guild) {
    return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setTitle('Hatalı kullanım;').setDescription(message.author.tag + ', komutları direkt mesajda kullanamazsın.\nLütfen bu komutu bir sunucuda dene.').setFooter('Galatchi AFK Sistemi ', client.user.avatarURL).setTimestamp()); }
  let guild = message.guild
  
var USER = message.author;
   const b = message.author.username
  var REASON = args.slice(0).join("  ");
  if(!REASON) return message.channel.send("AFK Olmak İçin Bir Sebep Belirtmelisin.");
  
  db.set(`afk_${USER.id}`, REASON);
  db.set(`afk_süre_${USER.id}`, Date.now());
 const embed = new Discord.MessageEmbed()
    .setTitle("Galatchi AFK Sistemi")
    .setColor("#ff7f00")
    .addField('Başarıyla Afk Oldunuz Adınızı Değiştim Sizi Etiketleyen Olursa AFK Olduğunuzu Söyleyeceğim',`Sebep: ${REASON}`);
     message.channel.send(embed);
  message.member.setNickname(`[AFK] ` + b)

 };  
exports.conf = {
	enabled:false,
	guildOnly: false,
	aliases: ['afk'],
	permLevel: 0,
}

exports.help = {
	name: 'afk', 
	description: '',
	usage: ''
}
