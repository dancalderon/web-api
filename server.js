import express from "express";
import hbs from "hbs";
import fs from "fs"
const app = express()
const port = process.env.PORT || 3000;

hbs.registerPartials(`${__dirname}/views/partials`) //establishes the partials folder
app.set('view engine', 'hbs'); //establishes hbs as the view engine

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '/n', err => {
    if (err) console.log('Unable to append to server.log');
  })

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });
app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', text => text.toUpperCase())

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcome: 'Welcome to this site',
  })
}
)

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  })
}
)
app.get('/portfolio', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio page',
  })
}
)
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Website unavaibla'
  })
})

app.listen(port, () => {
  console.log(`Server is up in port ${port}`)
}
);
