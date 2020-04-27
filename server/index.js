const express = require('express');
const cors = require('cors');
const monk = require('monk');
const dateformat = require('dateformat');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();

const filter = new Filter();



// database connection
const db = monk('localhost/broties');
const brotes = db.get('brotes');

// middleware to add headers to requests and parse JSON format
app.use(cors());
app.use(express.json());

// basic listening connection
app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});

// on get request, query database to find all items and return as JSON
app.get('/brotes', (req, res) => {
  brotes
    .find()
    .then(brotes => {
      res.json(brotes);
    });
});

// GET route
app.get('/', (req, res) => {
  res.json({
    message: 'Brooo whats good'
  });
});

// function to validate form data
function isValidBrote(brote) {
  return brote.name && brote.name.toString().trim() != '' &&
  brote.content && brote.content.toString().trim() != '';
}

app.use(rateLimit({
  windowMs: 10000, // every 10 seconds
  max: 1
}));

// POST route
app.post('/brotes', (req, res) => {
  if (isValidBrote(req.body)) {
    let now = new Date();
    let formatted = dateformat(now, 'dddd, mmmm dS, yyyy h:MM:ss TT');
    //insert into db
    const brote = {
      name: filter.clean(req.body.name.toString()),
      content: filter.clean(req.body.content.toString()),
      created: formatted
    };

    // insert brotes into our database, then send it back to our client
    brotes
      .insert(brote)
      .then(createdBrote=> {
        res.json(createdBrote);
      });
    } else {
      res.status(422);
      res.json({
        message: "Please do not leave any fields blank! - management"
      });
    }
  });
