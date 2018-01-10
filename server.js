const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.');
    }
  })
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Website under maintenance',
//     pageMessage: 'This website is currently unavailable we will be back soon!'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'About Page',
    pageMessage: 'Welcome to this fantastic website'
  });
});

app.get('/wim', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'Wim',
    likes: [
      'Karate',
      'Drawing',
      'Painting',
      'Programming'
    ]
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/maintenance', (req, res) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Website under maintenance',
    pageMessage: 'This website is currently unavailable we will be back soon!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    message: 'Error',
    type: 'Fatal error, server will explode!'
  })
})

app.listen(3000, () => {
  console.log('Server is up at port 3000.');
});
