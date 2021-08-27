const { google } = require("googleapis");
const keys = require("./keys.json");

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

const auth = () => {
  const p = new Promise((resolve, reject) => {
    client.authorize(async (err, tokens) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const gsapi = google.sheets({ version: "v4", auth: client });
        resolve(gsapi);
      }
    });
  });
  return p;
};

const generateOptions = (range, action, sheet, wb) => {
  opt = {
    spreadsheetId: "11P0LIOdPrnDmbYGnUyf7MDtE85ExpUj5-txMi0xMkLk",
    range: range,
  };
  if (action === "fetch") {
    opt.majorDimension = "ROWS";
  } else if (action === "update") {
    opt.resource = {
      values: sheet,
      majorDimension: "ROWS",
    };
    opt.valueInputOption = "USER_ENTERED";
  }
  return opt;
};

const update = async (rocks) => {
  const gsapi = await auth();
  const sheet = "Asks!A3:D999";
  const opt = generateOptions(sheet);
  await gsapi.spreadsheets.values.clear(opt);
  const options = generateOptions(sheet, "update", rocks);
  let res = await gsapi.spreadsheets.values.update(options);
  return res;
};

module.exports = {
  update,
};
