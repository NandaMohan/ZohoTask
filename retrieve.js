const cheerio = require('cheerio')
const request = require('request-promise')

request("https://coinmarketcap.com/", (error, response, html) => {
    if(!error && response.statusCode==200) {
        const $= cheerio.load(html);

        const datarow = $(".HeaderRow")
        const output = datarow.find("th").text();
        $(".DataRow").each((i, data) => {
            const item= $(data). text();

            console.log(item);
        })
    }

});
