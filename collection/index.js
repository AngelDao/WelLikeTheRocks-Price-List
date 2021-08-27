require("dotenv").config();
const { ethers } = require("ethers");
// const { getEvents } = require("./utils/getEvents");
const { getRocks } = require("./utils/getRocks");
const { update } = require("./google");
// const { timeSeries } = require("./services/EventPoints");

const main = async (fromLast) => {
  let provider;
  let wallet;

  if (process.env.PROJECT_ID) {
    provider = new ethers.providers.InfuraProvider(
      "homestead",
      process.env.PROJECT_ID
    );
  }

  if (process.env.PRIVATE_KEY) {
    wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  }

  let rocks;
  if (provider) {
    try {
      console.log("scraper started");
      rocks = await getRocks(provider, fromLast);
      await update(rocks);
      console.log("updated");
      // here is the time series data
      // const data = timeSeries(stats);

      // TVL time series
      // console.log(data[0].data);

      // Unique Adresses time series
      // console.log(data[1].data);

      console.log("scraper ended");
    } catch (err) {
      console.log("scraper crash:");
      console.log(err);
    }
  } else {
    console.log("no provider");
  }
  return stats;
};

main();

// module.exports = {
//   scraper: main,
// };
