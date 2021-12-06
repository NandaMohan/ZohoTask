fs = require('fs');
fs.readFile('/home/inc1395/places.json', 'utf8', function (err,data) 
{
  if (err) {
    return console.log(err);
}
  console.log(data);
});