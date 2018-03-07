/*
	Coder of FBK-Core and Command Seperation, Evaluation command, Modules:
	@CodaEnder#0001 (Developer of Spexr)
*/


// client Requirements
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const request = require('request')

// client Configuration
const config = require("./config/config.json")
const prefix = (config.prefix)
const devPrefix = (config.developerPrefix)
const version = (config.version)
const Developer = ["379274926621720576", "360447689822830594", "360447689822830594", "249467130108575745", "245369326322843649"]
const defaultColor = ([])
const errorColor = [179, 0, 0]
const nopermColor = [179, 0, 0]
console.log(`FoozBallKing Bot ${version} `);
console.log(` Loading Assets...`);
bot.commandCores = new Discord.Collection();
const errorNoPerm = new Discord.RichEmbed()
.setColor(nopermColor)
.addField('**ERROR!**', 'Sorry, but you have no permission to use this command!')
const Music = require('discord.js-musicbot-addon')
const moosic = new Music(bot, {
  youtubeKey: 'AIzaSyBBq6-Zbsq6V3PLsXCb7NCdS2TKgOoMAXQ',
  prefix: '|',
  global: false, // This means global queues, as in all servers have the same queue.
  anyoneCanAdjust: true,
  anyoneCanSkip: true,
  ownerOverMember: true,
  botOwner: "245369326322843649",
  enableQueueStat: true,
  botAdmins: Developer,
  logging: true
});

const blocks = {};
function loadCommand() {
fs.readdir("./fbk_modules/", (err, files) => { // Load Core Modules
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log(" No commands to load!");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands!`)

  jsfiles.forEach((f, i) => {
    let props = require(`./fbk_modules/${f}`);
    console.log(` ${i + 1}: ${f} command!`);
    bot.commandCores.set(props.help.name, props);
  });
});

fs.readdir("./commands/Affection", (err, files) => { // Load Affection Module
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log(" No commands to load!");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands for the Affection module!`)

  jsfiles.forEach((f, i) => {
    let props = require(`./commands/Affection/${f}`);
    console.log(` ${i + 1}: ${f} command!`);
    bot.commandCores.set(props.help.name, props);
  });
});

fs.readdir("./commands/Fun", (err, files) => { // Load Fun Module
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log(" No commands to load!");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands for the Fun module!`)

  jsfiles.forEach((f, i) => {
    let props = require(`./commands/Fun/${f}`);
    console.log(` ${i + 1}: ${f} command!`);
    bot.commandCores.set(props.help.name, props);
  });
});

fs.readdir("./commands/Overwatch", (err, files) => { // Load Fun Module
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log(" No commands to load!");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands for the Overwatch module!`)

  jsfiles.forEach((f, i) => {
    let props = require(`./commands/Overwatch/${f}`);
    console.log(` ${i + 1}: ${f} command!`);
    bot.commandCores.set(props.help.name, props);
  });
});
}

bot.on('ready', async () => {
	loadCommand()
  console.log(`Connected`);
  console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator} | Prefix is ${prefix}`);
  console.log(`Set game to "Type ${prefix}help for help | ${version}"`)
  bot.user.setPresence({game: {name: `Type ${prefix}help for help | ${version}`, type: 1, url: `https://www.twitch.tv/monstercat`}});
});
/* Enable if you want to log all msgs
client.on("message", function(message){
  console.log(`${message.guild} - #${message.channel.name} | [${message.author.username}#${message.author.discriminator}] ${message.content}`)
});
*/

bot.on('message', async message => {
  const msg = message.content.trim().toLowerCase()
  // const args = message.content.split(` `).slice(1)

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);

  let commandCores = bot.commandCores.get(command.slice(prefix.length).toLowerCase());

  if(message.author.bot) return;
  if(msg.toLowerCase().startsWith(prefix)) {
	if(commandCores) {
		commandCores.run(bot, message, args, Developer, errorNoPerm, errorColor, blocks)
		message.channel.stopTyping()
	}
  }

  if(msg.toLowerCase().startsWith(prefix + 'reload')) {
    message.channel.startTyping()
  if(Developer.some(devid => message.author.id.includes(devid))) {
    try {
      loadCommand()
    const embed = new Discord.RichEmbed()
    .setColor([0, 255, 0])
    .addField('**Success!**', 'Reloaded all commands!')
    message.channel.send(embed)
  } catch (err) {
    const embed = new Discord.RichEmbed()
    .setColor([179, 0, 0])
    .addField('**ERROR!**', `Error: ${err}`)
    message.channel.send(embed)
  }
  } else {
    message.channel.send(errorNoPerm)
  }
  message.channel.stopTyping()
  }
});

bot.login(config.token);

/*
const msgPong = await message.channel.send("Pinging the Discord samurai's...");
  const pingReturn = new Discord.RichEmbed()
        .setColor(defaultColor)
        .setAuthor(`Milo Miyazaki | Samurai Returned!`, client.user.avatarURL)
    .addField(`Message:`, `${msgPong.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField(`API:`, `${Math.round(client.ping)}ms`, true)
    .setFooter(`Milo Miyazaki`)
    msgPong.edit(pingReturn);
	*/