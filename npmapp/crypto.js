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

rp(requestOptions).then(response1 => {
  //console.log('API call response:', response.data);
  function rate1(response1){
      if(response1.data && Array.isArray(response1.data)) {
        let usdt = response1.data.filter(crypto => crypto.symbol === 'USDT' );
        USDTINR = parseFloat(usdt[0].quote.INR.price.toFixed(4));
      return USDTINR 
 }}

  console.log(rate1(response1))
  return rp("https://economictimes.indiatimes.com/markets/forex")
 
}).then(response2 => {
   //console.log('API call response:', response2)
  function rate2(response2){
      const dom = new JSDOM(response2)
      let USDINR = parseFloat(dom.window.document.querySelector('tr[class = "fRatesData active"]').children[1].textContent)
      return USDINR
  }
  console.log(rate2(response2))

}).catch((err) => {
  console.log('error:', err.message);
})

