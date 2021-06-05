const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const execute = require("./commands/hello.js")
const prefix = "!";
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
client.commands = new Discord.Collection();
client.queues = new Map();
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((filename) => filename.endsWith(".js"));
for(var filename of commandFiles){
  const command = require(`./commands/${filename}`);
  client.commands.set(command.name, command); 
}



client.login(config.BOT_TOKEN); //Ligando o Bot caso ele consiga acessar o token


client.on("message",(msg)=>{
  if(!msg.content.startsWith(prefix) || msg.author.bot)return;
    const args = msg.content.slice(prefix.length).split(" ");
  const command = args.shift();

  try {
    client.commands.get(command).execute(client, msg, args);
  } catch (e) {
   // console.error(e);
    return msg.reply("Ops! Eu ainda não conheço esse comando! Apenas conheço !submit ,!help");
  }
  })
