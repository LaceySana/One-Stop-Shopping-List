import { SCRAPING_BEE_API_KEY as scrapingKey } from "./config.mjs";
import { getLocalStorage } from "./utils.mjs";
const scrapingURI = `https://app.scrapingbee.com/api/v1/?api_key=${scrapingKey}`;

// const scrapingbee = require('scrapingbee');
// import scrapingbee from "scrapingbee";

// async function get(url) {
//     var client = new scrapingbee.ScrapingBeeClient(scrapingKey);
//     var response = await client.get({
//         url: url,
//         params: {  
//             "js_scenario": {
//                 "instructions": [{"fill": ["input", "apples"]}]
//             }
//         },
//     });
//     return response;
// }



const aiExtractRules = {

};

const js_scenario = {
    "instructions": [
        {"fill": ["input", "apples"]},
    ]
}


// get encoded urls, scrape for location setting on website and search bar
export async function findProducts() {
    const stores = getLocalStorage("nearby-stores");
    stores.forEach(store => {
        console.log(`${scrapingURI}&url=${store.encodedURI}&js_scenario=${encodeURIComponent(JSON.stringify(js_scenario))}`)
        // fetch(`${scrapingURI}&url=${store.encodedURI}&js_scenario=${encodeURIComponent(JSON.stringify(js_scenario))}`)
        // .then(response => response.json())
        // .then(data => console.log("Extracted:", data))
        // .catch(err => console.error(err));
    });
    
}


// set location in website using local storage or website's built-in set current location

// search for each item in list, and return product_id, name, description, price, weight/amount, aisle






// function to find id for search input on website?