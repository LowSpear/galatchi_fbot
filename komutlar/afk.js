const Discord = require("discord.js");
const db = require("quick.db");


client.on("message", async message => {
  
  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.content.includes(`${prefix}afk`)) return;
  
  if(await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
      const embed = new Discord.MessageEmbed()
    .setTitle("Galatchi AFK Sistemi")
    .setColor("#ff7f00")
    .addField('Başarıyla Afk Modundan Çıktın Adını Düzelttim',`HG`)
      .setFooter(message.author.tag, message.author.displayAvatarURL();
     message.channel.send(embed);
    message.member.setNickname(`${message.author.username}`)
  }
  
  var USER = message.mentions.users.first();
  if(!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);
  
  if(REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms2(Date.now() - süre);
    const embed = new Discord.MessageEmbed()
    .setTitle("Galatchi AFK Sistemi")
    .setColor("#ff7f00")
      .setFooter(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`${USER} Adlı Kullanıcı AFK (Müsait Değil) Lütfen Yazan Sebebe Göre Yeniden Geliniz.\nAFK Olma Süresi : **${timeObj.hours} Saat ${timeObj.minutes} Dakika ${timeObj.seconds} Saniye**\nAFK Olma Sebebi : ${REASON}`)
    message.channel.send(embed)
  }
});
