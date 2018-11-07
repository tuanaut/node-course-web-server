const express = require('express');
const fs = require('fs');

var app  = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log,  (err) => {
    if(err){
      console.log('Unable to log');
    }
  });

  next();
});

app.get('/', (req, res) => {
  res.send({
    name: 'Andrew',
    likes: [
      'Biking',
      'Cities'
    ]
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs',
  {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  })
});

app.get('/bad', (req, res) => {
  res.send({
    name: 'Mistake',
    errorMessage: 'Unable to make request'
  })
});

app.listen(3000);
