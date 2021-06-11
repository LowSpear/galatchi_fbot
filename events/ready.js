const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../ayarlar.json')

module.exports = client => {
  var degisenOynuyor = [
    //GALATCHI DEGISEN OYNUYOR
    "Daha fazla komut ve bilgi için gh!yardım",
    "WILFLEAX ORTAKLIK",
    "Galatchi 2021"
    
  ]
  
  setInterval(function() {
    var degisenOynuyor1 = degisenOynuyor[Math.floor(Math.random() * (degisenOynuyor.length))]
    client.user.setActivity(`${degisenOynuyor1}`);

}, 3 * 5000);
  
  client.user.setStatus("idle"); //dnd, idle, online, offline
  
}