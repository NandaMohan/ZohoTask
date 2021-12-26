var express = require('express');
var app = express();
var PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup/', function (req, res) {
var data = req.body;

console.log("Name: ", data.name);
console.log("Age: ", data.age);
console.log("Gender: ", data.gender);
	
res.send();
});

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
