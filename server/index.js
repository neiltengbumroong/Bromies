const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

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
// POST route
app.post('/brotes', (req, res) => {
  if (isValidBrote(req.body)) {
    //insert into db
    const brote = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date()
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
