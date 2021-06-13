const Discord = require('discord.js');

client.on('message', message => {
  if (message.content === 'gh!ping') {  
    message.channel.send('Gecikme ${m.createdTimestamp - message.createdTimestamp}ms. Mesaj Gecikmesi ${Math.round(client.ws.ping)}ms`);
  }
});

exports.help = {
  name: 'ping',
  description: 'Gecikme süresini gösterir.',
  usage: 'ping'
};
