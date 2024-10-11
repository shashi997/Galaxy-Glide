const express = require('express')
const app = express()
require('dotenv').config()
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db')
require('./config/passportConfig.js')

const port = process.env.PORT || 8000

// app.use(express.static('public'))
app.set('view-engine', 'ejs')

app.use(express.urlencoded({extended: false}))

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
})
.catch((err) => {
    console.log("Mongodb Connection failed", err);
    
})


// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }));
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
    res.send('<h1>Galaxy Glide</h1> <a href="/auth/google">Authenticate With Google</a>')
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.send('<h1>Authentication Successful</h1>'); // Redirect to the page after login
    }
);

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
    
    });

    res.redirect('/');
});

// route setup
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))

