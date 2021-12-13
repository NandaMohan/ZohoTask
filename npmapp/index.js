const rp = require('request-promise');
const cheerio = require('cheerio')
const fs = require('fs')
var mail = require('./mail.js')

let columnNames = ["Time", "Price22C", "Price24C"];
let item = []

rp("https://www.searchindia.info/exchange-rates/todays-gold-price.html", (error, response, html) => {

    if(!error && response.statusCode==200) {
        const $= cheerio.load(html);

        $(".table.table-striped.table-bordered.list-rates tr").each((i, data) => {
            const cells = $("td", data);
            let row = {}
            
            cells.each((i, td) => {
                
                let text = $(td).text().trim();  
                text = text.replace("Rs.","")
                text = parseFloat(text)
                row[columnNames[i]] = text
                
            })
            item.push(row)
        
            // // let store = [item.replace('\t','')]
            // console.log(item)
        });
       
    }

    // console.log(item)
    for (i in item)
    {
        if (item[i].Price22C > 4400)
        {       
            return mail
        }
        else 
        {
        const t_id = {
            txn_date: new Date,
            amount : item[i].Price22C,
            qty_gram : 1 
          };
          
          const jsonString = JSON.stringify(t_id);
          
          fs.writeFile('./buy_details.json', jsonString, err => {
            if (err) {
              console.log('Error writing file', err);
            } else {
              console.log('Successfully wrote file');
            }
          });        
          
        }
    }
 
  


});