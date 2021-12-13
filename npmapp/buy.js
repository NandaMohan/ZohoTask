// Requiring fs module
const fs = require("fs");

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
  
module.exports = fs.writeFile