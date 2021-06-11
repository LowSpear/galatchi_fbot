const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////// KOMUTLAR BAŞ
require("./util/eventLoader")(client);
////////////// KOMUTLAR SON
////////////// ALTI ELLEME

  
  client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));


//Galatchi AFK Sistemi
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
      .setFooter(message.author.tag, message.author.displayAvatarURL());
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
//KÜFÜR ENGEL
client.on("message", async msg => {
 const i = await db.fetch(`kufurengel_${msg.guild.id}`)
    if (i == "aç") {
        const kufur = ['PİC','Pic','pic','PİÇ','Piç','piç','İBİNE','İbine','ibine','ipne','İPNE','İpne','ibne','İBNE','İbne','OC','Oc','OÇ','Oç','oç','oc','salak','SALAK','Salak','MAL','Mal','mal','s2ş','OROS','Oros','oros','OROSPU','orospu','Orospu','TASAK','Tasak','tasak','taşak','TAŞAK','Taşak','SEKS','Seks','seks','sex','SEX','Sex','PORNO','porno','Porno','YARAMI','Yaramı','yaram','YARAK','yarak','Yarak','VLD','Vld','vld','VELED','veled','Veled','MEME','Meme','meme','amcık','Amcık','sok','SOK','Sok','SKM','Skm','skm','SKRM','skrm','Skrm','ANNENİ','Anneni','anneni','aq','Aq','AQ','AM','Am','am','anan','Anan','ANAN','Sik','sik','SİK','göt','Göt','GÖT','sg','Sg','Amk','SG','AMK','amk'];
      if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
               msg.delete();
               const embed1 = new Discord.MessageEmbed()
              .setColor("#ff0000")
              .setDescription(`Hey ${msg.author} Küfür Etmeyi Kesmelisin Saygılı Ol | GALATCHI BOT 😡`)
              .setTimestamp()
              .setFooter(msg.author.tag, msg.author.displayAvatarURL());
            return msg.channel.send(embed1).then(message => message.delete({ timeout: 3000 }));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

//SA AS SİSTEMİ - OTO CEVAP
client.on("message", async msg => {
 let sa = await db.fetch(`saas_${msg.guild.id}`)
    if (sa == 'açık') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 'sea' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'selam' || msg.content.toLowerCase() == 'selamın aleyküm') {
          try {
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Aleyküm Selam Hoşgeldin Canım Kardeşim İnşallah İyisindir!")
       .setTimestamp()
      .setFooter(msg.author.tag, msg.author.displayAvatarURL());
      msg.channel.send(embed).then(message => message.delete({ timeout: 8000 }));
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (sa == 'kapali') {
      
    }
    if (!sa) return;
  });

client.on("message", async msg => {
 let sa = await db.fetch(`saas_${msg.guild.id}`)
    if (sa == 'açık') {
      if (msg.content.toLowerCase() == 'naber' || msg.content.toLowerCase() == 'nasılsınız' || msg.content.toLowerCase() == 'nabersiniz') {
          try {
 const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("İyi Vallahi Senden Naber Kardeşim İnşallah İyisindir!")
       .setTimestamp()
      .setFooter(msg.author.tag, msg.author.displayAvatarURL());
      msg.channel.send(embed).then(message => message.delete({ timeout: 8000 }));
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (sa == 'kapali') {
      
    }
    if (!sa) return;
  });


client.on("message", async msg => {
 let sa = await db.fetch(`saas_${msg.guild.id}`)
    if (sa == 'açık') {
      if (msg.content.toLowerCase() == 'iyiyim sen' || msg.content.toLowerCase() == 'iyiyim' || msg.content.toLowerCase() == 'iyiyiz sen') {
          try {
 const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("İyi Olmana Sevindim Allahın Bereketi Üzerinde Olsun!")
       .setTimestamp()
      .setFooter(msg.author.tag, msg.author.displayAvatarURL());
      msg.channel.send(embed).then(message => message.delete({ timeout: 8000 }));
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (sa == 'kapali') {
      
    }
    if (!sa) return;
  });

client.on("message", async msg => {
 let sa = await db.fetch(`saas_${msg.guild.id}`)
    if (sa == 'açık') {
      if (msg.content.toLowerCase() == '2020') {
          try {
 const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Benim İçin İyi Bir Yıl Olsada İnsanlık İçin Kötü Bir Yıl Oldu Hatırlatma!!!")
       .setTimestamp()
      .setFooter(msg.author.tag, msg.author.displayAvatarURL());
      msg.channel.send(embed).then(message => message.delete({ timeout: 8000 }));
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (sa == 'kapali') {
      
    }
    if (!sa) return;
  });

});


const keep_alive = require('./keep_alive.js')