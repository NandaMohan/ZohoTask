const express = require('express');
const bodyParser = require('body-parser');
// App constants
const port = process.env.PORT || 5000;
const apiPrefix = '/api';
const fs = require('fs')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure routes
const router = express.Router();

// Store data in-memory, not suited for production use!
const db = require("./obj")
// Create the Express app & setup middlewares


router.post('/accounts', (req, res) => {
  // Check mandatory request parameters
  if (!req.body.userId ||!req.body.lat || !req.body.lng) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  // Check if account already exists
  if (db[req.body.userId]) {
    return res.status(409).json({ error: 'User already exists' });
  }

  if ((req.body.lat>90 ) || (req.body.lng>180)) {
	return res.status(400).json({ error: 'Invalid parameters' });
  }

  const account = {
    userId: req.body.userId,
    person : {
      name : req.body.name,
      ph_no : req.body.ph_no
    },
    photo :
    {
        lat : req.body.lat,
        lng : req.body.lng
    }
  };

  db.push(account)
  return res.status(201).json();
});

router.get('/accounts', (req, res) => {
  fs.writeFile("./public/data.txt", JSON.stringify(db), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      return res.json(db);
    }
  })
  	
  });

router.get('/head', (req,res) => { res.json(req.headers)})
router.get('/cookie', function (req, res) {
  // Cookies that have not been signed
  res.cookie('id','1234')
  res.send('cookie set')
  console.log(req.cookies)
})
router.get('/clear', function (req, res) {
  // Cookies that have not been signed
  res.clearCookie('id')
  res.send('cookie cleared');
})

router.get('/accounts/:userId', (req, res) => {
  const account = db[req.params.userId];
  // Check if account exists
  if (!account) {
    return res.status(404).json({ error: 'User does not exist' });
  }
  return res.json(account);

});

// ----------------------------------------------

// Remove specified account
router.delete('/accounts/:userId', (req, res) => {
  const account = db[req.params.userId];

  // Check if account exists
  if (!account) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  delete db[req.params.userId];

  res.sendStatus(204);
});

app.use(apiPrefix, router);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
