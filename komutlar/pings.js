const Discord = require("discord.js");

module.exports = {
    name: "ping", // komutumuzun adı
    aliases: ["gecikme","ms"], // komutumuzun diğer kullanımları
    description: "Botun Pingini Ölçer", // komutumuzun açıklaması burayı sallayabilirsiniz farketmez
    usage: "ping", // komutumuzun kullanımı
    ownerOnly: false, // herkes kullanabilir mi yoksa sadece bot sahibi mi kullanabilir eğer false yaparsanız herkes kullanabilir

    run: async (message,args,client) => {
const ping2 = new Discord.MessageEmbed() // embedimizi tanımladık
.setColor("RANDOM") // embed rengi
.setDescription(`Pingimi ${client.ws.ping} MS Olarak Ölçtüm!`) // pingimizi belirledik

const ping = new Discord.MessageEmbed() // embedimizi tanımladık
.setColor("RANDOM") // embed rengi
.setDescription(`Ping Ölçüyorum..`) // pingimizin ölçüldüğünü belirttik
message.channel.send(ping).then(m => { // ilk olarak Pingim Ölçülüyor... mesajını atmasını ayarladık
    setTimeout(() => {
        m.edit(ping2) // sonra mesajı pingi söyleyerek editleyecek
    }, 5000); // burası da kaç saniye de editleyeceği || 1000 = 1 saniye || 5000 = 5 saniye
})

    }}
