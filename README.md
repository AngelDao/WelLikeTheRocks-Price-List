# Sale List Scraper for We Like The Rocks

This code is for hooking up scraped list to a google sheet using a google service worker.

so required is a local `keys.json` and `.env`.

`keys.json` is generated from google service worker

`.env` stores `PROJECT_ID` from infura project and is required to get data from the chain

## Alternative use

you can provide just a Project ID omit `await update(rocks);` call in `index.js` and use the `rocks` var for whatever service you want to build
