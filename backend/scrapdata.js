const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite(url) {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract content from the page
    const content = $('main').text(); // Adjust the selector as per your structure
    return content;
}

// Example usage:
scrapeWebsite('https://www.koutquekout.com/metiers').then((data) => {
    console.log(data); // Log or send the extracted content back to the user
});
