const express = require('express');
const bodyParser = require('body-parser');
// App constants
const port = process.env.PORT || 5000;
const apiPrefix = '/api';
const db = {
	test: {
	  userId : 1,
	  person : 
	  {
		  name : 'Nanda',
		  ph_no : 934932942
	},
	photo : 
	{
		lat : 12.8730300,
		lng : 80.4332344
	}
	}
  };
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure routes
const router = express.Router();

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
  db[req.body.userId] = account;

  return res.status(201).json(account);
});

router.get('/accounts', (req, res) => {
	return res.json(db);
  });

router.get('/accounts/:userId', (req, res) => {
  const account = db[req.params.userId];
  // Check if account exists
  if (!account) {
    return res.status(404).json({ error: 'User does not exist' });
  }
  return res.json(account);
});

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
