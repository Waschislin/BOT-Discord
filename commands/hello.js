const {client} = require('../backend-Bot/main.js');
const {gsRun} = require('../backend-Bot/main.js');

const execute = (cliente, msg, args) =>{
  const format = msg.content.split(" ");  
  if(format.length < 5 || format.length > 5){
    return msg.reply("Utilize formato !submit name ap ap dp");
  } 
  gsRun(client,msg.content);
  return msg.reply("Success!");
}
module.exports ={
  name: "submit",
  help:"Utilize formato !submit name ap ap ap",
  execute
};