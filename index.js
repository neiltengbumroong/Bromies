const express = require('express');
const cors = require('cors');
const dateformat = require('dateformat');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const filter = new Filter();

const broteFormSchema = require('./schema')
const port = process.env.PORT || 5000;


const dbconn = 'mongodb+srv://neilteng:Chicken1889@bromies-ujo6f.mongodb.net/test?retryWrites=true&w=majority' || 'mongodb://localhost:27017/bromies';

// database connection
mongoose.connect(dbconn, { useNewUrlParser: true, useUnifiedTopology: true }).
  catch(error => {
    console.log(error)
  });
mongoose.set('useFindAndModify', false);
const Brote = mongoose.model('Brote', broteFormSchema);


// middleware to add headers to requests and parse JSON format
app.use(cors());
app.use(express.json());

// basic listening connection
app.listen(port, () => {
  console.log("Listening on port", port);
});


app.use(express.static(path.join(__dirname, 'client/build')));

// GET route
app.get('/', (req, res) => {
  res.send('Server running on port');
});

// on get request, query database to find all items and return as JSON
app.get('/brotes', (req, res) => {
  console.log("brotes");
  Brote
    .find()
    .then(brotes => {
      res.json(brotes);
    });
});

// get last n documents from database based on scrolling from client-side actions
app.get('/brotesv2', (req, res) => {
  Brote
    .find()
    .sort({_id: -1})
    .skip(parseInt(req.query.skip))
    .limit(parseInt(req.query.limit))
    .then(brotes => {
      res.json(brotes);
    });
});

app.get('/aggregate', (req, res) => {
  Brote.aggregate([
    {
      $group: { 
        _id: null, 
        totalLikes: { $sum: "$likes" } }
      }])
      .then(result => {
        res.json(result);
      })
});

app.get('/aggregateBrotes', (req, res) => {
  Brote
    .estimatedDocumentCount()
    .then(count => {
      res.json(count);
    })
});


// function to validate form data
function isValidBrote(brote) {
  return brote.name && brote.name.toString().trim() != '' &&
  brote.content && brote.content.toString().trim() != '';
}

//  app.use(rateLimit({
//    windowMs: 5000, // every 5 seconds
//    max: 1
//  }));

// POST route
app.post('/brotes', (req, res) => {
  if (isValidBrote(req.body)) {
    let now = new Date();
    let formatted = dateformat(now, 'dddd, mmmm dS, yyyy h:MM:ss TT');
    var date = new Date();
    let utcDate = new Date(date.toUTCString());
    utcDate.setHours(utcDate.getHours()-8);
    let usDate = new Date(utcDate);
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
