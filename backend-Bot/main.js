const { google } = require('googleapis');
const botdiscord = require('./botdiscord.json');
const { fillWithUsers } = require('./utils/arrayUser');
const { resultCount } = require('./utils/arrayCount');
const client = new google.auth.JWT(
    botdiscord.client_email,
    null,
    botdiscord.private_key,
    ['https://www.googleapis.com/auth/drive']
);

client.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('Conectado');
    }
});

async function gsRun(cl,message) {
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opt = {
        spreadsheetId: '1ikyozMCYRF-xhyiVy5-Loch1_a5Uy1wFunQo2SJigyY',
        range: 'Data!A2:D101'
    };
    let dataArray = await gsapi.spreadsheets.values.get(opt);
    const format = message.split(" ");
    const arrayCreate = {
        name: format[1],
        number1: format[2],
        number2: format[3],
        number3: format[4]
    }

    let nomeBot = arrayCreate.name;
    let arrayUser = fillWithUsers(dataArray.data.values);

    const { contador, instri } = resultCount(arrayUser, nomeBot);
    
    let updateUser = [[arrayCreate.number1, arrayCreate.number2, arrayCreate.number3]];
    let newUser = [[arrayCreate.name, arrayCreate.number1, arrayCreate.number2, arrayCreate.number3]];

    if (instri > 2) {
        updateOptions = {
            spreadsheetId: '1ikyozMCYRF-xhyiVy5-Loch1_a5Uy1wFunQo2SJigyY',
            range: `Data!B${instri}`,
            valueInputOption: 'USER_ENTERED',
            resource: { values: updateUser }
        }
    } else {
        updateOptions = {
            spreadsheetId: '1ikyozMCYRF-xhyiVy5-Loch1_a5Uy1wFunQo2SJigyY',
            range: `Data!A${contador}`,
            valueInputOption: 'USER_ENTERED',
            resource: { values: newUser }
        }
    }
    await gsapi.spreadsheets.values.update(updateOptions);
    return "success";
}

module.exports = {client,gsRun};