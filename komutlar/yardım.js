const Discord = require ("discord.js");

exports.run = (client, message) => {
const lembed = new Discord.MessageEmbed()

.then;   
const mhelp = new Discord.MessageEmbed()
.setColor("BLACK")
.setAuthor(`${client.user.username} `, client.user.avatarURL)  
.setTitle("𝐆𝐚𝐥𝐚𝐭𝐜𝐡𝐢 Bot Moderasyon")


    .setDescription(`


╔═════════════════════════════════════╗
║**MODERASYON KOMUTLARI**
║**gh!ban**   Sunucudan bir üyeyi yasaklar.
║**gh!unban** İstediğiniz kişinin banını kaldırır.
║**gh!kick**  Sunucudan bir üye kickler.
║**gh!jail**  Kişiyi jaile yollar.
║**gh!ping**  Botun mesaj gecikmesini ölçersiniz.
║══════════════════════════════════════
║**SOHBET KOMUTLARI**
║**gh!afk**          AFK kalırsınız etiketlendiğinizde sebebi yazar.
║**gh!sil**          Belirli bir kanaldaki mesajları siler.
║**gh!sohbet-kapat** Sohbeti Kapatır ve yazı yazılamaz.
║**gh!sohbet-aç**    Sohbeti Açar ve yazı yazılabilir.
║**gh!nuke**         Kanalı kapatır,mesajları siler ve tekrardan açar.
║**gh!mute**         Kişiye chat/voice mute atılır.
║══════════════════════════════════════
║**SESLİ KOMUTLARI**
║**gh!git**          Kişi onay verirse odasına gidersiniz.
║**gh!çek**          Kişi onay verirse odanıza gelir.
║**gh!mute**         Kişiye chat/voice mute atılır.
╚═════════════════════════════════════╝
`) 
.setImage("https://cdn.discordapp.com/attachments/786959102815371314/853007250146852874/Animated_GIF-source.gif")
       .addField(`» GALATCHI MODERASYON`, `**[Destek Sunucusu](https://discord.gg/uJW8UAeAdp)**`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
message.channel.send(mhelp)
.then; const sembed = new Discord.MessageEmbed()

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["yardım"], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'yardım', 
    description: '',
    usage: ''
  };