var express = require('express');
const app = express();
var bodyParser = require('body-parser')
const db = require("./personphoto.json")
const port = 3000
const dist = require('./dist.js')
const apiPrefix = '/api'  

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

const router = express.Router();

router.post('/upload' , (req,res) => {
    const body = req.body
    const name = body.name
    const ph_no = body.ph_no
    const lat = body.lat
    const lng = body.lng

    if (!body.lat || !body.lng) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

    if ((body.lat>90 ) || (body.lng>180)) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }
    
    if (db[body.id]) {
        return res.status(409).json({ error: 'User already exists' });
      }
    
    if (db[body.lat] & db[body.lng]) {
        return res.status(409).json({ error: 'Photo on the specified location already exists' });
      }
    
      // Create account
    const upload= {
        person : 
        {
            name : body.name,
            ph_no : body.ph_no
        },
        photo : 
        {
            lat : body.lat,
            lng : body.lng
        }
      };

      db[body.id] = upload
      console.log(upload)
      return res.status(201).json(upload);
    })

router.get('/upload/:id' , (req,res) => {
      const id = req.params.id
      parseInt(db.id)
      // if(!upload)
      // {
      //     return res.status(404)
      //              .json({"error" : "User not found"})
      // }
      // return res.json(upload)
  
  })

router.delete('/upload/:id', (req, res) => {
        const upload  = db[req.params.id];
      
        // Check if account exists
        if (!upload) {
          return res.status(404).json({ error: 'User does not exist' });
        }
      
        // Removed account
        delete db[req.params.id];
      
        res.sendStatus(204);
      });
      
app.use(apiPrefix, router);

      // Start the server
 app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
