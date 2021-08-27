require("dotenv").config();
const { ethers } = require("ethers");
const { getRocks } = require("./utils/getRocks");
const { update } = require("./google");

const main = async (fromLast) => {
  let provider;
  let wallet;

  if (process.env.PROJECT_ID) {
    provider = new ethers.providers.InfuraProvider(
      "homestead",
      process.env.PROJECT_ID
    );
  }

  let rocks;
  if (provider) {
    try {
      console.log("scraper started");
      rocks = await getRocks(provider, fromLast);
      await update(rocks);
      console.log("updated");

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
