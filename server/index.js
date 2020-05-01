const express = require('express');
const cors = require('cors');
const dateformat = require('dateformat');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const filter = new Filter();

const broteFormSchema = require('./schema')



// database connection
mongoose.connect('mongodb://localhost:27017/bromies', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
const Brote = mongoose.model('Brote', broteFormSchema);



// middleware to add headers to requests and parse JSON format
app.use(cors());
app.use(express.json());

// basic listening connection
app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});

// GET route6
app.get('/', (req, res) => {
  res.send('Server running on port 5000');
});

// on get request, query database to find all items and return as JSON
app.get('/brotes', (req, res) => {
  Brote
    .find()
    .then(brotes => {
      res.json(brotes);
    });
});


// function to validate form data
function isValidBrote(brote) {
  return brote.name && brote.name.toString().trim() != '' &&
  brote.content && brote.content.toString().trim() != '';
}

// app.use(rateLimit({
//   windowMs: 5000, // every 5 seconds
//   max: 1
// }));

// POST route
app.post('/brotes', (req, res) => {
  if (isValidBrote(req.body)) {
    let now = new Date();
    let formatted = dateformat(now, 'dddd, mmmm dS, yyyy h:MM:ss TT');
    //insert into db
    const brote = new Brote ({
      name: filter.clean(req.body.name.toString()),
      content: filter.clean(req.body.content.toString()),
      created: formatted,
      likes: 0
    });

    // insert brotes into our database, then send it back to our client
    brote
      .save()
      .then(createdBrote => {
        res.json(createdBrote);
      });
    } else {
      res.status(422);
      res.json({
        message: "come on man"
      });
    }
  });

  // post route for liking
  app.post('/likes', (req, res) => {;
    let query = { _id: req.body.id};
    if (req.body.increment) {
      Brote.findOneAndUpdate(query, {$inc: { likes: 1 }}, {new: true}, (err, brote) => {});
    } else {
      Brote.findOneAndUpdate(query, {$inc: { likes: -1 }}, {new: true}, (err, brote) => {});
    }
    
  })
