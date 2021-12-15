const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri : 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  headers: {
    'X-CMC_PRO_API_KEY': '0a18e6f7-a23a-4986-bf34-25c12efcd494'
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  //console.log('API call response:', response.data);

  if(response.data && Array.isArray(response.data)) {
     let btc = response.data.filter(crypto => crypto.symbol === 'BTC' );
     console.log(btc[0].quote)
  }

}).catch((err) => {
  console.log('API call error:', err.message);
});

rp("https://in.tradingview.com/symbols/USDINR").then(response => {
  //console.log('API call response:', response.data)
  const dom = new JSDOM(response.body);
  console.log(dom.window.document.querySelector('div[class = "tv-symbol-price-quote__value js-symbol-last"]'));

}).catch((err) => {
  console.log('API call error:', err.message);
});
