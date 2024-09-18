//config/data.js
//sendSMS('YOUR_STRING_DESTINATION_NUMBER', 'YOUR_PATTERN_ID', [{ code: 3000 });
async function sendSMS(toNum, patternCode, inputData = []) {
  console.log(`Sending SMS to ${toNum}, ${patternCode}`);
  console.log(inputData);
  const url = "http://ippanel.com/api/select";
  const body = {
    op: "pattern",
    user: process.env.USER_ID,
    pass: process.env.PASSWORD,
    fromNum: process.env.FROM_NUM,
    toNum: toNum,
    patternCode: patternCode,
    inputData: inputData,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const responseBody = await response.json();
    console.log(responseBody);
  } else {
    console.log("Request failed");
  }
}

async function sendDiscordMessage(content) {
  var discordRaw = JSON.stringify({
    content: content,
  });

  var discordRequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: discordRaw,
    redirect: "follow",
  };

  await fetch(process.env.DISCORD_WEBHOOK_URL, discordRequestOptions);
}
module.exports = {
  sendSMS,
  sendDiscordMessage,
};
