const scrapingKey = import.meta.env.SCRAPING_BEE_API_KEY;

const scrapingbee = require('scrapingbee');

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(scrapingKey);
  var response = await client.get({
    url: url,
    params: {  
    },
  })
  return response
}