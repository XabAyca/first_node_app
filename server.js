let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

// Templates 
app.set("view engine", "ejs");

// Middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  session({
    secret: "aaaa",
    saveUninitialized: true,
    cookie: { secure: false },
    resave: true
  })
);
app.use(require('./middlewares/flash'))

//routes
app.get('/', (request, response) => {
  response.render('pages/index')
})

app.post('/', (request, response) => {
  if (request.body.message === undefined || request.body.message === '') {
    request.flash('error', "Vous n'avez pas posté de message")

  } else {
    Message.create(request.body.message, () => {
      request.flash('success', "Merci =D !")
    })
  }
  response.redirect("/");
});

app.listen(8080)