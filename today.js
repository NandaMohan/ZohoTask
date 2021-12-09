const rp = require('request-promise');
const cheerio = require('cheerio')
// const requestOptions = {
//   method: 'GET',
//   uri : 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
//   headers: {
//     'X-CMC_PRO_API_KEY': '0a18e6f7-a23a-4986-bf34-25c12efcd494'
//   },
//   json: true,
//   gzip: true
// };

// rp(requestOptions).then(response => {
//   //console.log('API call response:', response.data);

//   if(response.data && Array.isArray(response.data)) {
//      let btc = response.data.filter(crypto => crypto.symbol === 'BTC' );
//      console.log(btc[0].quote)
//   }

// }).catch((err) => {
//   console.log('API call error:', err.message);
// });


rp("https://www.bullion-rates.com/gold/INR-history.htm", (error, response, html) => {
    if(!error && response.statusCode==200) {
        const $= cheerio.load(html);

        $(".DataRow").each((i, data) => {
            const item= $(data). text();

            console.log(item);
        })
    }

});
