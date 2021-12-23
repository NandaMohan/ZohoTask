const express = require('express');
const app = express();
const {Car} = require("./public/delivery")
app.use(express.static('./public')); /* this line tells Express to use the public folder as our static folder from which we can serve static files*/

app.listen(3000, function(){
  console.log("Listening on port 3000!")
});
 
app.get('/uploads/person', (req,res) => {
    const Persons = Car.map((Car) => { const {persons} = Car ; return {persons} })
    res.json(Persons)
})

app.get('/uploads/person/:persons.id', (req,res) => {
      const P = Car.find((element) => (Car[persons][0]))
      console.log
})