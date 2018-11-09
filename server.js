const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000; // heroku creates environment port, if that doesn't exist
// localhost:3000 still works

var app  = express();

hbs.registerPartials(__dirname + '/views/partials'); // partials so we don't have to maintain same code in all the templates

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
app.set('view engine', 'hbs'); //using hbs as the default view engine

app.use(express.static(__dirname + '/public')); // makes it so we can render the file specified
// in url. So now localhost:3000/help.html will take you to help.html page

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  next(); // need next to move on from this middleware use
});



app.get('/', (req, res) => {
  res.render('home.hbs',
  {
      pageTitle: 'Home',
      welcomeMsg: 'Welcome Home'
  })
});

// /about renders about.hbs
app.get('/about', (req, res) => {
  res.render('about.hbs', // rendering hbs because we set view engine to hbs earlier
  {
    pageTitle: 'About Page'
  // can pass to about.hbs by adding this object as second arg
  })
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    name: 'Mistake',
    errorMessage: 'Unable to make request'
  })
});

app.listen(port, () => {
  console.log(`Server is connected on ${port}`)
});
