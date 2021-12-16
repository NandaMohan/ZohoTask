const rp = require('request-promise');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const requestOptions = {
  method: 'GET',
  uri : 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  headers: {
    'X-CMC_PRO_API_KEY': '0a18e6f7-a23a-4986-bf34-25c12efcd494'
  },
  qs:
  {
    'convert' : 'INR'
  },
  json: true,
  gzip: true
};

var Price = []
rp(requestOptions).then(response1 => {
  //console.log('API call response:', response.data);

  if(response1.data && Array.isArray(response1.data)) {
     let usdt = response1.data.filter(crypt => crypt.symbol === 'USDT' );
     USDTINR = parseFloat(usdt[0].quote.INR.price.toFixed(4))
     console.log(USDTINR)
     
  }

}).catch((err) => {
  console.log('error:', err.message);
});

rp("https://economictimes.indiatimes.com/markets/forex").then(response2 => {
   //console.log('API call response:', response.data)
      const dom = new JSDOM(response2)
      let USDINR = parseFloat(dom.window.document.querySelector('tr[class = "fRatesData active"]').children[1].textContent)
      console.log(USDINR)

}).catch((err) => {
  console.log('error:', err.message);
});



// rp("https://in.tradingview.com/symbols/USDINR").then(response => {
//   //console.log('API call response:', response.data)
//   const dom = new JSDOM(response.body);
//   console.log(dom.window.document.querySelector('div[class = "tv-symbol-price-quote__value js-symbol-last"]'));

// }).catch((err) => {
//console.log('API call error:', err.message);
//});
